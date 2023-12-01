import { useContext } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { RoleContext } from "../../../contexts/Role/RoleProvider";
import NavEmployee from "../../../components/Header/NavEmployee";
import Heading from "../../../components/Header/Heading";

const EmployeeDashboard = ({ children }) => {
    const { setCurrentRole } = useContext(RoleContext);
    const location = useLocation()
    // Set the current role to 'employee' when the component mounts
    setCurrentRole('employee');

    return (
        <div className="min-h-screen">
            <Heading title={"Employee Dashboard"}></Heading>
            <NavEmployee></NavEmployee>
            {
                location.pathname === '/employee'
                ?
                <figure className="relative w-full">
                    <img src="/employee.jpg" className="rounded-lg shadow-lg w-3/4 mx-auto m-10"></img>
                    {/* <div className="absolute inset-0 w-full bg-black "></div> */}
                </figure>
                :
                ''
            }
            <Outlet></Outlet>
        </div>
    );
};

export default EmployeeDashboard;
