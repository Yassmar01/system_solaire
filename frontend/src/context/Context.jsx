
import { createContext, useContext, useState } from "react";
import UserApi from "../../services/api/UserApi";


export const AdminStateContext = createContext({
    user: {},
    setUser: () => { },
    login: (email, password) => { },
    register: (email, password, fullname) => { },
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
        return UserApi.login(email, password)
    }

    const register = async (email, password, fullname) => {
        return UserApi.register(email, password, fullname)
    }
    const logout = () => {
        setUser({})
        _setAuthenticated(false)


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
                    register,
                    logout,
                }
            }>
                {children}
            </AdminStateContext.Provider>

        </>
    );
}
export const useUserContext = () => useContext(AdminStateContext)
