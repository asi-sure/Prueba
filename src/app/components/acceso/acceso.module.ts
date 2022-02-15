import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesconectarComponent } from './login/desconectar.component';

@NgModule({
  declarations: [
    LoginComponent,
    DesconectarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AccesoModule { }
