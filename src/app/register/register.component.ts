import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
// import { UserModel } from '../register/register.model'
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
// const jwt = require('jsonwebtoken');



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  token:string 
  regUser=
  {
    "email":"",
    "password": ""
  }

  
  constructor(private authService:AuthService, private router:Router) { }
   registerUser(){
     this.authService.registerUser(this.regUser)
    //  .subscribe(
    //    res=> {
    //      console.log(res),
    //      this.token = res['token']
    //      localStorage.setItem('token',res['token']);
    //      this.router.navigate(['/login']);
    //    },
    //    err => console.log(err)
    //  )
     .subscribe(
       res => console.log(res),
       err => console.log(err)
     )
     this.router.navigate(['/login']);
   }

  ngOnInit(): void {
  }
  
}
