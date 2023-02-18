export const formatearCantidad = (cantidad: number | string) =>
  Number(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
