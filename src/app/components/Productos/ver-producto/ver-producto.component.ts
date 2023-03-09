import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { TokenService } from 'src/app/service/token.service';
import * as $ from "jquery";


@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {
  productos:Producto[]=[];
  porducto:Producto|undefined;
  isAdmin:boolean=false;
  filterProductos='';
  
  constructor(private productoService:ProductoService,private toast:ToastrService, private token:TokenService) { }

  ngOnInit(): void {
    this.getProductos();
    this.isAdmin = this.token.isAdmin();
  }

  getProductos():void{
    this.productoService.list().subscribe(
      data=>{
        this.productos=data;
        for(var i=0;i<this.productos.length;i++){
          this.stock(this.productos[i].id);
        }
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
  }
  onDelete(id:number):void{
    this.productoService.delete(id).subscribe(
      data=>{
        this.toast.success(data.mensaje,'OK',{timeOut:3000});
        this.getProductos();
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
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
