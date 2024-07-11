import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/AdminContext";
import AdminApi from "@/services/api/AdminApi";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Avatar, Box, Chip, CircularProgress, CssBaseline, Divider, Drawer, IconButton,
    List, ListItemIcon, Menu, MenuItem, Rating, Stack, Tab, Tabs, Toolbar,
    Typography, styled, useTheme
} from '@mui/material';
import { green } from '@mui/material/colors';
import {
    AddIcCall,
    Dashboard, DashboardRounded, Edit, Engineering, Facebook, Logout,
    PersonAdd, PhoneForwarded, PhoneMissed, SupportAgent
} from '@mui/icons-material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Myfooter from "@/components/ui/Myfooter";
import { redirecttodashboard } from "../../router/index.jsx";
import StarIcon from '@mui/icons-material/Star';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
const drawerWidth = 200;
const labels = {
    1: 'Useless what happened',
    1.5: 'Poor job',
    3: 'Ok you can do more ',
    3.5: 'Good ! ',
    4: 'Good you achieved the target !',
    4.5: 'Excellent !',
    5: 'Excellent job !',
};
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function Layoutcallcenter() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const { setUser, authenticated, setAuthenticated, logout, user } = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [isloading, setIsloading] = useState(true);

    const value = 4;

    useEffect(() => {
        if (authenticated) {
            setIsloading(true);
            AdminApi.getuser()
                .then(({ data }) => {
                    const { role } = data;

                    if (role !== 'callcenter') {
                        navigate(redirecttodashboard(role));
                    } else {
                        setUser(data);
                    }
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


    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogout = async () => {
        await AdminApi.logout();
        logout();
        navigate('/login');
    };

    const menuItems = [

        { label: "My calls", icon: <PhoneMissed />, path: "/callcenter/calls" },
        { label: "Add Calls", icon: <AddIcCall />, path: "/callcenter/add" },
        { label: "Edit calls", icon: <Edit />, path: "/callcenter/edit" },

    ];

    const currentTabIndex = menuItems.findIndex(item => location.pathname.startsWith(item.path));
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
                <CircularProgress color="success" />
            </Box>
        );
    }
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} color="success">
                    <Toolbar>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Call center
                        </Typography>

                        <Box
                            sx={{
                                width: "65%",
                                display: 'flex',
                                alignItems: 'center',
                                // mr:100
                            }}
                        >
                            <Rating
                                name="text-feedback"
                                value={value}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                        </Box>
                        {/* <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            sx={{ mr:3 }}
                        >
                            <Badge badgeContent={5} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
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

                            <MenuItem onClick={handleMenuClose} component={Link} to="/callcenter/calls">
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" color="error" />
                                </ListItemIcon>
                                My calls
                            </MenuItem>

                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" color='error' />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <Tabs
                            value={currentTabIndex}
                            onChange={(event, newValue) => navigate(menuItems[newValue].path)}
                            orientation="vertical"
                            textColor={green[900]}
                            sx={{
                                '& .MuiTabs-indicator': { backgroundColor: green[900] },
                                '& .MuiTab-root': { color: green[900] },
                                '& .Mui-selected': { color: green[900], bgcolor: green[50] },
                            }}
                        >
                            {menuItems.map((item) => (
                                <Tab
                                    key={item.label}
                                    icon={item.icon}
                                    label={item.label}
                                    component={Link}
                                    to={item.path}
                                    iconPosition="start"
                                />
                            ))}
                        </Tabs>
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <Outlet />
                    </Box>
                </Main>
            </Box>
            <footer>
                <Myfooter />
            </footer>
        </>
    );
}

export default Layoutcallcenter;
