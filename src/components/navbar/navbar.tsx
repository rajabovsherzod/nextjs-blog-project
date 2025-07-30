"use client";
import { useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { navItems } from '@/constants/navbar-items';
import { CustomLink } from '@/components';
import Logo from '@/assets/logo.png';

interface Props {
    window?: () => Window;
}

const Navbar = ({ window }: Props) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState);
    };

    // Mobil qurilmalar uchun ochiladigan menyu (Drawer)
    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#141414', color: 'white' }}>
            <Box
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px 20px' 
                }}
            >
                <CustomLink href='/' onClick={handleDrawerToggle}>
                    <Image src={Logo} alt='ShareMe logo' width={140} height={35} priority />
                </CustomLink>
                <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            <List sx={{ flexGrow: 1, padding: '20px' }}>
                {navItems.map(item => (
                    <ListItem key={item.route} disablePadding>
                        <ListItemButton
                            component={CustomLink}
                            href={item.route}
                            onClick={handleDrawerToggle}
                            sx={{ textAlign: 'center', padding: '15px 0', borderRadius: '8px' }}
                        >
                            <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 500 }}>
                                {item.label}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <AppBar
                component='nav'
                position='fixed'
                sx={{
                    zIndex: theme => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(20, 20, 20, 0.8)', // Shaffof fon
                    backdropFilter: 'blur(10px)', // Orqa fonni xiralashtirish (blur)
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Desktop Logo */}
                    <Box sx={{ flexGrow: { xs: 1, sm: 0 } }}>
                        <CustomLink href='/'>
                            <Image src={Logo} alt='ShareMe logo' width={150} height={40} priority />
                        </CustomLink>
                    </Box>

                    {/* Mobile Menu Icon */}
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ ml: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Desktop Menu Items */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map(item => (
                            <Button
                                component={CustomLink}
                                href={item.route}
                                key={item.route}
                                sx={{
                                    color: '#fff',
                                    fontWeight: 500,
                                    padding: '8px 16px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            {/* Bu Toolbar AppBar ostidagi kontentni surib turish uchun kerak */}
            <Toolbar />
            <nav>
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    anchor='right' // Menyuni o'ngdan ochadi
                    ModalProps={{
                        keepMounted: true, // Mobil qurilmalarda ochilish tezligini yaxshilaydi
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </>
    );
};

export default Navbar;