import Home from '@/app/page';
import Dashboard from '@/app/admin/dashboard/page';
import Admin from '@/app/admin/page';
import Shop from '@/assets/icons/Shop';

type RouteType = 'collapse' | 'divider' | 'title';

export interface ComponentRoute {
  name: string;
  key: string;
  route: string;
  component?: React.ReactNode;
}

export interface ComponentRouteCollapse extends ComponentRoute {
  collapse?: ComponentRoute[];
}

export interface Option {
  type: RouteType;
  name: string;
  title: string;
  key: string;
  icon?: any;
  collapse?: ComponentRouteCollapse[] | [];
}

export type Routes = Array<Option>;

const routes: Routes = [
  {
    type: 'collapse',
    name: 'Dashboards',
    title: 'Dashboards',
    key: 'dashboards',
    icon: <Shop />,
    collapse: [
      {
        name: 'Default',
        key: 'default',
        route: '/admin/dashboard',
        component: <Admin />,
      },
      {
        name: 'Automotive',
        key: 'automotive',
        route: '/admin/dashboard',
        component: <Dashboard />,
      },
      {
        name: 'Automotive',
        key: 'automotive',
        route: '/admin/dashboard',
        collapse: [
          {
            key: 'profile-overview',
            name: 'Profile overview',
            route: '/admin/dashboard',
            component: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    type: 'title',
    name: 'Parametrización',
    title: 'Parametrización',
    key: 'parametrizacion',
  },
  { type: 'divider', name: 'divider', title: 'divider', key: 'divider-1' },
  { type: 'title', name: 'Docs', title: 'Docs', key: 'title-docs' },
  {
    type: 'collapse',
    name: 'Acreedores',
    title: 'Acreedores',
    key: 'acreedores',
    icon: <Shop />,
    collapse: [
      {
        name: 'Creditors',
        key: 'creditors',
        route: '/admin/creditors',
        component: <Admin />,
      },
      {
        name: 'Abonos',
        key: 'abonos',
        route: '/admin/abonos',
        component: <Dashboard />,
      },
    ],
  },
];

export default routes;
