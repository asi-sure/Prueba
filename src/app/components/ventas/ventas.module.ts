import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { DetvenComponent } from './detven/detven.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VentasComponent,
    DetvenComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }
