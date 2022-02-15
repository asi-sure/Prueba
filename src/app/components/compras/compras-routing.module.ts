import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './compras.component';
import { DetcomComponent } from './detcom/detcom.component';

const routes: Routes = [
  { path: '', component: ComprasComponent,
    children: [ 
      { path: '', component: DetcomComponent },
      //...
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
