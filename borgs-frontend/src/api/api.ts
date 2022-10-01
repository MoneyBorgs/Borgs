import axios from "axios";
export const axiosRequest = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/"
});