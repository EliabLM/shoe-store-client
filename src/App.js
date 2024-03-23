import { useState, useEffect } from 'react';

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';

// Soft UI Dashboard PRO React example components
import Sidenav from 'examples/Sidenav';
import Configurator from 'examples/Configurator';
import RequireAuth from 'examples/LayoutContainers/RequireAuth/RequireAuth';

// Soft UI Dashboard PRO React themes
import theme from 'assets/theme';

// Soft UI Dashboard PRO React routes
import routes from 'routes/superadmin/superadmin.routes';
import sidenavRoutes from 'routes/superadmin/superadminSidenav.routes';
import sellerRoutes from 'routes/seller/seller.routes';
import sellerSidenavRoutes from 'routes/seller/sellerSidenav.routes';
import adminRoutes from 'routes/admin/admin.routes';
import adminSidenavRoutes from 'routes/admin/adminSidenav.routes';

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from 'context';

// Images
import brand from 'assets/images/logo-ct.png';

// Pages
import SignIn from 'pages/auth/SignIn';
import Error500 from 'pages/Error500';

import { useAuth } from 'hooks/useAuth';

const sidenavRoleRoutes = {
  superadmin: sidenavRoutes,
  vendedor: sellerSidenavRoutes,
  admin: adminSidenavRoutes,
};

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: 'pointer' }}
      onClick={() => navigate('/ventas/nueva-venta')}
    >
      <Icon fontSize="default" color="inherit">
        local_grocery_store_icon
      </Icon>
    </SoftBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Shoe Store App"
            routes={sidenavRoleRoutes[user?.role] || []}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}

      <Routes>
        {/* Public routes */}
        <Route exact index element={<SignIn />} key={'sign-in'} />
        <Route exact path={'/error-500'} element={<Error500 />} key={'error-500'} />

        {/* Private routes */}
        <Route element={<RequireAuth allowedRoles={['vendedor', 'admin', 'superadmin']} />}>
          {getRoutes(sellerRoutes)}
        </Route>

        <Route element={<RequireAuth allowedRoles={['admin', 'superadmin']} />}>
          {getRoutes(adminRoutes)}
        </Route>

        <Route element={<RequireAuth allowedRoles={['superadmin']} />}>{getRoutes(routes)}</Route>

        {/* Not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
