import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-ver-proveedores',
  templateUrl: './ver-proveedores.component.html',
  styleUrls: ['./ver-proveedores.component.css']
})
export class VerProveedoresComponent implements OnInit {
  proveedores:Proveedor[]=[];
  isAdmin:boolean=false;
  constructor(private proveedorService:ProveedorService,private toast:ToastrService, private token:TokenService) { }

  ngOnInit(): void {
    this.getProveedores();
    this.isAdmin = this.token.isAdmin();
  }

  getProveedores():void{
    this.proveedorService.list().subscribe(
      data=>{
        this.proveedores=data;
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
  }

  onDelete(id:number):void{
    this.proveedorService.delete(id).subscribe(
      data=>{
        this.toast.success(data.mensaje,'OK',{timeOut:3000});
        this.getProveedores();
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
  }

}
