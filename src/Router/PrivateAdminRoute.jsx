import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { RoleContext } from "../contexts/Role/RoleProvider";

const PrivateAdminRoute = ({ children }) => {
    const { currentRole } = useContext(RoleContext)

    if (currentRole === 'admin') {
        return children;
    }

    return <Navigate to="/dashboard" />;
};

// Define PropTypes for the children prop
PrivateAdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateAdminRoute;
