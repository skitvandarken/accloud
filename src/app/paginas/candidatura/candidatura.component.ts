import { Component } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
declare var UIkit: any;

@Component({
  selector: 'app-candidatura',
  imports: [
    MenuComponent,
    CommonModule,
    ReactiveFormsModule,
    RodapeComponent,
    TranslatePipe,
  ],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css',
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
    'Media & Streaming',
  ];

  aceleraForm: FormGroup;
  selectedContactType: string = '';

  constructor(private fb: FormBuilder, private translate: TranslateService, private router : Router) {
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
      link: [''],
      setores: this.fb.array([]), // <-- Add this
    });

    // Keep selectedContactType synchronized
    this.aceleraForm.get('contactType')?.valueChanges.subscribe((value) => {
      this.selectedContactType = value;
    });
  }

onSetorChange(event: any) {
  const setoresArray: FormArray = this.aceleraForm.get('setores') as FormArray;

  if (event.target.checked) {
    setoresArray.push(this.fb.control(event.target.value));
  } else {
    const index = setoresArray.controls.findIndex(x => x.value === event.target.value);
    if (index !== -1) {
      setoresArray.removeAt(index);
    }
  }
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
      const index = formArray.controls.findIndex(
        (x) => x.value === event.target.value
      );
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  // Submit form
  submitForm(event: Event) {
    event.preventDefault();
    this.aceleraForm.markAllAsTouched();

    // Modal de validação
    const validationModal = UIkit.modal('#validation-modal');
    const loadingModal = UIkit.modal('#loading-modal');
    const successModal = UIkit.modal('#success-modal');
    const errorModal = UIkit.modal('#error-modal');

    if (this.aceleraForm.invalid) {
      if (validationModal) validationModal.show();
      return;
    }

    this.isSubmitting = true;

    // Exibe modal de loading, se existir
    if (loadingModal) loadingModal.show();

    // Prepara os dados do formulário
    const formData = {
      ...this.aceleraForm.value,
      servicoInteresse: this.aceleraForm.value.servicoInteresse
        ? this.aceleraForm.value.servicoInteresse.join(', ')
        : '',
    };

    console.log('Submitting form data:', formData);

    // Envia e-mail via EmailJS
    emailjs
      .send('service_1myi5zh', 'template_0w5e3xh', formData, {
        publicKey: 'KKIY3DUwuU4z3eqt8',
      })
      .then(() => {
        console.log('SUCCESS');

        // Fecha modal de loading
        if (loadingModal) loadingModal.hide();

        // Mostra modal de sucesso
        if (successModal) successModal.show();

        // Reseta formulário e FormArray
        this.aceleraForm.reset();
        if (this.servicoInteresse) this.servicoInteresse.clear();

        this.isSubmitting = false;

         // Redireciona para a página inicial após 2s ou quando fechar o modal
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);

      })
      .catch((error: EmailJSResponseStatus) => {
        console.error('FAILED...', error.text);

        // Fecha modal de loading
        if (loadingModal) loadingModal.hide();

        // Mostra modal de erro
        if (errorModal) errorModal.show();

        this.isSubmitting = false;
      });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.translations.use(language);
  }
}
