import { createContext, useState } from "react";

export const AuthContext = createContext(null) //global værdi

export const AuthProvider = ({children}) => { 

    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
} //component som har state, som gør at vi kan få fat i en user aka Preben eller ikke Preben (null). 

//Hard reload = mister state
//Lav evt load fra local storage
//children = den ting du putter imellem tags