import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { AuthContext } from "../contexts/Auth/AuthProvider";

const PrivateRouteComp = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login" />;
};

// Define PropTypes for the children prop
PrivateRouteComp.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRouteComp;
