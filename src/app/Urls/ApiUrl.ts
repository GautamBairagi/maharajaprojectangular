// const baseUrl = 'https://alora-yst7j.ondigitalocean.app/api/v1/';
// const baseUrl = 'https://alora-plus.vercel.app/api/v1/';
const baseUrl = 'http://192.168.1.231:5000/';

// const adminId = localStorage.getItem('userId')
// console.log('url id for all',adminId)

const userId = sessionStorage.getItem('userId');

const group_id = sessionStorage.getItem('group_id');
const token = sessionStorage.getItem('token');



export const superAdminEndPoints = {
    superAdminLogin: `${baseUrl}login`,
    createusers: `${baseUrl}createuser`,
    

    getdoctors: `${baseUrl}doctors`,
    deletedoctor: `${baseUrl}doctor/`,
    doctorsAdd: `${baseUrl}doctor`,
    getnurses: `${baseUrl}nurses`,
    addnurses: `${baseUrl}nurse`,
    addslotpost: `${baseUrl}allot`,
    nursesById: `${baseUrl}nurse/`,
    allotedByIdById:`${baseUrl}allot/`,
    addemail :`${baseUrl}alora`,
    getEmail :`${baseUrl}aloras`,
    allotById: `${baseUrl}allot/`,
    getNursesForAdmin: `${baseUrl}nurse/doctorid/`,
    getallalotssgetNursesForAdmin: `${baseUrl}allots`,
    getallreports: `${baseUrl}report/nurseid/`,
    getpatients: `${baseUrl}patients`,
    getPatientsForAdmin: `${baseUrl}patient/doctorid/`,
    getPatientsForNurse: `${baseUrl}patient/nurseId/`,
    clockInNurse: `${baseUrl}clockin`,
    clockOutNurse: `${baseUrl}clockout`,
    clockStatus: `${baseUrl}clockinout`,
    clockStatusForAdmin: `${baseUrl}clockinout/doctor/`,
    addpatients: `${baseUrl}patient`,
    patientById: `${baseUrl}patient/`,
    patientForDtl: `${baseUrl}patient/`,
    addtionalservice: `${baseUrl}servicetitle`,
    addtionalserviceGet: `${baseUrl}servicetitles`,
    approveDoctor: `${baseUrl}doctor/accountStatusUpdate/`,
    getCovidcSreening: `${baseUrl}doctor/accountStatusUpdate`,
}
