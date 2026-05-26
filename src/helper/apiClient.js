import axios from "axios";

const apiClient = () => {
   // const MAIN_ENDPOINT = "http://173.242.57.145:8888/";
   const MAIN_ENDPOINT = "/api";
   //const MAIN_ENDPOINT = "http://localhost:8888/";
   //const MAIN_ENDPOINT = "http://192.168.0.213:8080/";

    return axios.create({
        baseURL: MAIN_ENDPOINT
    });
};
export default apiClient;