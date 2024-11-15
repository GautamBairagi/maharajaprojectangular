import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AllService } from "../Api/all.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private service: AllService
    ) {}
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.service.getToken()) {
            console.log("interceptor token", this.service.getToken());
            const modifiedrequest = req.clone({
                setHeaders: {
                    Authkey: `${this.service.getToken()}`,
                }
            })
            return next.handle(modifiedrequest)
        }
        else{
          return next.handle(req)
        } 
    }
}




