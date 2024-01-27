/** 
  All of the routes for the Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard PRO React layouts
import Automotive from 'layouts/dashboards/automotive';
import SmartHome from 'layouts/dashboards/smart-home';
import CRM from 'layouts/dashboards/crm';
import ProfileOverview from 'layouts/pages/profile/profile-overview';
import Teams from 'layouts/pages/profile/teams';
import AllProjects from 'layouts/pages/profile/all-projects';
import Reports from 'layouts/pages/users/reports';
import NewUser2 from 'layouts/pages/users/new-user';
import Settings from 'layouts/pages/account/settings';
import Billing from 'layouts/pages/account/billing';
import Invoice from 'layouts/pages/account/invoice';
import Security from 'layouts/pages/account/security';
import General from 'layouts/pages/projects/general';
import Timeline from 'layouts/pages/projects/timeline';
import NewProject from 'layouts/pages/projects/new-project';
import Widgets from 'layouts/pages/widgets';
import Charts from 'layouts/pages/charts';
import SweetAlerts from 'layouts/pages/sweet-alerts';
import Notifications from 'layouts/pages/notifications';
import PricingPage from 'layouts/pages/pricing-page';
import Kanban from 'layouts/applications/kanban';
import Wizard from 'layouts/applications/wizard';
import DataTables from 'layouts/applications/data-tables';
import Calendar from 'layouts/applications/calendar';
import Analytics from 'layouts/applications/analytics';
import Overview from 'layouts/ecommerce/overview';
import EditProduct2 from 'layouts/ecommerce/products/edit-product';
import ProductPage from 'layouts/ecommerce/products/product-page';
import ProductsList from 'layouts/ecommerce/products/products-list';
import OrderList from 'layouts/ecommerce/orders/order-list';
import OrderDetails from 'layouts/ecommerce/orders/order-details';
import Referral from 'layouts/ecommerce/referral';
import SignInBasic from 'layouts/authentication/sign-in/basic';
import SignInCover from 'layouts/authentication/sign-in/cover';
import SignInIllustration from 'layouts/authentication/sign-in/illustration';
import SignUpBasic from 'layouts/authentication/sign-up/basic';
import SignUpCover from 'layouts/authentication/sign-up/cover';
import SignUpIllustration from 'layouts/authentication/sign-up/illustration';
import ResetBasic from 'layouts/authentication/reset-password/basic';
import ResetCover from 'layouts/authentication/reset-password/cover';
import ResetIllustration from 'layouts/authentication/reset-password/illustration';
import LockBasic from 'layouts/authentication/lock/basic';
import LockCover from 'layouts/authentication/lock/cover';
import LockIllustration from 'layouts/authentication/lock/illustration';
import VerificationBasic from 'layouts/authentication/2-step-verification/basic';
import VerificationCover from 'layouts/authentication/2-step-verification/cover';
import VerificationIllustration from 'layouts/authentication/2-step-verification/illustration';
import Error404 from 'layouts/authentication/error/404';
import Error500 from 'layouts/authentication/error/500';

// Soft UI Dashboard PRO React icons
import Shop from 'examples/Icons/Shop';
import Office from 'examples/Icons/Office';
import SettingsIcon from 'examples/Icons/Settings';
import Basket from 'examples/Icons/Basket';
import Document from 'examples/Icons/Document';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

// Pages
import Sales from 'pages/Dashboards/Sales/Sales';
import UsersList from 'pages/Modules/Users/UsersList';
import NewUser from 'pages/Modules/Users/NewUser';
import EditUser from 'pages/Modules/Users/EditUser';
import CreditorsList from 'pages/Modules/Creditors/CreditorsList';
import NewCreditor from 'pages/Modules/Creditors/NewCreditor';
import EditCreditor from 'pages/Modules/Creditors/EditCreditor';
import CreditsList from 'pages/Modules/Creditors/Credits/CreditsList';
import NewCredit from 'pages/Modules/Creditors/Credits/NewCredit';
import UpdateCredit from 'pages/Modules/Creditors/Credits/UpdateCredit';
import Profile from 'pages/auth/Profile/Profile';
import Locations from 'pages/Parametrization/Locations/Locations';
import NewLocation from 'pages/Parametrization/Locations/NewLocation';
import EditLocation from 'pages/Parametrization/Locations/EditLocation';
import Brands from 'pages/Parametrization/Brands/Brands';
import NewBrand from 'pages/Parametrization/Brands/newBrand';
import EditBrand from 'pages/Parametrization/Brands/EditBrand';
import Categories from 'pages/Parametrization/Categories/Categories';
import NewCategory from 'pages/Parametrization/Categories/NewCategory';
import EditCategory from 'pages/Parametrization/Categories/EditCategory';
import Products from 'pages/Parametrization/Products/Products';
import NewProduct from 'pages/Parametrization/Products/NewProduct';
import EditProduct from 'pages/Parametrization/Products/EditProduct';

const routes = [
  {
    type: 'collapse',
    name: 'Dashboards',
    key: 'dashboards',
    icon: <Shop size="12px" />,
    collapse: [
      {
        name: 'Ventas',
        key: 'ventas',
        route: '/dashboards/ventas',
        component: <Overview />,
      },
      {
        name: 'Inventarios',
        key: 'inventarios',
        route: '/dashboards/inventarios',
        component: <Automotive />,
      },
      {
        name: 'Proveedores',
        key: 'proveedores',
        route: '/dashboards/proveedores',
        component: <SmartHome />,
      },
      {
        name: 'Acreedores',
        key: 'acreedores',
        route: '/dashboards/acreedores',
        component: <CRM />,
      },
    ],
  },
  { type: 'title', title: 'Módulos', key: 'modulos' },
  {
    type: 'collapse',
    name: 'Usuarios',
    key: 'usuarios',
    icon: <GroupIcon fontSize="10px" />,
    collapse: [
      {
        name: 'Lista de usuarios',
        key: 'lista-usuarios',
        route: '/usuarios/lista-usuarios',
        component: <UsersList />,
      },
      {
        name: 'Nuevo usuario',
        key: 'nuevo-usuario',
        route: '/usuarios/nuevo-usuario',
        component: <NewUser />,
      },
      {
        name: 'Editar usuario',
        key: 'editar-usuario',
        route: '/usuarios/editar-usuario',
        component: <EditUser />,
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Acreedores',
    key: 'acreedores',
    icon: <AccountBalanceIcon fontSize="10px" />,
    collapse: [
      {
        name: 'Lista de acreedores',
        key: 'lista-acreedores',
        route: '/acreedores/lista-acreedores',
        component: <CreditorsList />,
      },
      {
        name: 'Nuevo acreedor',
        key: 'nuevo-acreedor',
        route: '/acreedores/nuevo-acreedor',
        component: <NewCreditor />,
      },
      {
        name: 'Editar acreedor',
        key: 'editar-acreedor',
        route: '/acreedores/editar-acreedor',
        component: <EditCreditor />,
      },
      {
        name: 'Créditos',
        key: 'creditos',
        collapse: [
          {
            name: 'Lista de créditos',
            key: 'lista-creditos',
            route: '/acreedores/creditos/lista-creditos',
            component: <CreditsList />,
          },
          {
            name: 'Nuevo crédito',
            key: 'nuevo-credito',
            route: '/acreedores/creditos/nuevo-credito',
            component: <NewCredit />,
          },
          {
            name: 'Actualizar credito',
            key: 'actualizar-credito',
            route: '/acreedores/creditos/actualizar-credito',
            component: <UpdateCredit />,
          },
        ],
      },
    ],
  },
  // { type: 'title', title: 'Parametrización', key: 'parametrizacion-title' },
  {
    type: 'collapse',
    name: 'Parametrización',
    key: 'parametrizacion',
    icon: <SettingsSuggestIcon fontSize="10px" />,
    collapse: [
      {
        name: 'Locales',
        key: 'locales',
        route: '/parametrizacion/locales',
        component: <Locations />,
      },
      {
        name: 'Locales',
        key: 'nuevo-local',
        route: '/parametrizacion/nuevo-local',
        component: <NewLocation />,
      },
      {
        name: 'Locales',
        key: 'editar-local',
        route: '/parametrizacion/editar-local',
        component: <EditLocation />,
      },
      {
        name: 'Marcas',
        key: 'marcas',
        route: '/parametrizacion/marcas',
        component: <Brands />,
      },
      {
        name: 'Marcas',
        key: 'nueva-marca',
        route: '/parametrizacion/nueva-marca',
        component: <NewBrand />,
      },
      {
        name: 'Marcas',
        key: 'editar-marca',
        route: '/parametrizacion/editar-marca',
        component: <EditBrand />,
      },
      {
        name: 'Categorías',
        key: 'categorias',
        route: '/parametrizacion/categorias',
        component: <Categories />,
      },
      {
        name: 'Categorías',
        key: 'nueva-categoria',
        route: '/parametrizacion/nueva-categoria',
        component: <NewCategory />,
      },
      {
        name: 'Categorías',
        key: 'editar-categoria',
        route: '/parametrizacion/editar-categoria',
        component: <EditCategory />,
      },
      {
        name: 'Productos',
        key: 'productos',
        route: '/parametrizacion/productos',
        component: <Products />,
      },
      {
        name: 'Productos',
        key: 'nuevo-producto',
        route: '/parametrizacion/nuevo-producto',
        component: <NewProduct />,
      },
      {
        name: 'Productos',
        key: 'editar-producto',
        route: '/parametrizacion/editar-producto',
        component: <EditProduct />,
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Pages',
    key: 'pages',
    icon: <Office size="12px" />,
    collapse: [
      {
        name: 'Profile',
        key: 'profile',
        collapse: [
          {
            name: 'Profile Overview',
            key: 'profile-overview',
            route: '/pages/profile/profile-overview',
            component: <ProfileOverview />,
          },
          {
            name: 'Teams',
            key: 'teams',
            route: '/pages/profile/teams',
            component: <Teams />,
          },
          {
            name: 'All Projects',
            key: 'all-projects',
            route: '/pages/profile/all-projects',
            component: <AllProjects />,
          },
        ],
      },
      {
        name: 'Users',
        key: 'users',
        collapse: [
          {
            name: 'Reports',
            key: 'reports',
            route: '/pages/users/reports',
            component: <Reports />,
          },
          {
            name: 'New User',
            key: 'new-user',
            route: '/pages/users/new-user',
            component: <NewUser2 />,
          },
        ],
      },
      {
        name: 'Account',
        key: 'account',
        collapse: [
          {
            name: 'Settings',
            key: 'settings',
            route: '/pages/account/settings',
            component: <Settings />,
          },
          {
            name: 'Billing',
            key: 'billing',
            route: '/pages/account/billing',
            component: <Billing />,
          },
          {
            name: 'Invoice',
            key: 'invoice',
            route: '/pages/account/invoice',
            component: <Invoice />,
          },
          {
            name: 'Security',
            key: 'security',
            route: '/pages/account/security',
            component: <Security />,
          },
        ],
      },
      {
        name: 'Projects',
        key: 'projects',
        collapse: [
          {
            name: 'General',
            key: 'general',
            route: '/pages/projects/general',
            component: <General />,
          },
          {
            name: 'Timeline',
            key: 'timeline',
            route: '/pages/projects/timeline',
            component: <Timeline />,
          },
          {
            name: 'New Project',
            key: 'new-project',
            route: '/pages/projects/new-project',
            component: <NewProject />,
          },
        ],
      },
      {
        name: 'Pricing Page',
        key: 'pricing-page',
        route: '/pages/pricing-page',
        component: <PricingPage />,
      },
      { name: 'Widgets', key: 'widgets', route: '/pages/widgets', component: <Widgets /> },
      { name: 'Charts', key: 'charts', route: '/pages/charts', component: <Charts /> },
      {
        name: 'Sweet Alerts',
        key: 'sweet-alerts',
        route: '/pages/sweet-alerts',
        component: <SweetAlerts />,
      },
      {
        name: 'Notfications',
        key: 'notifications',
        route: '/pages/notifications',
        component: <Notifications />,
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Applications',
    key: 'applications',
    icon: <SettingsIcon size="12px" />,
    collapse: [
      {
        name: 'Kanban',
        key: 'kanban',
        route: '/applications/kanban',
        component: <Kanban />,
      },
      {
        name: 'Wizard',
        key: 'wizard',
        route: '/applications/wizard',
        component: <Wizard />,
      },
      {
        name: 'Data Tables',
        key: 'data-tables',
        route: '/applications/data-tables',
        component: <DataTables />,
      },
      {
        name: 'Calendar',
        key: 'calendar',
        route: '/applications/calendar',
        component: <Calendar />,
      },
      {
        name: 'Analytics',
        key: 'analytics',
        route: '/applications/analytics',
        component: <Analytics />,
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Ecommerce',
    key: 'ecommerce',
    icon: <Basket size="12px" />,
    collapse: [
      {
        name: 'Overview',
        key: 'overview',
        route: '/ecommerce/overview',
        component: <Overview />,
      },
      {
        name: 'Products',
        key: 'products',
        collapse: [
          {
            name: 'New Product',
            key: 'new-product',
            route: '/ecommerce/products/new-product',
            component: <NewProduct />,
          },
          {
            name: 'Edit Product',
            key: 'edit-product',
            route: '/ecommerce/products/edit-product',
            component: <EditProduct2 />,
          },
          {
            name: 'Product Page',
            key: 'product-page',
            route: '/ecommerce/products/product-page',
            component: <ProductPage />,
          },
          {
            name: 'Products List',
            key: 'products-list',
            route: '/ecommerce/products/products-list',
            component: <ProductsList />,
          },
        ],
      },
      {
        name: 'Orders',
        key: 'orders',
        collapse: [
          {
            name: 'Order List',
            key: 'order-list',
            route: '/ecommerce/orders/order-list',
            component: <OrderList />,
          },
          {
            name: 'Order Details',
            key: 'order-details',
            route: '/ecommerce/orders/order-details',
            component: <OrderDetails />,
          },
        ],
      },
      {
        name: 'Referral',
        key: 'referral',
        route: '/ecommerce/referral',
        component: <Referral />,
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Authentication',
    key: 'authentication',
    icon: <Document size="12px" />,
    collapse: [
      {
        name: 'Sign In',
        key: 'sign-in',
        collapse: [
          {
            name: 'Basic',
            key: 'basic',
            route: '/authentication/sign-in/basic',
            component: <SignInBasic />,
          },
          {
            name: 'Cover',
            key: 'cover',
            route: '/authentication/sign-in/cover',
            component: <SignInCover />,
          },
          {
            name: 'Illustration',
            key: 'illustration',
            route: '/authentication/sign-in/illustration',
            component: <SignInIllustration />,
          },
        ],
      },
      {
        name: 'Sign Up',
        key: 'sign-up',
        collapse: [
          {
            name: 'Basic',
            key: 'basic',
            route: '/authentication/sign-up/basic',
            component: <SignUpBasic />,
          },
          {
            name: 'Cover',
            key: 'cover',
            route: '/authentication/sign-up/cover',
            component: <SignUpCover />,
          },
          {
            name: 'Illustration',
            key: 'illustration',
            route: '/authentication/sign-up/illustration',
            component: <SignUpIllustration />,
          },
        ],
      },
      {
        name: 'Reset Password',
        key: 'reset-password',
        collapse: [
          {
            name: 'Basic',
            key: 'basic',
            route: '/authentication/reset-password/basic',
            component: <ResetBasic />,
          },
          {
            name: 'Cover',
            key: 'cover',
            route: '/authentication/reset-password/cover',
            component: <ResetCover />,
          },
          {
            name: 'Illustration',
            key: 'illustration',
            route: '/authentication/reset-password/illustration',
            component: <ResetIllustration />,
          },
        ],
      },
      {
        name: 'Lock',
        key: 'lock',
        collapse: [
          {
            name: 'Basic',
            key: 'basic',
            route: '/authentication/lock/basic',
            component: <LockBasic />,
          },
          {
            name: 'Cover',
            key: 'cover',
            route: '/authentication/lock/cover',
            component: <LockCover />,
          },
          {
            name: 'Illustration',
            key: 'illustration',
            route: '/authentication/lock/illustration',
            component: <LockIllustration />,
          },
        ],
      },
      {
        name: '2-Step Verification',
        key: '2-step-verification',
        collapse: [
          {
            name: 'Basic',
            key: 'basic',
            route: '/authentication/verification/basic',
            component: <VerificationBasic />,
          },
          {
            name: 'Cover',
            key: 'cover',
            route: '/authentication/verification/cover',
            component: <VerificationCover />,
          },
          {
            name: 'Illustration',
            key: 'illustration',
            route: '/authentication/verification/illustration',
            component: <VerificationIllustration />,
          },
        ],
      },
      {
        name: 'Error',
        key: 'error',
        collapse: [
          {
            name: 'Error 404',
            key: 'error-404',
            route: '/authentication/error/404',
            component: <Error404 />,
          },
          {
            name: 'Error 500',
            key: 'error-500',
            route: '/authentication/error/500',
            component: <Error500 />,
          },
        ],
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Profile',
    key: 'profile',
    noCollapse: true,
    route: '/profile',
    icon: <AccountBoxIcon size="12px" />,
    component: <Profile />,
  },
];

export default routes;
