import { Component } from '@angular/core';
import { TranslatePipe,  TranslateService } from '@ngx-translate/core';
import { AngolacablesComponent } from "../angolacables/angolacables.component";


@Component({
  selector: 'app-sobre',
  imports: [TranslatePipe, SobreComponent, AngolacablesComponent],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {




  useLanguage(language: string): void {
    this.translate.use(language);
}

constructor(private translate: TranslateService) {}



}
