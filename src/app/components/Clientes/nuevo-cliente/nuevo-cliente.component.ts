import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {
  nombre:String="";

  constructor(private clienteService:ClienteService, private toastr: ToastrService, private router:Router) { 
  }

  ngOnInit(): void {
  }

  onCreate():void{
    const cliente=new Clientes(this.nombre);
    this.clienteService.save(cliente).subscribe(
      data=>{
        this.toastr.success('Cliente Guardado', 'OK', {
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
