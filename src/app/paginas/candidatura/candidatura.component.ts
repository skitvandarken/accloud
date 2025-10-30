import { Component } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
declare var UIkit: any;


@Component({
  selector: 'app-candidatura',
  imports: [

    MenuComponent, CommonModule, ReactiveFormsModule, RodapeComponent, TranslatePipe

  ],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css'
})
export class CandidaturaComponent {


  
  isSubmitting: boolean = false;
  translations: any;

  // List of available services
  sectores = [
    'Banca e Seguros',
    'Petróleo & Gás',
    'Energia e Indústria',
    'Saúde',
    'Educação',
    'Retalho e Logística',
    'Telecom & Network',
    'Media & Streaming'
  ];

  aceleraForm: FormGroup;
  selectedContactType: string = '';

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.aceleraForm = this.fb.group({
      nomeEmpresa: [''],
      website: [''],
      anoFundacao: [''],
      colaboradores: [''],
      nomeContato: [''],
      cargo: [''],
      email: [''],
      telefone: [''],
      descricao: [''],
      fase: [''],
      desafio: [''],
      beneficioEsperado: [''],
      etapa: [''],
      valorCredito: [''],
      usoCreditos: [''],
      referral: [''],
      referencia: [''],
      numeroNif: [''],
      endereço: [''],
    });

    // Keep selectedContactType synchronized
    this.aceleraForm.get('contactType')?.valueChanges.subscribe(value => {
      this.selectedContactType = value;
    });
  }


    onSetorChange(event: any) {
    // implementação futura (ex: lista dinâmica)
  }

  onMentoriaChange(event: any) {
    // implementação futura (guardar mentoria selecionada)
  }

  // Getter for FormArray
  get servicoInteresse(): FormArray {
    return this.aceleraForm.get('servicoInteresse') as FormArray;
  }

  // Handle checkbox changes
  onCheckboxChange(event: any) {
    const formArray: FormArray = this.servicoInteresse;

    if (event.target.checked) {
      formArray.push(this.fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  // Submit form
  submitForm(event: Event) {
    event.preventDefault();
    this.aceleraForm.markAllAsTouched();

    if (this.aceleraForm.invalid) {
      UIkit.modal('#validation-modal').show();
      return;
    }


    this.isSubmitting = true;
    UIkit.modal('#loading-modal').show();

    // Prepare form data with selected services
   const formData = {
  ...this.aceleraForm.value,
  servicoInteresse: this.aceleraForm.value.servicoInteresse.join(', ')
};
    console.log('Submitting form data:', formData);

    emailjs.send('service_9il6xco', 'template_m8oz3tg', formData, {
      publicKey: 'F-p5Ny3ufMaRfCSgR'
    })
      .then(() => {
        console.log('SUCCESS');
        UIkit.modal('#loading-modal').hide();
        UIkit.modal('#success-modal').show();
        this.aceleraForm.reset();
        this.servicoInteresse.clear(); // ✅ Clear FormArray as well
        this.isSubmitting = false;
      })
      .catch((error: EmailJSResponseStatus) => {
        console.error('FAILED...', error.text);
        UIkit.modal('#loading-modal').hide();
        UIkit.modal('#error-modal').show();
        this.isSubmitting = false;
      });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.translations.use(language);
  }

}
