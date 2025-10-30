import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';

import { CandidaturaComponent } from './paginas/candidatura/candidatura.component';

export const routes: Routes = [
  
    {path:'',component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'candidatura', component: CandidaturaComponent}
];
