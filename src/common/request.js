import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

const axiousInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000
  });

  const sendRequest = (config) => {
    return axiousInstance.request(config)
  }

  export const getRequest = (path) => {
    return sendRequest({
        method : 'GET' ,
        url : path
    })
  }

  export const postRequest = (path, data) => {
    return sendRequest({
      method : 'POST',
      url : path,
      headers : {
        'Content-Type' : 'application/json'
      },
      data: data
    })
  }