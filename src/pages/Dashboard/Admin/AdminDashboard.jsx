import { Navigate } from "react-router-dom";
import Heading from "../../../components/Header/Heading";
import AllEmployeeList from "./AllEmployeeList";
import { useContext } from "react";
import { RoleContext } from "../../../contexts/Role/RoleProvider";

const AdminDashboard = () => {
    const { setCurrentRole } = useContext(RoleContext)
    setCurrentRole('admin')
    return <Navigate to="/all-employee-list" />
};

export default AdminDashboard;