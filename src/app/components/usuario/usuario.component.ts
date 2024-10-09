import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/modelos/usuario.models';
import { Rol } from 'src/app/modelos/rol.models';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario : Usuario = new Usuario();
  roles : Rol[] = [];
  titulo : String = "Crear Usuario";
  usuarioId: number = 0;
  message: string = '';
  constructor(public usuarioService:UsuarioService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.lisRoles();
    console.log("this.roles -> ");
    console.log(this.roles);
  }

  //metodo que nos permite obtener los roles creados en la DB.
  lisRoles() {
    this.usuarioService.listaRoles().subscribe((list) => {
      this.roles = list;
    });
  }

  //metodo que nos permite realizar el guardado de un usuario en DB,  mediante el api.
  guardar() {
    this.usuarioService.formulario.disable();
      const observer = {
        next: (result: any) => {
          console.log("result usuario ->>")
          console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Creación',
                //text: 'Usuario registrado exitosamente',
                text: result.message,
                //text: result['message'],
            });
            //this.onClear();
        },
        error: (error: any) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
            this.usuarioService.formulario.enable();
        },
        complete: () => {
          this.onClear();
        }
    };
    
    this.usuarioService.guardarUsuario().subscribe(observer);
      
  }

  onClose() {
    this.onClear();
  }

  onClear() {
    this.usuarioService.formulario.reset();
    this.usuarioService.iniciaForm();
    this.router.navigateByUrl('/productos');
  }

}
