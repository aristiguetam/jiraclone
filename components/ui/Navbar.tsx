import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from '../../context/ui';

export const Navbar = () => {

    const { openSideMenu } = useContext(UIContext)

    return (
        <AppBar position="sticky"  >
            <Toolbar>
                <IconButton
                    onClick={openSideMenu}
                    size="large"
                    edge='start'>
                    <MenuOutlinedIcon />
                </IconButton>
                
                <NextLink href="/" passHref style={{textDecoration: 'none'}}>
                        <Typography variant='h6' color="white">OpenJira</Typography>
                </NextLink>

            </Toolbar>
        </AppBar>
    )
}
