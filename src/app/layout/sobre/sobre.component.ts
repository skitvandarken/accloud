import { Component } from '@angular/core';
import { TranslatePipe,  TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-sobre',
  imports: [ TranslatePipe ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {




  useLanguage(language: string): void {
    this.translate.use(language);
}

constructor(private translate: TranslateService) {}



}
