import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenuComponent } from '../../layout/menu/menu.component';


import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-painel',
  imports: [CommonModule, MenuComponent,RodapeComponent, TranslatePipe],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent {
  userName: string = 'Nome do Usuário'; // Replace with actual user name from auth service

  user: any;

  constructor(public auth: AuthService) {}
  }



