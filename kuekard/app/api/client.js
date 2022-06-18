import { create } from "apisauce";
import cache from "../utility/cache";

// const myIP = 'http://192.168.1.167';
// const port = '3001';
const serverAddress = 'https://vamplitude-master-server.herokuapp.com/';
const apiClient = create({
    baseURL: serverAddress
    // baseURL: myIP+':'+port
})

export default apiClient;
