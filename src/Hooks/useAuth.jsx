import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";


const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;