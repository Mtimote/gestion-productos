import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistroProductoComponent } from './components/registro-producto/registro-producto.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {path: 'productos',component:ProductosComponent},
  {path: '',redirectTo:'productos',pathMatch:'full'},
  {path: 'registro-producto',component:RegistroProductoComponent},
  {path: 'guardar-producto/:id',component:RegistroProductoComponent},
  {path: 'eliminar-producto/:id',component:RegistroProductoComponent},
  {path: 'usuario',component:UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
