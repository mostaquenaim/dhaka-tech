import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://dhaka-tech-backend.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;