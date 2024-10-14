import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

//Interceptor to handle 401 Unauthorized errors
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
        
      } else if (error.response && error.response.status === 403) {
        console.error("Access forbidden. You do not have permission.");
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;