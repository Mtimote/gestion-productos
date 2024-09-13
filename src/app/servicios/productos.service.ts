import { Injectable } from '@angular/core';
import { Productos } from '../modelos/productos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, tap } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private path : string = "/productos"
  private urlg = `${environment.urlApi}${this.path}`;
  private urlg1 = `${environment.urlApi}${this.path}`;
  productos: Productos [] = [];
  constructor(private http:HttpClient) { }

  listarProductos():Observable<Productos[]>{
    let urlLista = "/obtener-lista/";
    console.log("url -> " + `${this.urlg}${urlLista}`);
    return this.http.get<Productos[]>(`${this.urlg}${urlLista}`);
  }

  //crearProducto():{}

  listar():Observable<any>{
    //let url = `${environment.urlApi}${this.path}/obtener-lista/`;
    let url = this.urlg + "/obtener-lista/";
    console.log(url);
    return this.http.get(url).pipe(
      tap((result: any) => (this.productos = result)),
      map((result: any) => result)
    );
  }

  registrarProducto(producto:Productos):Observable<Object>{
    let url = this.urlg + "/crear/";
    return this.http.post(url,producto);
  }

  detalle(activoId: number): Observable<Productos> {
    //let url = `${environment.urlApi}${this.path}/find/${activoId}`;
    let url = this.urlg + "/buscar/" + activoId;
    console.log(url);
    return this.http.get<Productos>(url);
  }

  crear() {
    let itemToCreate: Productos = Object.assign({}, this.formulario.value);
    //let url = `${environment.urlApi}${this.path}/crear`;
    let url = this.urlg + "/crear/";
    console.log(itemToCreate);
    return this.http.post(url, itemToCreate);
  }

  actualizar(): Observable<any> {
    let itemToEdit: Productos = Object.assign({}, this.formulario.value);
    let url = this.urlg + "/actualizar/" + itemToEdit.activoId;
    console.log(url);
    //let url = `${environment.urlApi}${this.path}/actualizar/${itemToEdit.activoId}`;
    return this.http.put(url, itemToEdit);
  }

  eliminarproducto(activoId:number):Observable<Object> {
    let url = this.urlg + "/eliminar/" + activoId;
    console.log(url);
    return this.http.delete(url);
  }

  formulario: FormGroup = new FormGroup({
    activoId: new FormControl(0),
    activoNombre: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(40)]),
    activoDescripcion: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(40)]),
    activoTipo: new FormControl('', Validators.required),
    activoSerial: new FormControl('', Validators.required),
    activoNumeroInterno: new FormControl('', Validators.required),
    activoPeso: new FormControl('', Validators.required),
    activoAlto: new FormControl('', Validators.required),
    activoAncho: new FormControl('', Validators.required),
    activoLargo: new FormControl('', Validators.required),
    activoValorCompra: new FormControl('', Validators.required),
    //activoFechaCompra: new FormControl('', Validators.required),

  });

  poblarFormulario(itemToEdit: Productos) {
    this.formulario.setValue({
      activoId: itemToEdit.activoId,
      activoNombre: itemToEdit.activoNombre,
      activoDescripcion: itemToEdit.activoDescripcion,
      activoTipo: itemToEdit.activoTipo,
      activoSerial: itemToEdit.activoSerial,
      activoNumeroInterno: itemToEdit.activoNumeroInterno,
      activoPeso: itemToEdit.activoPeso,
      activoAlto: itemToEdit.activoAlto,
      activoAncho: itemToEdit.activoAncho,
      activoLargo: itemToEdit.activoLargo,
      activoValorCompra: itemToEdit.activoValorCompra,
      //activoFechaCompra: itemToEdit.activoFechaCompra,
    });
  }
  
  iniciarFomulario() {
    this.formulario.setValue({
    activoId: 0,
    activoNombre: '',
    activoDescripcion: '',
    activoTipo: '' ,
    activoSerial: '',
    activoNumeroInterno: 0,
    activoPeso: 0,
    activoAlto: 0,
    activoAncho: 0,
    activoLargo: 0,
    activoValorCompra: 0,
    //activoFechaCompra: '',
    });
  }

    // activoId: number;
    // activoNombre: string;
    // activoDescripcion: string;
    // activoTipo: string ;
    // activoSerial: string;
    // activoNumeroInterno: number;
    // activoPeso: number;
    // activoAlto: number;
    // activoAncho: number;
    // activoLargo: number;
    // activoValorCompra: number;
    // activoFechaCompra: any;

    listarProductos1():Observable<Productos[]>{
      //let urlLista = "";
      console.log("url -> " + `${this.urlg1}`);
      return this.http.get<Productos[]>(`${this.urlg1}`);
    }

    listarPaginado(
      page: number,
      size: number
    ): Observable<any> {
      let url = `${environment.urlApi}${this.path}/list-paginado/${page}/${size}`;
      return this.http.get(url).pipe(
        tap((result: any) => (this.productos = result)),
        map((result: any) => result)
      );
    }

    crear1() {
      let itemToCreate: Productos = Object.assign({}, this.formulario.value);
      //let url = `${environment.urlApi}${this.path}/crear`;
      let url = this.urlg1 ;
      console.log(itemToCreate);
      return this.http.post(url, itemToCreate);
    }

    detalle1(activoId: number): Observable<Productos> {
      //let url = `${environment.urlApi}${this.path}/find/${activoId}`;
      let url = this.urlg1 + "/obtener/" + activoId;
      console.log(url);
      return this.http.get<Productos>(url);
    }
  
    eliminarproducto1(activoId:number):Observable<Object> {
      let url = this.urlg + "/eliminar/" + activoId;
      console.log(url);
      return this.http.delete(url);
    }
}
