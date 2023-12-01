import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('corporate');

    const info ={
        theme,
        setTheme
    }

    return (
        <ThemeContext.Provider value={info}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;