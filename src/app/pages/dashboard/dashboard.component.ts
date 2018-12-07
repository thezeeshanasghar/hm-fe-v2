import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any={};

  constructor(private router: Router) {
    // this.validateLogin()  
    let obj = JSON.parse(localStorage.getItem("Authorized"))
    this.currentUser=JSON.parse(localStorage.getItem('Authorized'));


    console.log(obj.Authorized.Authorized);


  }

  validateLogin() {

    let obj = JSON.parse(localStorage.getItem("Authorized"))


    if (!obj || obj.Authorized == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem("Authorized", "");
    this.router.navigate(['login']);
  }

}
