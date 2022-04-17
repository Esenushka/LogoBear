import axios from "axios";

const Api = axios.create({
    baseURL: "https://jogtracker.herokuapp.com/api/v1/"
})

export default Api