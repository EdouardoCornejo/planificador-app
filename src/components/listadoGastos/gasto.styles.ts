import {StyleSheet} from 'react-native';
import globalStyles from '../../styles';

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 15,
  },
  contenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contenedorImagen: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imagen: {
    marginRight: 20,
    width: 80,
    height: 80,
  },
  contenedorTexto: {
    flex: 1,
  },
  categoria: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 20,
    fontWeight: '700',
  },
  fecha: {
    fontWeight: '700',
    color: '#DB2777',
  },
});

export default styles;
