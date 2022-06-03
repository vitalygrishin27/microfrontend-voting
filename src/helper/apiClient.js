import axios from "axios";

const apiClient = () => {
    const MAIN_ENDPOINT = "https://microservice-voting.herokuapp.com/";
   // const MAIN_ENDPOINT = "http://localhost:8080/";

    return axios.create({
        baseURL: MAIN_ENDPOINT
    });
};
export default apiClient;