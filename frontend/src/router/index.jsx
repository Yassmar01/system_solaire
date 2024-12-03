import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import { useUserContext } from "../context/Context";
import { Box, CardMedia } from "@mui/material";

// A wrapper component to handle redirection if authenticated
const AuthRedirect = ({ children }) => {
    const { authenticated } = useUserContext();  // Now inside the component
    return authenticated ? <Navigate to="/home" /> : children;
};
export const router = createBrowserRouter(
    [

        {
            path: '/home',
            element: <Home />,
        },
        {
            path: '*',
            element: <>

                <Box>
                    <CardMedia
                        component="img"

                        sx={{ width: '50%', height: 'auto', position: 'absolute', left: '25%', top: '25%' }}
                        image="/src/assets/page404.png"
                        alt="404 Image"

                    />
                </Box>
            </>,

        },

        {
            path: '/login',
            element: (
                <AuthRedirect>
                    <Login />
                </AuthRedirect>
            )
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/',
            element: <Login />

        },


    ]
)
