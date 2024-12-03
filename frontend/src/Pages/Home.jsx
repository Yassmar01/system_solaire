import { AppBar, Avatar, Box, Button, CardMedia, Chip, CircularProgress, Icon, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Typography, colors } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useState } from 'react'

import UserApi from '../../services/api/UserApi';
import { useUserContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { setUser, authenticated, setAuthenticated, logout, user } = useUserContext();

    const [isloading, setIsloading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuClose = () => setAnchorEl(null);
    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const navigate = useNavigate()
    useEffect(() => {
        if (authenticated) {
            setIsloading(true);
            UserApi.getuser()
                .then(({ data }) => {


                    setUser(data);
                    console.log('data', data)

                })
                .catch(() => {
                    logout();
                    navigate('/login');
                })
                .finally(() => {
                    setIsloading(false);
                });
        } else {
            navigate('/login');
        }
    }, [authenticated]);

    const handleLogout = async () => {
        await UserApi.logout();
        logout();
        navigate('/login');
    };

    if (isloading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress color="info" />
            </Box>
        );
    }

    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >

                        </IconButton>
                        <CardMedia
                            component="img"

                            sx={{ width: '80px', height: '66px' }}
                            image="/src/assets/panneaux-solaires.png"
                            alt="404 Image"

                        />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: '30px' }}>
                            Solar System
                        </Typography>

                        <Stack direction="row" spacing={1} >
                            <Chip
                                avatar={<Avatar sx={{ backgroundColor: 'white' }} />}
                                label={user.fullname}
                                sx={{ color: 'white' }}
                                onClick={handleMenuClick}

                            />
                        </Stack>

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >


                            <MenuItem onClick={handleLogout} >
                                <ListItemIcon>
                                    <LogoutIcon color='error' />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>


            <div>Welcome Home</div>


        </>
    )
}

export default Home
