//import AppBar from "@/components/MyAppbar";
import Myfooter from "@/components/ui/Myfooter";
import { Login } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useUserContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
export default function Geustlayout() {
    const navigate = useNavigate();
    const context = useUserContext()
    useEffect(
        () => {
            if (context.authenticated) {
                navigate('/dashboard')
            }

        }, []);
    return (
        <>
            <header>

                <AppBar color="success">
                    <Toolbar>

                        <Typography variant="h6" noWrap component="div">
                            Welcome in RDI crm management
                        </Typography>
                        <Link to={'/login'}>
                            <IconButton sx={{ position: 'absolute', top: 2, right: 50 }}
                                size="small"
                                edge="end"
                                color="inherit"> Login
                                <Login sx={{ ml: '4px' }} />
                            </IconButton>
                        </Link>


                    </Toolbar>

                </AppBar>

            </header>

            <main className={'container'}>
                <Box
                    component="main"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pt: 20,
                        flexGrow: 1,

                    }}

                >

                    <Outlet />
                </Box>
            </main>



            <footer>
                <Myfooter />
            </footer>
        </>
    );
}
