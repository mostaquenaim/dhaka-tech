import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";

const useGetUser = () => {
    const {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        handleGoogleSignIn
    } = useContext(AuthContext)

    return {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        handleGoogleSignIn
    }
};

export default useGetUser;