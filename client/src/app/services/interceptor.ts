import { Injectable,Injector } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { Observable } from 'rxjs/Observable';

/* Purpose: Now that we have the JWT saved in the browser, let's keep tracking its journey through the network by appending
/ the jwt onto each HTTP Request that requires authentication
/ if the JWT is not present, then the request goes through to the server unmodified
/ if the JWT is present, then we will clone the HTTP headers, and add an extra Authorization header, which will contain the JWT
*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private inject: Injector) {
    }
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        let authService = this.inject.get(AuthService); // Avoid cyclic dependency error
        authService.loadToken();
        
        if (authService.jwt) {
            const cloneHttpReq = req.clone({
                headers: req.headers.set("authorization", localStorage.getItem('token')) // Our HTTP header modified
            });
            console.log(cloneHttpReq);
            return next.handle(cloneHttpReq);
        }
        else {
            console.log('next req');
            return next.handle(req);
        }
    }
}