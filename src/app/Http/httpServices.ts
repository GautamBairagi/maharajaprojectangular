import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError,throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    token:any;

    constructor(public http:HttpClient){
        this.token = sessionStorage.getItem('token');
        
    }

    get(url: string): Observable<any> {
         const val = new HttpHeaders({
            'Content-type': 'application/json',
            Authkey: ` ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc0MiwiZW1haWwiOiJtYXlhbmtAZ21haWwuY29tIiwiaWF0IjoxNzMxNTAyMTQwLCJleHAiOjE3MzE1MDU3NDB9.MOSYLutYs7td6TXTE7mhyf3w_TiK14lNupb70fyFXB4'}`,
          });
        return this.http.get<any>(url,{
            headers:val
        }).pipe(catchError(this.errorHandle))
    }

    post(url: string, payload?:any): Observable<any> {
        const opt = new HttpHeaders({
            'Content-type': 'application/json',
            Authkey: `${this.token}`,
          });
        return this.http.post<any>(url,payload,{
            headers:opt
        }).pipe(catchError(this.errorHandle))
    }

    put(url: string, payload?:any): Observable<any> {
        const opt = new HttpHeaders({
            'Content-type': 'application/json',
            Authkey: `${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc0MiwiZW1haWwiOiJtYXlhbmtAZ21haWwuY29tIiwiaWF0IjoxNzMxNTAyMTQwLCJleHAiOjE3MzE1MDU3NDB9.MOSYLutYs7td6TXTE7mhyf3w_TiK14lNupb70fyFXB4'}`,
          });
        return this.http.put<any>(url,payload,{
            headers:opt
        }).pipe(catchError(this.errorHandle))
    }



    patch(url: string, payload?:any): Observable<any> {
        const opt = new HttpHeaders({
            'Content-type': 'application/json',
            Authkey: `${this.token}`,
          });
        return this.http.patch<any>(url,payload,{
            headers:opt
        }).pipe(catchError(this.errorHandle))
    }

    delete(url: string): Observable<any> {
        const val = new HttpHeaders({
           'Content-type': 'application/json',
           Authkey: `${this.token}`,
         });
       return this.http.delete<any>(url,{
           headers:val
       }).pipe(catchError(this.errorHandle))
   }

    errorHandle(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            
            return errorMessage;
        });
    }

}