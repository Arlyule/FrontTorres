import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombreUsuario!: string;
  password!: string;

  constructor(private auth:AuthService,private token:TokenService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    const dto= new LoginUser(this.nombreUsuario,this.password);
    this.auth.login(dto).subscribe(
      data=>{
        this.token.setToken(data.token);
        this.router.navigate(['/home']);
        location.reload();
      },
      err=>{
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000}); 
      }
    );

  }

}
