export type MenuItem = {
  iconoNombre: string;
  despliegaNombre: string;
  route?: string;
  tipoPermiso?: string;
  indeterminate?: boolean;
  selected?: boolean;
  subItems?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    iconoNombre: 'dashboard',
    despliegaNombre: 'Panel',
    route: 'secundario/inicio2',
  },
  {
    iconoNombre: 'emoji_objects',
    despliegaNombre: 'Ingreso',
    route: 'secundario/ingreso2',
  },

];
