import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // baseURL: "http://localhost:8080/api/v1", // Replace with your actual API base URL
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    timeout: 10000 // 10 seconds timeout
});

export default apiClient;