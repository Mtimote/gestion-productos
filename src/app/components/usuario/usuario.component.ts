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

  guardar() {
    this.usuarioService.formulario.reset();
    this.usuarioService.iniciaForm();
    this.router.navigateByUrl('/guardar-usuario/0');
  }

  lisRoles() {
    this.usuarioService.listaRoles().subscribe((list) => {
      this.roles = list;
    });
  }


  guardar1() {
    this.usuarioService.formulario.disable();
    //if (this.usuarioService.formulario.get('usuarioId').value <= 0) {
      const observer = {
        next: (result: any) => {
            Swal.fire({
                icon: 'success',
                title: 'Creación',
                text: 'Usuario registrado exitosamente',
            });
            //this.onClear();
        },
        error: (result: any) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.error.message,
            });
            this.usuarioService.formulario.enable();
        },
        complete: () => {
            // Puedes agregar cualquier lógica adicional que necesites cuando la suscripción se complete
        }
    };
        this.usuarioService.guardarUsuario().subscribe(observer);
      
    // } else {
    //   this.usuarioService.actualizar().subscribe(
    //     (result: any) => {
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Actualización',
    //         text: 'Usuario actualizado exitosamente',
    //       });
    //       this.onClear();
    //     },
    //     (result) => {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: result.error.message,
    //       });
    //       this.usuarioService.formulario.enable();
    //     }
    //   );
    // }
  }

}
