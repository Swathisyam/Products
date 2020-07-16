import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
logUser=
{
  "email":"",
  "password": ""
};

constructor(private authService : AuthService ,private router : Router) { }

  loginUser(){
    this.authService.loginUser(this.logUser)
    // .subscribe(
    //   res=> {
    //     console.log(res),
    //     localStorage.setItem('token',res['token']);       //token in local storage
    //     this.router.navigate(['/add']);
    //   },
    //   err => console.log(err)
    // )
    .subscribe(
      res => this.router.navigate(['/']),
      // res => console.log(res),
      err => console.log(err)
      
    )
    
  }

  ngOnInit(): void {  }
  
}
