// NavbarComp.js

import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useGetUser from '../../Hooks/useGetUser';
import toast from 'react-hot-toast';
import { RoleContext } from '../../contexts/Role/RoleProvider';

const NavbarComp = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const { user, loading, logOut } = useGetUser()
    const { setCurrentRole } = useContext(RoleContext)
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogOut = () => {
        // setLoading(true);
        console.log("object");
        logOut()
            .then(toast.success('Logged out'))
            .then(setCurrentRole(''))
    }

    const menuItems = [
        { text: 'Home', link: '/' },
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'Contact Us', link: '/contact' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ padding: "10px", bgcolor: 'white' }}>
                <Toolbar>
                    {/* Drawer Icon for Small and Medium Devices */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { lg: 'none' } }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon color='primary' />
                    </IconButton>

                    {/* Drawer for Small and Medium Devices */}
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer}
                    >
                        <List>
                            {menuItems.map((item) => (
                                <ListItem key={item.text} component={Link} to={item.link} onClick={toggleDrawer}>
                                    {item.text}
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>

                    {/* Logo for Larger Devices */}
                    <NavLink to='/'>
                        <img
                            src="/dhaka-tech.png"
                            className='w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full'
                            alt=""
                            style={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}
                        />
                    </NavLink>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Buttons for Larger Devices */}
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}>
                        {menuItems.map((item) => (
                            <Button sx={{ color: "blue" }} key={item.text} component={Link} to={item.link} color="inherit">
                                {item.text}
                            </Button>
                        ))}

                    </Box>

                    {/* Login Button for Small and Medium Devices */}
                    {
                        loading
                            ?
                            <span className="loading loading-spinner loading-lg"></span>
                            :
                            user ?
                                (
                                    <div className="relative">
                                        <img
                                            src={user.photoURL}
                                            className="w-14 h-14 rounded-full p-1 bg-primary border-base-100 border-2 cursor-pointer"
                                            alt=""
                                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                        />
                                        {profileMenuOpen && (
                                            <div 
                                            className="absolute top-full right-0 bg-primary border-base-100 border-2 text-base-100 p-5 rounded-md shadow-md z-20"
                                            >
                                                <p className="text-base-100">
                                                    Welcome, <span className='font-bold text-lg'>{user.displayName}</span>
                                                </p>
                                                <Button
                                                    onClick={handleLogOut}
                                                    sx={{
                                                        mt: '12px',
                                                        color: '#d8e1e8',
                                                        backgroundColor: '#fc050d',
                                                        border: '2px solid #ffffff', // Add border with style, width, and color
                                                        borderRadius: '8px',
                                                        padding: '10px 20px',
                                                        '&:hover': {
                                                            border:"2px solid #f04349",
                                                            backgroundColor: '#f04349',
                                                        },
                                                    }}
                                                >
                                                    Logout
                                                </Button>


                                            </div>
                                        )}
                                    </div>
                                )
                                :
                                <Button
                                    component={Link}
                                    to="/login"
                                    sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' }, color: 'blue' }}
                                >
                                    Login
                                </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavbarComp;
