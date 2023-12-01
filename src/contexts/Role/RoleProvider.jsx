import { createContext, useState } from "react";

export const RoleContext = createContext(null);

const RoleProvider = ({ children }) => {
    const [currentRole, setCurrentRole] = useState('');

    const info ={
        currentRole,
        setCurrentRole
    }

    return (
        <RoleContext.Provider value={info}>
            {children}
        </RoleContext.Provider>
    );
};

export default RoleProvider;