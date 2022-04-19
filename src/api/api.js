import axios from "axios";

const Api = axios.create({
    baseURL: "https://jogtracker.herokuapp.com/api/v1/",

})

const data = JSON.parse(localStorage.getItem("data"))


Api.interceptors.request.use(function (config) {
    config.headers.Authorization = "Bearer " + data.access_token
    return config;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

export default {
    postToken: (postToken) => Api.post("auth/uuidLogin",postToken),
    getAllUser: () => Api.get("auth/user"),
    getAllSync: () => Api.get("data/sync"),
    putJog: (putJog) => Api.put("data/jog", putJog),
    postJog: (postJog) => Api.post("data/jog", postJog)
}
