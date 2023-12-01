import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { RoleContext } from "../contexts/Role/RoleProvider";

const PrivateEmployeeRoute = ({ children }) => {
    const { currentRole } = useContext(RoleContext)

    if (currentRole === 'employee') {
        return children;
    }

    return <Navigate to="/dashboard" />;
};

// Define PropTypes for the children prop
PrivateEmployeeRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateEmployeeRoute;
