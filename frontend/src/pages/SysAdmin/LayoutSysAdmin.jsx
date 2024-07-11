import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/AdminContext";
import AdminApi from "@/services/api/AdminApi";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Avatar, Box, Chip, CircularProgress, CssBaseline, Divider, Drawer, IconButton,
    List, ListItemIcon, Menu, MenuItem, Stack, Tab, Tabs, Toolbar,
    Typography, styled, useTheme
} from '@mui/material';
import { green } from '@mui/material/colors';
import {
    Dashboard, DashboardRounded, Engineering, Facebook, Logout,
    PersonAdd, PhoneForwarded, SupportAgent
} from '@mui/icons-material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Myfooter from "@/components/ui/Myfooter";
import { redirecttodashboard } from "../../router/index.jsx";
const drawerWidth = 200;

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

function LayoutSysAdmin() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const { setUser, authenticated, setAuthenticated, logout, user } = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [isloading, setIsloading] = useState(true);



    useEffect(() => {
        if (authenticated) {
            setIsloading(true);
            AdminApi.getuser()
                .then(({ data }) => {
                    const { role } = data;

                    if (role !== 'sysadmin') {
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

        { label: "Call Center", icon: <SupportAgent />, path: "/sysadmin/callcenter" },
        { label: "Facebook Leads", icon: <Facebook />, path: "/sysadmin/Facebookleads" },
        { label: "Clients & Calls", icon: <PhoneForwarded />, path: "/sysadmin/Clients_calls" },
        { label: "Technicians", icon: <Engineering />, path: "/sysadmin/Techniciens" },
        { label: "Accounts", icon: <PersonAdd />, path: "/sysadmin/AddAcounts" },
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
                <CircularProgress color="success"/>
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
                            Sysadmin
                        </Typography>
                        <Stack direction="row" spacing={1} >
                            <Chip
                                avatar={<Avatar sx={{ backgroundColor: 'white' }} />}
                                label={user.name}
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
                            <MenuItem onClick={handleMenuClose} component={Link} to="/sysadmin/AddAcounts">
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" color="error" />
                                </ListItemIcon>
                                Add another account
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

export default LayoutSysAdmin;
