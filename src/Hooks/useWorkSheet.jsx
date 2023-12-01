// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useGetUser from "./useGetUser";
import { useContext } from "react";
import { RoleContext } from "../contexts/Role/RoleProvider";

const useWorkSheet = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useGetUser()

    const { currentRole } = useContext(RoleContext)

    const { isPending ,refetch, data: works = [] } = useQuery({
        queryKey: ['works'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/get-all-works?email=${currentRole === 'employee' && user.email}`);
            console.log(res.data);
            return res.data;
        }
    })

    return [works, refetch, isPending]
};

export default useWorkSheet;