import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/modelos/rol.models';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public productosService:ProductosService, private router:Router , private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
  }

}
