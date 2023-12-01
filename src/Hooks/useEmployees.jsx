// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useEmployees = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: employees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/get-all-employees`);
            console.log(res.data);
            return res.data;
        }
    })

    return [employees, refetch]
};

export default useEmployees;