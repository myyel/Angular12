import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated:boolean=false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      this.isAuthenticated=!user? false: true;
    })
  }

  onLogout(){
    this.authService.signout();
    this.router.navigate(["/auth"]);
  }

}
