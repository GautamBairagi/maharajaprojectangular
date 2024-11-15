import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/httpServices';
import { superAdminEndPoints } from '../Urls/ApiUrl';
import { Observable,BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllService extends HttpService {
  constructor(public override http:HttpClient,
  ) {
    super(http)
   }
   superAdminLogin(data: any) {
    return this.post(superAdminEndPoints.superAdminLogin,data)
   }
   createusersadmin(data: any) {
    return this.post(superAdminEndPoints.createusers,data)
   }
  getsidebarmenu(){
    return this.get(superAdminEndPoints.getsidebar)
   }

   sibeMenuById(id:any){
    return this.get(superAdminEndPoints.SidebarByID + id )
   }

  //  editSideMenuName(id:any,data:any){
  //   return this.put(superAdminEndPoints.SidebarByID + id , data )
  //  }

   editSideMenuName(id: any, updatedData: any) {
    return this.put(superAdminEndPoints.SidebarByID + id, updatedData);
  }

   getsubmenu(){
    return this.get(superAdminEndPoints.getSubMenu)
   }

   getUsersdata(){
    return this.get(superAdminEndPoints.getUsers)
   }
   



   updateMenu(url: string, payload: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.put(url, payload, options);
  }

  updateSubMenu(url: string, payload: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.put(url, payload, options);
  }

  // updateMenu(url: string, payload: any){
  //   return this.put(superAdminEndPoints.updateSidebar , url , payload)
  // }

  //  private apiUrl = superAdminEndPoints.getsidebar;
  
  //  getsidebarmenu(): Observable<SidebarItem[]> {
  //    return this.http.get<SidebarItem[]>(this.apiUrl);
  //  }
}
