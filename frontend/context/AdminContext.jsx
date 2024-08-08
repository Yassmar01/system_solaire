import AdminApi from "@/services/api/AdminApi";
import { createContext, useContext, useState } from "react";


export const AdminStateContext = createContext({
    user: {},
    setUser: () => { },
    login: (email, password) => { },
    logout: () => { },
    authenticated: false,
    setAuthenticated: () => { },
})
// eslint-disable-next-line react/prop-types
export default function UserContext({ children }) {
    const [user, setUser] = useState({})
    const [authenticated, _setAuthenticated] = useState(window.localStorage.getItem("authenticate"))
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem("authenticate", isAuthenticated)
    }
    const login = async (email, password) => {
        return AdminApi.login(email, password)
    }
    const logout = () => {
        setUser({})
        _setAuthenticated(false)
        sessionStorage.removeItem('jsonData');
        sessionStorage.removeItem('headcell');

    }

    return (
        <>
            <AdminStateContext.Provider value={
                {
                    user,
                    setUser,
                    authenticated,
                    setAuthenticated,
                    login,
                    logout,
                }
            }>
                {children}
            </AdminStateContext.Provider>

        </>
    );
}
export const useUserContext = () => useContext(AdminStateContext)
