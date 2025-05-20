import axios from "axios"
const api = axios.create({
    baseURL : "https://68273edc6b7628c5290f9f00.mockapi.io"
})

//get request
export const getUserApi = ()=>{
    return api.get('/CRUD');
}