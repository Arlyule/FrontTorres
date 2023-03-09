import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/app/models/create-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nombreUsuario!: string;
  password!: string;
  email!: string;
  roles!: Optional;

  constructor(private auth:AuthService,private token:TokenService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  onRegister(): void{
    const dto=new CreateUser(this.nombreUsuario,this.email,this.password,[this.roles]);
    this.auth.register(dto).subscribe(
      data=>{
        this.toastr.success(data.mensaje, 'OK', {timeOut: 3000}); 
      },
      err=>{
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000}); 
      }
    );
  }

}
