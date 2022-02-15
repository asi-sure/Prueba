import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasComponent } from './compras.component';
import { DetcomComponent } from './detcom/detcom.component';


@NgModule({
  declarations: [
    ComprasComponent,
    DetcomComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
