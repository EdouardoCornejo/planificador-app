export const formatearFecha = (fecha: number) => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return fechaNueva.toLocaleTimeString('es-ES', opciones);
};
