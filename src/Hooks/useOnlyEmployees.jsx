// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useOnlyEmployees = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: onlyEmployees = [] } = useQuery({
        queryKey: ['onlyEmployees'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/get-all-employees`)
            const noHr = res.data.filter(item=>item.role !== 'hr')
            return noHr;
        }
    })

    return [onlyEmployees, refetch]
};

export default useOnlyEmployees;