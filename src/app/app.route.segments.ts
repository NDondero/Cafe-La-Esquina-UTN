export const ROUTE_SEGMENTS = {
  products: 'productos',
  addProduct: 'agregar',
  productDetails: ':id',
  auth: 'auth',
  login: 'login',
  signup: 'registrarse',
} as const;

export const ROUTE_COMMANDS = {
  products: [`/${ROUTE_SEGMENTS.products}`],
  addProduct: [`/${ROUTE_SEGMENTS.products}`, ROUTE_SEGMENTS.addProduct],
  login: [`/${ROUTE_SEGMENTS.auth}`, ROUTE_SEGMENTS.login],
  productDetails: (id: string | number) => [`/${ROUTE_SEGMENTS.products}`, id],
} as const;
