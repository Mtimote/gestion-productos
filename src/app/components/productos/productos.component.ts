import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/modelos/productos';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Productos [];
  size: number = 10;
  search: string = 'null';
  pages: number[] = [];
  page: number = 0;
  totalElements: number = 0;
  indexTab: number = 0;
  fechaDesde: string = "";
  totalTable: number = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private productosService:ProductosService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerCuentasPagarCobrar();
    // this.obtenerProductos();
    // this.paginationService.paginationEvent.subscribe((page) => {
    //   this.page = page;
    //   this.obtenerProductos();
    // });
  }

  private lista() {this.productosService.listarProductos1().subscribe(list => {
    this.productos = list;
    console.log(list);
  });
  }

  obtenerProductos() {
    this.productos = [];
    //this.accionRolModal = 'CREACIÓN';
    this.productosService
      .listarPaginado(this.page, this.size)
      .subscribe((list) => {
        this.productos = list.content;
        this.pages = new Array(list.totalPages);
      });
  }

  crear() {
    this.productosService.formulario.reset();
    this.productosService.iniciarFomulario();
    this.router.navigateByUrl('/guardar-producto/0');
  }

  editar(itemToEdit: Productos) {
    console.log("ingrese ->")
    this.router.navigateByUrl(`/guardar-producto/${itemToEdit.activoId}`);
  }

  eliminar1(itemToEdit: Productos) {
    console.log("ingrese ->")
    this.productosService.eliminarproducto(itemToEdit.activoId).subscribe(dato => {
      this.lista();
    });
  }

  eliminar(itemToEdit: Productos) {
    Swal.fire({
      title:'Verificar',
      text:'¿Esta Seguro de eliminar este registro?',
      icon:'warning',
      showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,eliminar!'
    }).then((result => {
      if (result.value) {
        this.productosService.eliminarproducto(itemToEdit.activoId).subscribe(
          (result:any) => {
            this.lista();
            Swal.fire({
              title:'Eliminado',
              text:'Registro eliminado correctamente',
              icon:'success',
            })
          })
      }
    }))
  }

  cambioPagina(event: PageEvent) {
    console.log("event ->");
    console.log(event);
    this.page = event.pageIndex;
    this.size = event.pageSize;
    // if (this.indexTab == 0) {
    //   this.obtenerCuentasPagarCobrar();
    // } else {
    //   this.obtenerCuentasPagarCobrar();
    // }
    this.obtenerCuentasPagarCobrar();
  }

    obtenerCuentasPagarCobrar() {
      console.log(this.page);
      console.log(this.size);
      this.productos = [];
      this.productosService
      .listarPaginado(this.page, this.size).subscribe((result) => {
        // console.log("result ->");
        // console.log(result);
          // this.productos = result['listPage']['content'];
          // this.totalElements = result['listPage']['totalElements'];
          // this.pages = new Array(result['listPage']['totalPages']);
          this.productos = this.productos = result.content;
          this.totalElements = result.totalElements;
          this.pages = new Array(result.totalPages);
          
        });  
        console.log("productos ->");
        console.log(this.productos);
    }
    
}
