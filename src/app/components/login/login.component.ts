import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/modelos/rol.models';
import { Usuario } from 'src/app/modelos/usuario.models';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Usuario;
  constructor(public service:LoginService, private router:Router , private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.logout();
  }

  guardar() {
    //this.service.formLogin.disable();
    console.log("fecha -->")
    console.log(new Date())
    //if (this.usuarioService.formulario.get('usuarioId').value <= 0) {
      const observer = {
        next: (result: any) => {
          // const userString = localStorage.getItem('user');
          // if (userString) {
          //   this.user = JSON.parse(userString);
          //   console.log(this.user);
          // }
          //this.router.navigate(['productos']);
          
        },
        error: (error: any) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Usuario o contraseña incorrectos.",
            });
            this.service.formLogin.enable();
            this.service.formLogin.reset();
        },
        complete: () => {
          const userString = localStorage.getItem('user');
          if (userString) {
            this.user = JSON.parse(userString);
            console.log(this.user);
          }
          this.router.navigateByUrl('productos');
          this.service.formLogin.reset();
        }
    };
        this.service.login().subscribe(observer);
  }

  guardar1() {
    this.service.login().subscribe({
      next: (res) => {
        const userString = localStorage.getItem('user');
        if (userString) {
          this.user = JSON.parse(userString);
          console.log(this.user);
        }
        this.router.navigate(['/productos']);
        
      },
      error: (result) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Datos Erroneos!',
        });
      }
    });
}

logout(): void {
  this.service.logout();
  //this.router.navigate(['/login']);
}

}
