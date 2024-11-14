import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError,throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {  delay } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class HttpService {
    token:any;

    constructor(public http:HttpClient){
        this.token = localStorage.getItem('token');
        console.log("https token get", this.token)
    }


    // get(url: string): Observable<any> {
    //     const val = new HttpHeaders({
    //       'Content-type': 'application/json',
    //       Authorization: `${this.token}`,
    //     });
      
    //     return this.http.get<any>(url, {
    //       headers: val
    //     }).pipe(
    //       delay(2000), // delay by 1 second (1000 milliseconds)
    //       catchError(this.errorHandle)
    //     );
    //   }


    



    // get(url: string): Observable<any> {
    //      const val = new HttpHeaders({
    //         'Content-type': 'application/json',
    //         Authorization: `${this.token}`,
    //       });
    //     return this.http.get<any>(url,{
    //         headers:val
    //     }).pipe(catchError(this.errorHandle))
    // }

    post(url: string, payload?:any): Observable<any> {
        const opt = new HttpHeaders({
            'Content-type': 'application/json',
            Authorization: `${this.token}`,
          });
        return this.http.post<any>(url,payload,{
            headers:opt
        }).pipe(catchError(this.errorHandle))
    }

    put(url: string, payload?:any): Observable<any> {
        const opt = new HttpHeaders({
            'Content-type': 'application/json',
            Authorization: `${this.token}`,
          });
        return this.http.put<any>(url,payload,{
            headers:opt
        }).pipe(catchError(this.errorHandle))
    }



    patch(url: string, payload?:any): Observable<any> {
        const opt = new HttpHeaders({
            'Content-type': 'application/json',
            Authorization: `${this.token}`,
          });
        return this.http.patch<any>(url,payload,{
            headers:opt
        }).pipe(catchError(this.errorHandle))
    }

    delete(url: string): Observable<any> {
        const val = new HttpHeaders({
           'Content-type': 'application/json',
           Authorization: `${this.token}`,
         });
       return this.http.delete<any>(url,{
           headers:val
       }).pipe(catchError(this.errorHandle))
   }

    errorHandle(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            
            return errorMessage;
        });
    }

}