import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/httpServices';
import { superAdminEndPoints } from '../Urls/ApiUrl';
import { Observable,BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllService extends HttpService {

  private headerColor = '#ff416c'; // default color
  private sidebarColor = '#ff4b2b'; // default color
  private headerFontColor = '#ffffff';
  private sidebarFontColor = '#ffffff';

  setHeaderColor(color: string) {
    this.headerColor = color;
    document.documentElement.style.setProperty('--header-color', color);
  }

  setSidebarColor(color: string) {
    this.sidebarColor = color;
    document.documentElement.style.setProperty('--sidebar-color', color);
  }

  setHeaderFontColor(color: string) {
    this.headerFontColor = color;
    document.documentElement.style.setProperty('--header-font-color', color);
  }

  setSidebarFontColor(color: string) {
    this.sidebarFontColor = color;
    document.documentElement.style.setProperty('--sidebar-font-color', color);
  }

  getHeaderColor() {
    return this.headerColor;
  }
  getHeaderFontColor(){
    return this.headerFontColor;
  }

  getSidebarFontColor(){
    return this.sidebarFontColor;
  }

  getSidebarColor() {
    return this.sidebarColor;
  }

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

   subSideMenuById(id:any){
    return this.get(superAdminEndPoints.SubSidebarByID + id )
   }

  //  editSideMenuName(id:any,data:any){
  //   return this.put(superAdminEndPoints.SidebarByID + id , data )
  //  }

   editSideMenuName(id: any, updatedData: any) {
    return this.put(superAdminEndPoints.SidebarByID + id, updatedData);
  }

  editSubSideMenuName(id: any, updatedData: any) {
    return this.put(superAdminEndPoints.SubSidebarByID + id, updatedData);
  }

   getsubmenu(){
    return this.get(superAdminEndPoints.getSubMenu)
   }

   getUsersdata(){
    return this.get(superAdminEndPoints.getUsers)
   }

   getClients(){
    return this.get(superAdminEndPoints.getClients)
   }

   postRoomData(data:any){
    return this.post(superAdminEndPoints.createRooms,data)
   }

   getRooms(){
    return this.get(superAdminEndPoints.rooms)
   }

   getUserDtlsRooms(id:any){
    return this.get(superAdminEndPoints.userDetailsForRoom + id )
   }


   updateMenu(url: string, payload: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.put(url, payload, options);
  }

  getToken(){
    const tokkn= localStorage.getItem("user_token");
    const wspace= localStorage.getItem("workspace_id");
    return {tokkn,wspace}
   }

  updateSubMenu(url: string, payload: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.put(url, payload, options);
  }


  

 

   
   getuserById(id:any){
    return this.get(superAdminEndPoints.getUsersByid + id )
   }


   userupdatedss(id:any, data:any){
    return this.put(superAdminEndPoints.Usersupdate + id, data )
   }






   

  // updateMenu(url: string, payload: any){
  //   return this.put(superAdminEndPoints.updateSidebar , url , payload)
  // }

  //  private apiUrl = superAdminEndPoints.getsidebar;
  
  //  getsidebarmenu(): Observable<SidebarItem[]> {
  //    return this.http.get<SidebarItem[]>(this.apiUrl);
  //  }
}
