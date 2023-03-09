import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente!:Clientes ;

  constructor(private clienteService:ClienteService, private activateRoute:ActivatedRoute,private toastr: ToastrService,private router:Router) { }

  ngOnInit(){
    const id=this.activateRoute.snapshot.params['id'];
    this.clienteService.detail(id).subscribe(
      data=>{
        this.cliente=data;
      },
      err=>{
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000}); 
          this.router.navigate(["/lista"]);
      }
    );
  }

  onUpdate():void{
    const id=this.activateRoute.snapshot.params['id'];
    this.clienteService.update(id,this.cliente).subscribe(
      data=>{
        this.toastr.success('Cliente Actualizado', 'OK', {
          timeOut: 3000});
          this.router.navigate(["/cliente/lista"])
      },
      err=>{
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000});
          this.router.navigate(["/cliente/lista"])
      }
    );
  }

}
