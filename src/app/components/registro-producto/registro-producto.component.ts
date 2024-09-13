import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { create } from 'domain';
import { Productos } from 'src/app/modelos/productos';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css']
})
export class RegistroProductoComponent implements OnInit {

  producto : Productos = new Productos();
  titulo : String = "Crear Producto";
  activoId: number = 0;
  message: string = '';
  
  constructor(public productosService:ProductosService, private router:Router , private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.activoId = params.id;
    });
   }

  ngOnInit(): void {
    console.log("activoId -> " + this.activoId);
    if (this.activoId > 0) {
      this.titulo  = "Editar Producto";
      this.obtenerProducto(this.activoId);
    }
    this.limpiarFormulario();
  }

  refresh(): void { window.location.reload(); }

  obtenerProducto(activo: number) {
    this.productosService.detalle1(activo).subscribe((producto) => {
      this.producto = producto;
      this.productosService.poblarFormulario(this.producto);
    });
  }

  limpiarFormulario(){
    this.productosService.iniciarFomulario();
  }

  // guardar(){
  //   this.productosService.registrarProducto(this.producto).subscribe(dato => {
  //     console.log(dato);
  //     //error => console.log(error)
  //     this.direccionarLista();
  //   },error => console.log(error));
  // }

  guardar1(){
    if (this.activoId != 0) {
      console.log("activoId -> " + this.activoId)
      this.actualizarProducto();
    } else { 
      this.registroProducto();
    }
  }

  registroProducto1(){
    this.productosService.crear().subscribe(
      (result: any) => {
        console.log(result)       
        this.router.navigate(['/productos']);
      },error => console.log(error));
  }

  registroProducto(){
    this.productosService.crear1().subscribe(
      (result: any) => {
        console.log(result);
        Swal.fire({
          icon:'success',
          title:'Creacion',
          text:'Se realizo la creacion del registro exitosamente'
        });
        this.router.navigate(['/productos']);
      },
      (result) => {
        console.log(result);
        Swal.fire({
          icon:'error',
          title:'Error',
          text: result.error.message,
        });
      }
    );
  }

  

  actualizarProducto(){
    this.productosService.actualizar().subscribe(
      (result: any) => {
        console.log(result);
        Swal.fire({
          icon:'success',
          title:'Actualizacion',
          text:'Registro actualizado exitosamente',
        });
        this.router.navigate(['/productos']);
      },
      (result) =>{
        Swal.fire({
          icon:'error',
          title:'Error',
          text: result.error.message,
        });
      }
    );
  }

  direccionarLista(){
    this.router.navigate(['/productos']);
  }

  onClose() {
    this.onClear();
  }

  onClear() {
    this.productosService.formulario.reset();
    this.productosService.iniciarFomulario();
    this.router.navigateByUrl('/productos');
  }

}
