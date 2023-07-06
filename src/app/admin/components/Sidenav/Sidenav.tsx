import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Theme } from '@mui/material/styles';
import { Box, Divider, Drawer, List, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ComponentRouteCollapse, Routes } from '@/routes/routes';
import { useSoftUI } from '@/hooks/useSoftUI';
import { usePathname } from 'next/navigation';
import SidenavRoot from './SidenavRoot';
import sidenavLogoLabel from './styles/sidenavLogoLabel';
import SidenavCollapse from './SidenavCollapse';
import SidenavItem from './SidenavItem';

interface Props {
  color: string;
  brand?: any;
  brandName: string;
  routes: Routes;
}

const Sidenav = ({ color, brand, brandName, routes }: Props) => {
  const {
    miniSidenav,
    setMiniSidenav,
    transparentSidenav,
    setTransparentSidenav,
  } = useSoftUI();

  const [openCollapse, setOpenCollapse] = useState<string>('');
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const pathname = usePathname();
  const collapseName = pathname.split('/').slice(1)[0];
  const itemName = pathname.split('/').slice(1)[1];

  const closeSidenav = () => setMiniSidenav(true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(window.innerWidth < 1200);
    }

    window.addEventListener('resize', handleMiniSidenav);

    handleMiniSidenav();

    return () => window.removeEventListener('resize', handleMiniSidenav);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderNestedCollapse = (
    collapse: [] | ComponentRouteCollapse[] | undefined
  ) => {
    return collapse?.map(({ route, key }) => (
      <Link key={key} href={route}>
        <SidenavItem />
      </Link>
    ));
  };

  const renderRoutes = routes.map((routeItem) => {
    const { key, type, name, title, collapse, icon } = routeItem;
    let returnValue;

    switch (type) {
      case 'collapse':
        returnValue = (
          <SidenavCollapse
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
            open={key === openCollapse}
            onClick={() =>
              key === openCollapse ? setOpenCollapse('') : setOpenCollapse(key)
            }
          >
            {null}
          </SidenavCollapse>
        );
        break;

      case 'title':
        returnValue = (
          <Typography
            key={key}
            display='block'
            variant='caption'
            fontWeight='bold'
            textTransform='uppercase'
            pl={3}
            mt={2}
            mb={1}
            ml={1}
            sx={{ opacity: 0.6 }}
          >
            {title}
          </Typography>
        );
        break;

      case 'divider':
        returnValue = <Divider key={key} />;
        break;

      default:
        break;
    }

    return returnValue;
  });

  return (
    <SidenavRoot ownerState={{ miniSidenav, transparentSidenav }}>
      <Box pt={3} pb={1} px={4} textAlign='center'>
        <Box
          display={{ xs: 'block', xl: 'none' }}
          position='absolute'
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant='h6' color='secondary'>
            <CloseIcon sx={{ fontWeight: 'bold' }} />
          </Typography>
        </Box>
        <Box component={Link} href='/' display='flex' alignItems='center'>
          {brand && (
            <Box component='img' src={brand} alt='Soft UI Logo' width='2rem' />
          )}
          <Box
            width={!brandName ? '100%' : ''}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <Typography component='h6' variant='button' fontWeight='medium'>
              {brandName}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <List>{renderRoutes}</List>

      <Typography>Sidenav</Typography>
    </SidenavRoot>
  );
};

export default Sidenav;
