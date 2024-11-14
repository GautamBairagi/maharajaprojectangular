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
    getsidebar: `${baseUrl}sidebars`,
    updateSidebar: `${baseUrl}sidebar`,
}
