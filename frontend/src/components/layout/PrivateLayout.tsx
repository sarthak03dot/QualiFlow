import React, { useState } from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Button,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme as useMuiTheme,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    BarChart as BarChartIcon,
    LightMode as SunIcon,
    DarkMode as MoonIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { useThemeStatus } from '../../context/ThemeContext';

const drawerWidth = 240;

const PrivateLayout = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const { mode, toggleTheme } = useThemeStatus();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'New Survey', icon: <AddIcon />, path: '/builder/new' },
        { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    const drawer = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRight: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            {/* Logo / Header */}
            <Box>
                <Toolbar>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                        SURVEY FLOW
                    </Typography>
                </Toolbar>
                <Divider sx={{ opacity: 0.1 }} />
            </Box>

            {/* Navigation (middle, scrollable if needed) */}
            <Box sx={{ flexGrow: 1, px: 2, py: 2 }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    if (isMobile) setMobileOpen(false);
                                }}
                                selected={location.pathname === item.path}
                                sx={{
                                    borderRadius: 2,
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(99, 102, 241, 0.1)',
                                        color: 'primary.main',
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Bottom user section */}
            <Box sx={{ px: 2, pb: 2 }}>
                <Divider sx={{ mb: 2, opacity: 0.1 }} />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.02)',
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            width: 36,
                            height: 36,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                        }}
                    >
                        {user?.name?.charAt(0)}
                    </Avatar>

                    <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {user?.name}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {user?.email}
                        </Typography>
                    </Box>
                </Box>

                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{ mt: 2, borderRadius: 2 }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );


    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    bgcolor: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton onClick={toggleTheme} color="inherit">
                            {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </IconButton>
                        <Box sx={{ width: 8 }} />
                        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 500 }}>
                            {user?.name}
                        </Typography>
                        <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                                {user?.name?.charAt(0)}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    mt: 1,
                                    minWidth: 220,
                                    borderRadius: 2,
                                    bgcolor: 'background.paper',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    boxShadow:
                                        '0px 8px 24px rgba(0,0,0,0.15)',
                                    overflow: 'hidden',
                                },
                            }}
                        >
                            {/* User Info */}
                            <Box sx={{ px: 2, py: 1.5 }}>
                                <Typography variant="body2" fontWeight={700}>
                                    {user?.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: 'block',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {user?.email}
                                </Typography>
                            </Box>

                            <Divider sx={{ opacity: 0.1 }} />

                            {/* Settings */}
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    navigate('/settings');
                                }}
                                sx={{
                                    gap: 1.5,
                                    py: 1.2,
                                    fontWeight: 500,
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <SettingsIcon fontSize="small" />
                                </ListItemIcon>
                                Account Settings
                            </MenuItem>

                            <Divider sx={{ opacity: 0.1 }} />

                            {/* Logout */}
                            <MenuItem
                                onClick={handleLogout}
                                sx={{
                                    gap: 1.5,
                                    py: 1.2,
                                    color: 'error.main',
                                    fontWeight: 600,
                                    '&:hover': {
                                        bgcolor: 'rgba(239,68,68,0.08)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 32, color: 'error.main' }}>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>

                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: '64px',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default PrivateLayout;
