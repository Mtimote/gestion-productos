import { HttpClient } from '@angular/common/http';
import { Usuario } from './../modelos/usuario.models';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Rol } from '../modelos/rol.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private path : string = "/usuarios"
  private pathRol : string = "/roles"
  private urlg = `${environment.urlApi}${this.path}`;
  usuario: Usuario [] = [];
  constructor(private http:HttpClient) { }

  formulario: FormGroup = new FormGroup({
    usuarioId: new FormControl(0),
    primerNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), 
      Validators.minLength(4), Validators.maxLength(16),]),
    segundoNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(4), Validators.maxLength(16),
    ]),
    primerApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(4), Validators.maxLength(16),
    ]),
    segundoApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(4), Validators.maxLength(16),
    ]),
    docIdentidad: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$'),]),
    correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),]),
    rolId: new FormControl(0),
  });

  guardarUsuario() {
    let item : Usuario = Object.assign({}, this.formulario.value);
    console.log("usuario a registrar -> ");
    console.log(item);
    return this.http.post(this.urlg, item);
  }

  iniciaForm() {
    this.formulario.setValue({
      usuarioId: 0,
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      docIdentidad: '',
      correo: '',
      rolId: 0,
    });
  }
  
  listaRoles():Observable<Rol[]> {
    console.log("urll -> " + `${environment.urlApi}${this.pathRol}`);
    return this.http.get<Rol[]>(`${environment.urlApi}${this.pathRol}`);
  }
}
