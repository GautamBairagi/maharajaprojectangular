import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/httpServices';
import { superAdminEndPoints } from '../Urls/ApiUrl';
import { Observable, BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface ThemeSettings {
  header_font: string;
  sidebar_color: string;
  header_color: string;
  sidebar_font: string;
}

@Injectable({
  providedIn: 'root'
})
export class AllService extends HttpService {
  private apiUrl = 'http://192.168.1.231:5000/theme';
  private apiUrlNoty = 'http://192.168.1.231:5000';

  // Fetch theme settings from API
  fetchThemeSettings(): Observable<ThemeSettings> {
    return this.http.get<ThemeSettings>(this.apiUrl);
  }

  // Update theme settings through the API
  updateThemeSettings(themeSettings: ThemeSettings): Observable<any> {
    return this.http.put(this.apiUrl, themeSettings);
  }

  getNotification(params: any): Observable<any[]> {
    const userId = localStorage.getItem('userId')

    return this.http.get<any[]>(`${this.apiUrlNoty}/notification_details/` + userId , { params });
  }

  markAllAsRead(notifications: any[]): Observable<void> {
    const userId = localStorage.getItem('userId')

    const payload = notifications.map((notify) => ({
      id: notify.id,
      user_id: userId,
      // read: true,
    }));
    return this.http.post<void>(`${this.apiUrlNoty}/readnotification`, payload);
  }

  // getNotification(id: any) {
  //   const userId = localStorage.getItem('userId')
  //   return this.get(superAdminEndPoints.getNotification + userId)
  // }

  // private socket: Socket;



  // setHeaderColor(color: string) {
  //   this.headerColor = color;
  //   document.documentElement.style.setProperty('--header-color', color);
  // }

  // setSidebarColor(color: string) {
  //   this.sidebarColor = color;
  //   document.documentElement.style.setProperty('--sidebar-color', color);
  // }

  // setHeaderFontColor(color: string) {
  //   this.headerFontColor = color;
  //   document.documentElement.style.setProperty('--header-font-color', color);
  // }

  // setSidebarFontColor(color: string) {
  //   this.sidebarFontColor = color;
  //   document.documentElement.style.setProperty('--sidebar-font-color', color);
  // }



  // getHeaderColor() {
  //   return this.headerColor;
  // }
  // getHeaderFontColor() {
  //   return this.headerFontColor;
  // }

  // getSidebarFontColor() {
  //   return this.sidebarFontColor;
  // }

  // getSidebarColor() {
  //   return this.sidebarColor;
  // }



  constructor(public override http: HttpClient,
  ) {
    super(http)
    // this.socket = io('http://192.168.1.231:5000');
  }

  // sendNotification(message: any) {
  //   this.socket.emit('send-notification', message);
  // }

  // getNotify(){
  //   return this.get(superAdminEndPoints.getNotification)
  // }

  // onNotificationReceived(callback: (data: any) => void) {
  //   this.socket.on('receive-notification', callback);
  // }

  superAdminLogin(data: any) {
    return this.post(superAdminEndPoints.superAdminLogin, data)
  }
  createusersadmin(data: any) {
    return this.post(superAdminEndPoints.createusers, data)
  }

  createclients(data: any) {
    return this.post(superAdminEndPoints.createclient, data)
  }

  getsidebarmenu() {
    return this.get(superAdminEndPoints.getsidebar)
  }

  sibeMenuById(id: any) {
    return this.get(superAdminEndPoints.SidebarByID + id)
  }

  subSideMenuById(id: any) {
    return this.get(superAdminEndPoints.SubSidebarByID + id)
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

  getsubmenu() {
    return this.get(superAdminEndPoints.getSubMenu)
  }

  getUsersdata() {
    return this.get(superAdminEndPoints.getUsers)
  }

  //  getRoomUsersdata(id:any){
  //   const roomNo = localStorage.getgetTasksOFRoomItem('roomNumber')
  //   return this.get(superAdminEndPoints.getRoomUsers + roomNo )
  //  }

  getRoomClientsdata(id: any): Observable<any> {
    const roomNo = localStorage.getItem('roomNumber');
    return this.get(superAdminEndPoints.getRoomClients + roomNo);
  }

  getRoomUsersdata(id: any): Observable<any> {
    const roomNo = localStorage.getItem('roomNumber');
    return this.get(superAdminEndPoints.getRoomUsers + roomNo);
  }

  getTasksOFRoom() {
    return this.get(superAdminEndPoints.addTask)
  }

  getmedicines() {
    return this.get(superAdminEndPoints.getmedicine)
  }


  addmedinice(data: any) {
    return this.post(superAdminEndPoints.getmedicine, data)
  }



  getroutines() {
    return this.get(superAdminEndPoints.routines)
  }

  Usersdatasfilter(order: string = 'first_name', sort: string = 'DESC', limit: number = 10, offset: number = 0, search: string = '') {
    const url = `${superAdminEndPoints.getUsers}?order=${order}&sort=${sort}&limit=${limit}&offset=${offset}&search=${search}`;
    return this.get(url); // Assuming you have a 'get' method to make the API call
  }

  getclientsdata() {
    return this.get(superAdminEndPoints.getclients)
  }


  gertmilestoness() {
    return this.get(superAdminEndPoints.gertmilestones)
  }

  getmildstonebyclientID(id: any) {
    return this.get(superAdminEndPoints.gertmilestonesBYClientId + id)
  }




  createmilestones(data: any) {
    return this.post(superAdminEndPoints.createmilestoness, data)
  }





  getClients() {
    return this.get(superAdminEndPoints.getClientss)
  }

  postRoomData(data: any) {
    return this.post(superAdminEndPoints.createRooms, data)
  }

  getRooms() {
    return this.get(superAdminEndPoints.rooms)
  }

  getRoomDtls(id: any) {
    return this.get(superAdminEndPoints.roomDetails + id)
  }

  getUserDtlsRooms(id: any) {
    return this.get(superAdminEndPoints.userDetailsForRoom + id)
  }

  getRoomsDtlsRooms(id: any) {
    return this.get(superAdminEndPoints.userDetailsForRoom + id)
  }

  private roomData: any;

  setRoomData(data: any) {
    this.roomData = data;
  }

  getRoomData() {
    return this.roomData;
  }



  private userData: any;

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }



  private clientData: any;

  setclientData(data: any) {
    this.clientData = data;
  }

  getclientData() {
    return this.clientData;
  }

  //  roomsgetbyuseridss(id:any){
  //   return this.get(superAdminEndPoints.roomsgetbyuserid + id )
  //  }

  updateMenu(url: string, payload: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.put(url, payload, options);
  }

  getToken() {
    const tokkn = localStorage.getItem("user_token");
    const wspace = localStorage.getItem("workspace_id");
    return { tokkn, wspace }
  }

  updateSubMenu(url: string, payload: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.put(url, payload, options);
  }


  getuserById(id: any) {
    return this.get(superAdminEndPoints.getUsersByid + id)
  }


  userupdatedss(id: any, data: any) {
    return this.put(superAdminEndPoints.Usersupdate + id, data)
  }


  Userstatusupdatess(id: any, data: any) {
    return this.patch(superAdminEndPoints.Userstatusupdate + id, data)
  }

  InstatusStatusupdatess(id: any, data: any) {
    return this.patch(superAdminEndPoints.InstatusStatusupdate + id, data)
  }


  userpatchmethod(id: any, data: any) {
    return this.patch(superAdminEndPoints.statusUpdtedput + id, data)
  }





  getStatusById(id: any) {
    return this.get(superAdminEndPoints.statusUpdtedGetById + id)
  }

  allactiveststuss() {
    return this.get(superAdminEndPoints.allactiveststus)
  }



  frequencyss() {
    return this.get(superAdminEndPoints.frequencys)
  }


  uinitsdata() {
    return this.get(superAdminEndPoints.uinitsdatas)
  }

  //  times(){
  //   return this.get(superAdminEndPoints.timesdata )
  //  }




  clientstatusupdates(id: any, data: any) {
    return this.patch(superAdminEndPoints.clientstatusupdatess + id, data)
  }






  changeLanguage(language: string): Observable<any> {
    return this.http.get(`${superAdminEndPoints.changeLanguage}${language}`);
  }

  postTaskFromRoom(data: any) {
    return this.post(superAdminEndPoints.addTask, data)
  }

  postComments(data: any) {
    return this.post(superAdminEndPoints.comment, data)
  }
  postaddstatus(data: any) {
    return this.post(superAdminEndPoints.addstatus, data)
  }



  getstatus() {
    return this.get(superAdminEndPoints.addstatus)
  }








  getComments() {
    return this.get(superAdminEndPoints.comment)
  }

  getCommentsByTaskId(task_id: string) {
    const url = `${superAdminEndPoints.comment}?task_id=${task_id}`;
    return this.get(url);
  }

  postLogo(data: any) {
    return this.put(superAdminEndPoints.logo + 4, data)
  }

  getLogo() {
    return this.get(superAdminEndPoints.logo)
  }

  getroomactivity() {
    return this.get(superAdminEndPoints.roomactivity)
  }
  getcommentactivity() {
    return this.get(superAdminEndPoints.commentactivity)
  }
  getmedicineactivity() {
    return this.get(superAdminEndPoints.medicineactivity)
  }

  getmilestoneactivity() {
    return this.get(superAdminEndPoints.milestoneactivity)
  }

  gettaskactivity() {
    return this.get(superAdminEndPoints.taskactivity)
  }

  getstatusactivity() {
    return this.get(superAdminEndPoints.statusactivity)
  }
  getSettingactivity() {
    return this.get(superAdminEndPoints.settingactivity)
  }
  getunitactivity() {
    return this.get(superAdminEndPoints.unitactivity)
  }
  getfrequencyactivity() {
    return this.get(superAdminEndPoints.frequencyactivity)
  }


  // Categories functions

  currentProviderGet() {
    return this.get(superAdminEndPoints.currentProviderGet)
  }

  currentProvider(data: any) {
    return this.post(superAdminEndPoints.currentProviderAdd, data)
  }

  currentMedicationGet() {
    return this.get(superAdminEndPoints.currentMedicationGet)
  }

  currentMedication(data: any) {
    return this.post(superAdminEndPoints.currentMedication, data)
  }

  dentalGet() {
    return this.get(superAdminEndPoints.dentalGet)
  }

  dental(data: any) {
    return this.post(superAdminEndPoints.dental, data)
  }

  epsdtrsGet() {
    return this.get(superAdminEndPoints.epsdtrsGet)
  }

  epsdtrs(data: any) {
    return this.post(superAdminEndPoints.epsdtr, data)
  }

  healthMedicalGet() {
    return this.get(superAdminEndPoints.healthmedicalGet)
  }

  healthMedical(data: any) {
    return this.post(superAdminEndPoints.healthmedical, data)
  }

  safetyGet() {
    return this.get(superAdminEndPoints.safteysGet)
  }

  safety(data: any) {
    return this.post(superAdminEndPoints.saftey, data)
  }

  personalGrowthGet() {
    return this.get(superAdminEndPoints.personalGrowthGet)
  }

  personalGrowth(data: any) {
    return this.post(superAdminEndPoints.personalGrowth, data)
  }


  getTranportation() {
    return this.get(superAdminEndPoints.tranportationGet)
  }

  addTranportation(data: any) {
    return this.post(superAdminEndPoints.tranportation, data)
  }

  getWorkAndCareer() {
    return this.get(superAdminEndPoints.workAndCarrierGet)
  }

  addWorkAndCareer(data: any) {
    return this.post(superAdminEndPoints.workAndCarrier, data)
  }

  getCommunicationAndSocial() {
    return this.get(superAdminEndPoints.communicationAndsocialGet)
  }

  addCommunicationAndSocial(data: any) {
    return this.post(superAdminEndPoints.addCommunicationAndsocial, data)
  }

  getCommunication() {
    return this.get(superAdminEndPoints.communicationGet)
  }

  addCommunication(data: any) {
    return this.post(superAdminEndPoints.addCommunication, data)
  }

  getSelfHomeCare() {
    return this.get(superAdminEndPoints.selfHomeCareGet)
  }

  addSelfHomeCare(data: any) {
    return this.post(superAdminEndPoints.addSelfHomeCare, data)
  }

  getGraph() {
    return this.get(superAdminEndPoints.graphCount)
  }

  postAppointment(data: any) {
    return this.post(superAdminEndPoints.addAppointment, data)
  }

  getAppointment() {
    return this.get(superAdminEndPoints.getAppointment)
  }

  postResidentNote(data: any) {
    return this.post(superAdminEndPoints.residentNote, data)
  }


}