import {StyleSheet} from 'react-native';
import globalStyles from '../../styles';

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
    marginBottom: 10,
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default styles;
