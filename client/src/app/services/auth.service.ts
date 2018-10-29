import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import * as jwt_decode from 'jwt-decode';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  domain = "http://localhost:3000";
  jwt;
  role;
  options;
  constructor(private http: HttpClient) {
  }

  // Function that will submit a post request for the backend to handle
  registerUser(user): Observable<any> {
    return this.http.post(this.domain + "/authentication/register",user);
  }
  loginUser(user): Observable<any> {
    return this.http.post(this.domain + "/authentication/login",user);
  }
  checkEmail(email): Observable<any> {
    return this.http.get(this.domain + "/authentication/checkEmail/" + email);
  }

  approveUser(user) {
    let promise = new Promise((resolve,reject) => {
       this.http.post(this.domain + '/ehos/setAccount', user).toPromise()
       .then(
         res => { // Success
           resolve();
        },
        msg => { // Error
          reject(msg);
        });
    });
    return promise;
  }
  tokenExpired(){
    this.loadToken();
    if (!this.jwt) {
      return true;
    }
    const date = this.tokenExpires(this.jwt);

    if(date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
 
  setUser(token,privilege,expires){
     // Start the session
    localStorage.setItem('token',token);
    localStorage.setItem('privilege',privilege);
    localStorage.setItem("expires", expires);
    this.jwt = token;
  }
  unsetUser(){
    // Close the session
    localStorage.removeItem('token');
    localStorage.removeItem('privilege');
    localStorage.removeItem("expires");
  }
  loadToken(){
    this.jwt = localStorage.getItem('token'); // Load in the token to the apps variable jwt
  }
  getRole(){
    if (!localStorage.getItem('privilege')) {
      return 0;
    }
    else {
      return Number(localStorage.getItem('privilege'));
    }
  }
  tokenExpires(token){
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}