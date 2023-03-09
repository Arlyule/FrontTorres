import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/service/cliente.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})
export class VerClienteComponent implements OnInit {

clientes:Clientes[]=[];
isAdmin:boolean=false;
isMan:boolean=false;
isIns:boolean=false;

  constructor(private clienteService:ClienteService,private toastr: ToastrService,private token:TokenService,private router:Router) { }

  ngOnInit(): void {
    this.listaClientes();
    this.isAdmin = this.token.isAdmin();
  }

  listaClientes():void{
    this.clienteService.lista().subscribe(
      data=>{
        this.clientes=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  borrar(id:number){
   this.clienteService.delete(id).subscribe(
    data=>{
      this.toastr.success('Cliente Eliminado', 'OK', {
        timeOut: 3000});
        this.listaClientes();
    },
    err=>{
      this.toastr.error(err.error.mensaje, 'Fail', {
        timeOut: 3000}); 
    }
   );
  }

}
