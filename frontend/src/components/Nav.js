import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import { signout, refresh_token, get_course_on_list_api } from '../utils/api';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';


const mainListItems = (
    <React.Fragment>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>
        <Link to="/myallcourses" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Your Courses" />
            </ListItemButton>
        </Link>
        <Link to="/publiccourses" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="All Public Courses" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function Nav() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [title, setTitle] = React.useState("Loading...");
    const [courses, setCourses] = React.useState([]);

    const location = useLocation();

    React.useEffect(() => {
        refresh_token();
        if (localStorage.getItem('access_token') !== null) {
            setAuth(true);
            get_course_on_list_api().then((res) => {
                if (res.status === 200) {
                    setCourses(res.data);
                }
            }
            ).catch((err) => {
                console.log(err);
            });
        }
    }, []);

    React.useEffect(() => {
        switch (location.pathname) {
            case '/':
                document.title = 'Dashboard';
                break;
            case '/publiccourses':
                document.title = 'Public Courses';
                break;
            case '/signin':
                document.title = 'Sign In';
                break;
            case '/signup':
                document.title = 'Sign Up';
                break;
            case '/profile':
                document.title = 'Profile';
                break;
            default:
                document.title = '404 NOT FOUND';
        }
        setTitle(document.title);
    }, [location.pathname]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignout = () => {
        signout();
        setAnchorEl(null);
        setAuth(false);
    };

    return (
        <>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    {/* TODO: signin -> notification and signout else signin */}
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {auth ? (
                                <div>
                                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    </Link>
                                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                                    <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem onClick={handleClose}>Sign In</MenuItem>
                                    </Link>
                                    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                    {!auth ? null : (
                        <>
                            <ListSubheader component="div" inset>
                                Listed Courses
                            </ListSubheader>
                            {courses.map((course) => (
                                <Link to={"/course/" + course.id} style={{ textDecoration: 'none', color: 'inherit' }} key={"course" + course.id}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={course.year + " " + course.semester[0] + " " + course.name} />
                                </ListItemButton>
                                </Link>
                            ))}
                        </>)
                    }
                </List>
            </Drawer>
        </>
    );
}

export default Nav;
