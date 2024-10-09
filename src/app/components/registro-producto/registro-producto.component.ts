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

  //metodo que permite enviar un documento a guardar mediante el api.
  guardar(){
    if (this.activoId != 0) {
      console.log("activoId -> " + this.activoId)
      this.actualizarProducto();
    } else { 
      this.registroProducto();
    }
  }

  registroProducto() {
    this.productosService.formulario.disable();
      const observer = {
        next: (result: any) => {
          console.log("result usuario ->>")
          console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Creación',
                text: result.message,
            });
        },
        error: (error: any) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
            this.productosService.formulario.enable();
        },
        complete: () => {
          this.onClear();
        }
    };   
    this.productosService.crear1().subscribe(observer);
  }

  actualizarProducto() {
    this.productosService.formulario.disable();
      const observer = {
        next: (result: any) => {
          console.log("result usuario ->>")
          console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Creación',
                text: result.message,
            });
        },
        error: (error: any) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
            this.productosService.formulario.enable();
        },
        complete: () => {
          this.onClear();
        }
    };   
    this.productosService.actualizar().subscribe(observer);
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

    // registroProducto1(){
  //   this.productosService.crear().subscribe(
  //     (result: any) => {
  //       console.log(result)       
  //       this.router.navigate(['/productos']);
  //     },error => console.log(error));
  // }

  // registroProducto(){
  //   this.productosService.crear1().subscribe(
  //     (result: any) => {
  //       console.log(result);
  //       Swal.fire({
  //         icon:'success',
  //         title:'Creacion',
  //         text:'Se realizo la creacion del registro exitosamente'
  //       });
  //       this.router.navigate(['/productos']);
  //     },
  //     (result) => {
  //       console.log(result);
  //       Swal.fire({
  //         icon:'error',
  //         title:'Error',
  //         text: result.error.message,
  //       });
  //     }
  //   );
  // }

  // actualizarProducto(){
  //   this.productosService.actualizar().subscribe(
  //     (result: any) => {
  //       console.log(result);
  //       Swal.fire({
  //         icon:'success',
  //         title:'Actualizacion',
  //         text:'Registro actualizado exitosamente',
  //       });
  //       this.router.navigate(['/productos']);
  //     },
  //     (result) =>{
  //       Swal.fire({
  //         icon:'error',
  //         title:'Error',
  //         text: result.error.message,
  //       });
  //     }
  //   );
  // }

}
