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
import Overview from 'layouts/ecommerce/overview';

// Soft UI Dashboard PRO React icons
import Shop from 'examples/Icons/Shop';
import GroupIcon from '@mui/icons-material/Group';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

// Pages
import UsersList from 'pages/Modules/Users/UsersList';
import NewUser from 'pages/Modules/Users/NewUser';
import EditUser from 'pages/Modules/Users/EditUser';
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
import Products from 'pages/Inventory/Products/Products';
import NewProduct from 'pages/Inventory/Products/NewProduct';
import EditProduct from 'pages/Inventory/Products/EditProduct';
import Sales from 'pages/Sales/Sales';
import NewSale from 'pages/Sales/NewSale';
import PaymentMethods from 'pages/Parametrization/paymentMethods/PaymentMethods';
import NewPaymentMethod from 'pages/Parametrization/paymentMethods/NewPaymentMethod';
import EditPaymentMethod from 'pages/Parametrization/paymentMethods/EditPaymentMethod';

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
    ],
  },
  { type: 'title', title: 'Módulos', key: 'modulos' },
  {
    type: 'collapse',
    name: 'Ventas',
    key: 'ventas',
    collapse: [
      {
        name: 'Ventas',
        key: 'listado',
        route: '/ventas/listado',
        component: <Sales />,
      },
      {
        name: 'Nueva venta',
        key: 'nueva-venta',
        route: '/ventas/nueva-venta',
        component: <NewSale />,
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Inventario',
    key: 'inventario',
    collapse: [
      {
        name: 'Productos',
        key: 'productos',
        route: '/inventario/productos',
        component: <Products />,
      },
      {
        name: 'Productos',
        key: 'nuevo-producto',
        route: '/inventario/nuevo-producto',
        component: <NewProduct />,
      },
      {
        name: 'Productos',
        key: 'editar-producto',
        route: '/inventario/editar-producto',
        component: <EditProduct />,
      },
    ],
  },
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
        name: 'Métodos de pago',
        key: 'metodos-de-pago',
        route: '/parametrizacion/metodos-de-pago',
        component: <PaymentMethods />,
      },
      {
        name: 'Métodos de pago',
        key: 'nuevo-metodo-de-pago',
        route: '/parametrizacion/nuevo-metodo-de-pago',
        component: <NewPaymentMethod />,
      },
      {
        name: 'Métodos de pago',
        key: 'editar-metodo-de-pago',
        route: '/parametrizacion/editar-metodo-de-pago',
        component: <EditPaymentMethod />,
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Profile',
    key: 'profile',
    noCollapse: true,
    route: '/profile',
    component: <Profile />,
  },
];

export default routes;
