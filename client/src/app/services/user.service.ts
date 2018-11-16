import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  domain = "https://polar-castle-68205.herokuapp.com";
  
  constructor(private http: HttpClient) { }
  getUsers(): Promise<any> {
    let promise = new Promise((resolve,reject) => {
      this.http.get(this.domain + '/ehos/users').toPromise()
      .then(
        res => { // Success
          resolve(res);
       },
       msg => { // Error
         reject(msg);
       });
   });
   return promise;
  }
  getProfile(): Observable<any> {
    return this.http.get(this.domain + '/ehos/users/me');
  }
  getUser(id): Observable<any> {
    return this.http.get(this.domain + '/ehos/users/' + id);
  }
  patchProfile(user): Observable<any> {
    return this.http.patch(this.domain + '/ehos/users',user);
  }
  approveLabAccounts(): Promise<any> {
    let promise = new Promise((resolve,reject) => {
      this.http.put(this.domain + '/ehos/users',{}).toPromise()
      .then(
        res => { // Success
          resolve(res);
       },
       msg => { // Error
         reject(msg);
       });
   });
   return promise;
  }
  deleteUser(user) {
    let promise = new Promise((resolve,reject) => {
      this.http.delete(this.domain + '/ehos/users/' + user).toPromise()
      .then(
        res => { // Success
          resolve(res);
       },
       msg => { // Error
         reject(msg);
       });
   });
   return promise;
  }
}
