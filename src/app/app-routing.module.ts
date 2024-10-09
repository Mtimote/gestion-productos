import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistroProductoComponent } from './components/registro-producto/registro-producto.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'inicio',component:DashboardComponent},
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path: 'productos',component:ProductosComponent},
  {path: 'registro-producto',component:RegistroProductoComponent},
  {path: 'guardar-producto/:id',component:RegistroProductoComponent},
  {path: 'eliminar-producto/:id',component:RegistroProductoComponent},
  {path: 'usuario',component:UsuarioComponent},
  {path: 'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
