import axios from 'axios';
import {apiURL} from "./constants";

const instance = axios.create({
  baseURL: apiURL
});

export default instance;
