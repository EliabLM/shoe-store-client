'use client';

import { useState, useEffect, MouseEventHandler } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

// Material icons
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Hooks
import { useSoftUI } from '@/hooks/useSoftUI';

// Components
import { CustomBreadcrumbs } from '@/components/common/CustomBreadcrumbs';
import { colors } from '@/assets/theme/base/colors';

// Styles
import {
  navbarContainer,
  navbarRow,
  navbarStyle,
  navbarDesktopMenu,
  navbarIconButton,
  navbarMobileMenu,
} from './styles';

type NavbarType = 'sticky' | 'static';

interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}

const DashboardNavbar = ({ absolute, light, isMini }: Props) => {
  const pathname = usePathname();
  const route = pathname.split('/').slice(1);
  const { dark, white } = colors;

  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    setTransparentNavbar,
    setMiniSidenav,
    setOpenConfigurator,
  } = useSoftUI();

  const [navbarType, setNavbarType] = useState<NavbarType>('sticky');

  const handleMiniSidenav = () => setMiniSidenav(!miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(!openConfigurator);

  // Set navbarType
  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType('sticky');
    } else {
      setNavbarType('static');
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    window.addEventListener('scroll', handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener('scroll', handleTransparentNavbar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixedNavbar]);

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color='inherit'
      sx={(theme) => navbarStyle(theme, { absolute, light, transparentNavbar })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <Box
          color='inherit'
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <CustomBreadcrumbs
            icon={<HomeIcon />}
            route={route}
            title={route[route.length - 1]}
          />
          {miniSidenav ? (
            <MenuOpenIcon
              fontSize='medium'
              sx={navbarDesktopMenu}
              onClick={handleMiniSidenav}
            />
          ) : (
            <MenuIcon
              fontSize='medium'
              sx={navbarDesktopMenu}
              onClick={handleMiniSidenav}
            />
          )}
        </Box>

        {isMini ? null : (
          <Box sx={(theme) => navbarRow(theme, { isMini })}>
            <Box color={light ? 'white' : 'inherit'}>
              <Link href='/'>
                <IconButton sx={navbarIconButton} size='small'>
                  <AccountCircleIcon
                    sx={{
                      color: light ? white.main : dark.main,
                    }}
                  />
                </IconButton>
                <Typography
                  variant='button'
                  fontWeight='medium'
                  color={light ? 'white' : 'dark'}
                >
                  Admin
                </Typography>
              </Link>

              <IconButton
                size='small'
                color='inherit'
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                {miniSidenav ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>

              <IconButton
                size='small'
                color='inherit'
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
