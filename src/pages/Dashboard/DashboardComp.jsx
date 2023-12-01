import { Navigate, useLoaderData } from "react-router-dom";
import useGetUser from "../../Hooks/useGetUser";
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import HRDashboard from "./HR/HRDashboard";
import AdminDashboard from "./Admin/AdminDashboard";

const DashboardComp = () => {
    const { user, loading } = useGetUser()
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        axios.get(`https://dhaka-tech-backend.vercel.app/get-user/${user.email}`)
            .then(res => {
                console.log(res.data);
                setUserInfo(res.data)
            })
    }, [user.email])


    return (
        <div>
            {loading ?
                <span className="loading loading-spinner loading-lg"></span>
                :
                userInfo?.role === 'admin' ?
                    <AdminDashboard></AdminDashboard>
                    :
                    userInfo?.role === 'employee' ?
                        <Navigate to='/employee'></Navigate>
                        :
                        userInfo?.role === 'hr' ?
                        <HRDashboard></HRDashboard>
                        :
                        <span className="loading loading-spinner loading-lg"></span>
            }
        </div>
    );
};

export default DashboardComp;