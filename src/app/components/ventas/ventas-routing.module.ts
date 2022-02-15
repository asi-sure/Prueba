import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { DetvenComponent } from './detven/detven.component';

const routes: Routes = [
  { path: '', component: VentasComponent ,
    children: [ 
      { path: '', component: DetvenComponent },
    //  { path: 'detalleven/:xestado', component: DetvenComponent }
      { path: 'detalleven/:xnombres/:xtipoper/:xestado', component: DetvenComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
