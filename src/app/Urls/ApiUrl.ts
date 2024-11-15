// const baseUrl = 'https://alora-yst7j.ondigitalocean.app/api/v1/';
// const baseUrl = 'https://alora-plus.vercel.app/api/v1/';
const baseUrl = 'http://192.168.1.231:5000/';

// const userId = localStorage.getItem('userId');
// const group_id = localStorage.getItem('group_id');
// const token = localStorage.getItem('token');
// console.log("apiurls token get", token)

// Usersupdate: `${baseUrl}editUser/`,




export const superAdminEndPoints = {
    superAdminLogin: `${baseUrl}login`,
    createusers: `${baseUrl}createuser`,
    getsidebar: `${baseUrl}sidebars`,
    SidebarByID: `${baseUrl}sidebar_details/`,
    updateSidebar: `${baseUrl}sidebar`,
    getSubMenu: `${baseUrl}subsidebars`,
    getUsers: `${baseUrl}users`,
    getUsersByid: `${baseUrl}users_details/`, // uiser get by id
    Usersupdate: `${baseUrl}editUser/`,
   
}
