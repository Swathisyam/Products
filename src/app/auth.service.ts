import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private _regUrl = "http://localhost:3000/register";
  private _loginUrl="http://localhost:3000/login";


  constructor(private http: HttpClient) { }

  // newUser(details){
  //   return this.http.post("http://localhost:3000/register",{"user":details})
  //   .subscribe(data =>{console.log(data)})
  // }
  
  registerUser(user){
    return this.http.post(this._regUrl,user)
  }
  loginUser(user){
    return this.http.post(this._loginUrl,user)
    // .subscribe(data =>{console.log(data)})
  }
  // loggedIn(){
  //   return !!localStorage.getItem('token')
  // }
  
  // }
}
