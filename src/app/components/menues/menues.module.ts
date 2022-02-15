import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PieComponent } from './pie/pie.component';
import { PortadaComponent } from './portada/portada.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    MenuComponent,
    PieComponent,
    PortadaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MenuesModule { }
