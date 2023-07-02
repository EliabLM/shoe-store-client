type layout = 'dashboard' | 'landing';
type sidenavColor = 'info' | 'white';

interface UIState {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  sidenavColor: sidenavColor;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  layout: layout;
}
