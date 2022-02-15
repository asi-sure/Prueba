import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './components/menues/menu/menu.component';
import { PieComponent } from './components/menues/pie/pie.component';
//import { MventasComponent } from './components/ventas/mventas/mventas.component';
import { PortadaComponent } from './components/menues/portada/portada.component';
import { LoginComponent } from './components/acceso/login/login.component';
import { DesconectarComponent } from './components/acceso/login/desconectar.component';

const routes : Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MenuComponent, outlet: 'menus' }, //iniciando
  { path: 'menurol/:dato', component: MenuComponent, outlet: 'menus' },
  { path: '', component: PieComponent, outlet: 'pie' },    //iniciando
  { path: 'menupie/:dato', component: PieComponent, outlet: 'pie' },
  { path: 'portada', component: PortadaComponent },
  { path: 'desconectar', component: DesconectarComponent },
  { path: 'ventas', loadChildren: () => import('./components/ventas/ventas.module').then(m => m.VentasModule) },
  { path: 'compras', loadChildren: () => import('./components/compras/compras.module').then(m => m.ComprasModule) },
  { path: 'departamentos', loadChildren: () => import('./components/departamentos/departamentos.module').then(m => m.DepartamentosModule) },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
