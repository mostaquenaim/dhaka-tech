import { useContext } from "react";
import { RoleContext } from "../../../contexts/Role/RoleProvider";
import NavHR from "./NavHR";
import { Outlet, useLocation } from "react-router-dom";
import Heading from "../../../components/Header/Heading";

const HRDashboard = () => {
    const { setCurrentRole } = useContext(RoleContext)
    const location = useLocation()
    console.log(location);
    setCurrentRole('hr')
    return (
        <div className="mt-4 min-h-screen lg:mx-10">
            <Heading title={`HR Dashboard`}></Heading>
            <NavHR></NavHR>
            {
                location.pathname === '/dashboard' &&
                <figure className="m-10">
                    <img src="/human-resources.jpg" className="rounded-lg shadow-lg"></img>
                </figure>
            }
            <Outlet></Outlet>
        </div>
    );
};

export default HRDashboard;