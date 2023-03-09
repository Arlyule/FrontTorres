import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLogged: boolean=false;
  isAdmin:boolean=false;
  userName: string='';
  constructor(private token:TokenService, private router:Router){ }

  ngOnInit(): void {
    this.isLogged=this.token.isLogged();
    this.isAdmin = this.token.isAdmin();
    this.userName = this.token.getDatesUser();

  }

  logOut(): void{
    this.token.logOut();
    this.router.navigate(["login"]);
    location.reload();
  }
}
