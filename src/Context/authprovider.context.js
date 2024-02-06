import { createContext, useContext, useState } from "react";

const MyContext = createContext({});

const ContextProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [language, setLanguage] = useState(false);

    console.log(auth);

    const contextValue = {
        auth,
        language,
        setAuth,
        setLanguage
    }

    return(
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    )
}


export {ContextProvider, MyContext};