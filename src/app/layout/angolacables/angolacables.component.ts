import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe,  TranslateService } from '@ngx-translate/core';
import { ParceirosComponent } from '../parceiros/parceiros.component';
import { CtaComponent } from '../cta/cta.component';

@Component({
  selector: 'app-angolacables',
  imports: [CommonModule, TranslatePipe, ParceirosComponent, CtaComponent],
  templateUrl: './angolacables.component.html',
  styleUrl: './angolacables.component.css'
})
export class AngolacablesComponent {

  useLanguage(language: string): void {
    this.translate.use(language);
}

constructor(private translate: TranslateService) {}

}
