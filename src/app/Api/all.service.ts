import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/httpServices';
import { superAdminEndPoints } from '../Urls/ApiUrl';
// import { ToastrService } from 'ngx-toastr';
import { Observable,BehaviorSubject  } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AllService extends HttpService {

  constructor(public override http:HttpClient,
    // private _tos:ToastrService
  ) {
    super(http)
   }

   superAdminLogin(data: any) {
    return this.post(superAdminEndPoints.superAdminLogin,data)
   }

   createusersadmin(data: any) {
    return this.post(superAdminEndPoints.createusers,data)
   }

   

   doctorsForSuperAdmin(){
    return this.get(superAdminEndPoints.getdoctors)
   }
   getEmailAdmin(){
    return this.get(superAdminEndPoints.getEmail)
   }
   addemailAdmin(data: any){
    return this.post(superAdminEndPoints.addemail,data)
   }


   
   
   deletedoctorsForSuperAdmin(id:any){
    return this.delete(superAdminEndPoints.deletedoctor + id)
   }

   adminsById(id:any){
    return this.get(superAdminEndPoints.deletedoctor + id )
   }

   ststusdoctorsForSuperAdmin(id:any, data:any){
    return this.patch(superAdminEndPoints.approveDoctor + id , data)
   }
  //  postDoctors(data:any){
  //   return this.post(superAdminEndPoints.doctorsAdd, data)
  //  }



//    postDoctors(data: any) {
//     const headers = new HttpHeaders({
//         'Content-Type': 'multipart/mixed; boundary=gc0p4Jq0M2Yt08jU534c0p' // Custom boundary
//     });

//     return this.http.post(superAdminEndPoints.doctorsAdd, data, { headers });
// }

postDoctors(data: any) {
  const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data'  // Correct content type for file upload

      // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'

  });

  return this.http.post(superAdminEndPoints.doctorsAdd, data, { headers });
}





   nursesForSuperAdmin(){
    return this.get(superAdminEndPoints.getnurses)
   }

  //  adminId:any;


   nursesForAdmin(){
     const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.getNursesForAdmin + adminId )
   }

   getallalotnursesForAdmin(){
    return this.get(superAdminEndPoints.getallalotssgetNursesForAdmin)
   }

   Getallreports(){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.getallreports + adminId)
   }
   


   adnursesForSuperAdmin(data:any){
    return this.post(superAdminEndPoints.addnurses, data)
   }

   addslote(data:any){
    return this.post(superAdminEndPoints.addslotpost, data)
   }
   patientsForSuperAdmin(){
    return this.get(superAdminEndPoints.getpatients)
   }

   patientsForAdmin(){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.getPatientsForAdmin + adminId )
   }

   patientsForNurse(){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.getPatientsForNurse + adminId )
   }

   
   patientById(id:any){
    return this.get(superAdminEndPoints.patientById + id )
   }

   getPatientDetailsByName(patientId: string): Observable<any> {
    // return this.http.get(`${this.baseUrl}/patientsbyname/${name}`);
    return this.get(superAdminEndPoints.patientForDtl + patientId )
  }

   private patientDetailDataSubject = new BehaviorSubject<any>(null);
   patientDetailData$ = this.patientDetailDataSubject.asObservable();
 
   setPatientDetailData(data: any) {
     this.patientDetailDataSubject.next(data);
   }
 
   getPatientDetailData() {
     return this.patientDetailDataSubject.getValue();
   }

  //  updatePatientById(id: any, updatedData: any) {
  //   return this.http.put(`https://alora-plus.vercel.app/api/v1/patient/${id}`, updatedData);
  // }

   deletepatient(id:any){
    return this.delete(superAdminEndPoints.patientById + id )
   }


   nurseById(id:any){
    return this.get(superAdminEndPoints.nursesById + id )
   }

   allotedById(id:any){
    return this.get(superAdminEndPoints.allotedByIdById + id )
   }
   

  //  updateNurseById(id: any, updatedData: any) {
  //   return this.http.put(`https://alora-plus.vercel.app/api/v1/nurse/${id}`, updatedData);
  // }

  // allotupdate(id: any, updatedData: any) {
  //   return this.http.put(`https://alora-plus.vercel.app/api/v1/allot/${id}`, updatedData);
  // }


  // adminupdate(id: any, updatedData: any) {
  //   return this.http.put(`https://alora-plus.vercel.app/api/v1/doctor/${id}`, updatedData);
  // }



   deleteNurse(id:any){
    return this.delete(superAdminEndPoints.nursesById + id )
   }

  //  addpatientsForSuperAdmin(data :any){
  //   return this.post(superAdminEndPoints.addpatients, data)
  //  }



   addpatientsForSuperAdmin(data: any) {
    const headers = new HttpHeaders({
        // 'Content-Type': 'multipart/form-data'  // Correct content type for file upload
  
        // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
  
    });
  
    return this.http.post(superAdminEndPoints.addpatients, data, { headers });
  }



   deletealot(id:any){
    return this.delete(superAdminEndPoints.allotById + id )
   }

   clockIn(nurseId: number,nurseName: any): Observable<any> {
    return this.post( superAdminEndPoints.clockInNurse , { nurseId, nurseName });
  }

  clockOut(nurseId: number,nurseName: any): Observable<any> {
    return this.post( superAdminEndPoints.clockOutNurse , { nurseId, nurseName });
  }

  clockStatus(){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.clockStatusForAdmin + adminId )
   }
   
   clockStatusPost(payload: any){
    return this.post(superAdminEndPoints.clockStatus,payload)
   }

   additionalServicePost(data: any){
    return this.post(superAdminEndPoints.addtionalservice,data)
   }

   additionalServiceGet(){
    return this.get(superAdminEndPoints.addtionalserviceGet)
   }


  //  showSuccess(p0: string) {
  //   this._tos.success('Hello World!', 'Toastr fun!');
  // }

  //  showSuccess(msg : string, status:string) {
  //   this._tos.success(msg, status,{
  //     positionClass : 'toast-top-center',
  //     progressBar: true,
  //     closeButton: true, // Show close button
  //     newestOnTop: true, 
  //   });
  // }
  // showError(msg: string, status: string) {
  //   this._tos.error(msg, status, {
  //     positionClass: 'toast-top-center',
  //     progressBar: true,
  //     closeButton: true,
  //     newestOnTop: true,
  //   });
  // }


}
