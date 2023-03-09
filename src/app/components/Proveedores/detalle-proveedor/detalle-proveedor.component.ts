import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';
import * as $ from "jquery";

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css']
})
export class DetalleProveedorComponent implements OnInit {

  aux!:[];
  productos:Producto[]=[];
  porducto:Producto|undefined;
  proveedor!:Proveedor|undefined;
  isAdmin: boolean=false;
 
  constructor(
  private proveedorService:ProveedorService,
  private productoService:ProductoService,
  private toast:ToastrService, 
  private token:TokenService,
  private router:Router, 
  private activateRoute:ActivatedRoute){ }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.getData();
  }

  getData(){
    const id= this.activateRoute.snapshot.params['id'];
    const nombreProvedor=this.activateRoute.snapshot.params['nombreProvedor'];
    this.proveedorService.detailProvedorProducts(id,nombreProvedor).subscribe(
      data=>{
        this.aux=data;
        this.proveedor=this.aux.shift();
        this.productos=this.aux;
        for(var i=0;i<this.productos.length;i++){
          this.stock(this.productos[i].id);
        }
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
        this.router.navigate(['/proveedor/lista'])
      }
    )
  }

  stock(id:number){
    this.productoService.detail(id).subscribe(
      data=>{
        this.porducto=data;
        if(this.porducto.existencia==true && this.porducto.porAgotarse==false){
          $('#stock' + id).css('background-color', '#9FE49A');
        }else if(this.porducto.existencia==true && this.porducto.porAgotarse==true){
          $('#stock' + id).css('background-color', '#F7BE93');
        }else if(this.porducto.existencia==false){
          $('#stock' + id).css('background-color', '#EC6F6F');
        }
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
}

  

}
