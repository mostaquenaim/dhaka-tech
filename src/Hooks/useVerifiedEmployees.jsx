// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useVerifiedEmployees = () => {
    const axiosPublic = useAxiosPublic();

    const { isPending, refetch, data: verifiedEmployees = [] } = useQuery({
        queryKey: ['verifiedEmployees'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/get-all-employees`)
            const verified = res.data.filter(item=>item.role === 'hr' || (item.role === 'employee' && item.isVerified===true))
            return verified;
        }
    })

    return [verifiedEmployees, refetch, isPending]
};

export default useVerifiedEmployees;