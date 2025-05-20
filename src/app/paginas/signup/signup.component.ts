import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import emailjs,  {type EmailJSResponseStatus } from '@emailjs/browser';
declare var UIkit: any;

@Component({
  selector: 'app-signup',
  imports: [MenuComponent, CommonModule, ReactiveFormsModule, RodapeComponent, TranslatePipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
isSubmitting: boolean = false;

  translations: any;

  useLanguage(language: string): void {
    this.translate.use(language);
    this.translations.use(language);
}

  partnershipForm: FormGroup;
  selectedPartnership: string = '';

    

  constructor(private fb: FormBuilder, private translate: TranslateService) {

    

    this.partnershipForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      potCliente: ['' ],
      numColab: [''],
      numeroColaboradores: [''],
      receitaAnual: [''],
      volVendas: [''],
      subsidiariaEscolhida: [''],
      partnershipType: [''],
      paisForm: [''],
      tipoEmpresa: [''],
      nomeEmpresa: [''],
      equipaVendas: [''],
      servicoInteress: [''],
      anosOperacoes: [''],
      businessIndicatorDetails: this.fb.group({
        referralCount: [''],
        keyIndustries: [''],
      }),
      authorizedAgentDetails: this.fb.group({
        region: [''],
        experienceYears: [''],
      }),
      resellerDetails: this.fb.group({
        storeName: [''],
        productSpecialty: [''],
      }),
    });

    this.partnershipForm.get('partnershipType')?.valueChanges.subscribe(value => {
      this.selectedPartnership = value;
    });
  }


  submitForm(event: Event) {
  event.preventDefault();
  this.partnershipForm.markAllAsTouched();

  if (this.partnershipForm.invalid) {
    UIkit.modal('#validation-modal').show();
    return;
  }

  this.isSubmitting = true;
  UIkit.modal('#loading-modal').show();

  const formData = this.partnershipForm.value;

  emailjs.send('service_hxge11t', 'template_52yj2o5', formData, {
    publicKey: '8zvRzqg96H44z9txo'
  })
  .then(() => {
    console.log('SUCESSO');
    UIkit.modal('#loading-modal').hide();
    UIkit.modal('#success-modal').show();
    this.partnershipForm.reset();
    this.isSubmitting = false;
  })
  .catch((error: EmailJSResponseStatus) => {
    console.error('Falhou...', error.text);
    UIkit.modal('#loading-modal').hide();
    UIkit.modal('#error-modal').show();
    this.isSubmitting = false;
  });
}

/* AQUI É SÓ COM O MODAL
  submitForm(event: Event) {
  event.preventDefault();
  this.partnershipForm.markAllAsTouched();

  if (this.partnershipForm.invalid) {
    UIkit.modal('#validation-modal').show();
    return;
  }

  const formData = this.partnershipForm.value;

  emailjs.send('service_hxge11t', 'template_52yj2o5', formData, {
    publicKey: '8zvRzqg96H44z9txo'
  })
  .then(() => {
    console.log('SUCESSO');
    UIkit.modal('#success-modal').show();
    this.partnershipForm.reset();
  })
  .catch((error: EmailJSResponseStatus) => {
    console.error('Falhou...', error.text);
    UIkit.modal('#error-modal').show();
  });
}

*/

  /*
  submitForm(event: Event) {
    event.preventDefault();

    this.partnershipForm.markAllAsTouched();


    if (this.partnershipForm.invalid) {
      window.alert('Por favor, preencha correctamente todos os campos obrigatórios.');
      return;
    }

    const formData = this.partnershipForm.value;

    emailjs.send('service_hxge11t', 'template_52yj2o5', formData, {
      publicKey: '8zvRzqg96H44z9txo'
    })
    .then(() => {
      console.log('SUCESSO');
      window.alert('Registo solicitado com sucesso! 🎉. Em breve será contactado.');
      this.partnershipForm.reset();
    })
    .catch((error: EmailJSResponseStatus) => {
      console.error('Falhou...', error.text);
      window.alert('Não foi possível enviar sua candidatura.');
    });
  } */
}   

