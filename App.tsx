import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {
  Header,
  NuevoPresupuesto,
  ControlPresupuesto,
  FormularioGasto,
  ListadoGastos,
  Filtro,
} from './src/components/';
import {generarID} from './src/helpers';
import {gastoProp} from './src/Types/AppTypes';

const App = () => {
  const [isValid, setIsValid] = useState(false);
  const [presupuesto, setPresupuesto] = useState('0');
  const [gastos, setGastos] = useState<gastoProp[]>([]);

  const [modal, setModal] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState<gastoProp[]>([]);
  const [gasto, setGasto] = useState({
    cantidad: '',
    categoria: '',
    id: '',
    nombre: '',
    fecha: 0,
  });

  const handleNuevoPresupuesto = (presupuesto: string) => {
    if (Number(presupuesto) > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
      Alert.alert('Error', 'Presupuesto no puede ser 0 o menor');
    }
  };

  const handleOpen = () => setModal(!modal);

  const handleGasto = (gasto: gastoProp) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error:', 'Todos los campos son obligatorios');
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState: gastoProp) =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastosActualizados);
      setGasto({
        cantidad: '',
        categoria: '',
        id: '',
        nombre: '',
        fecha: 0,
      });
    } else {
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setModal(!modal);
  };

  const eliminarGasto = (id: string) => {
    Alert.alert('¿Deseas Eliminar este gasto?', 'No se puede revertir', [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Confirmar',
        onPress: () => {
          const gastosActualizados = gastos.filter(
            gastoState => gastoState.id !== id,
          );
          setGastos(gastosActualizados);
          setGasto({
            cantidad: '',
            categoria: '',
            id: '',
            nombre: '',
            fecha: 0,
          });
          setModal(!Modal);
        },
      },
    ]);
  };

  const onCloseModal = () => setModal(!modal);
  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValid ? (
            <ControlPresupuesto
              presupuesto={Number(presupuesto)}
              gastos={gastos}
            />
          ) : (
            <NuevoPresupuesto
              handleNuevoPresupuesto={handleNuevoPresupuesto}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
            />
          )}
        </View>

        {isValid && (
          <>
            <Filtro
              setFiltro={setFiltro}
              filtro={filtro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />

            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          visible={modal}
          animationType="slide"
          onRequestClose={onCloseModal}>
          <FormularioGasto
            setModal={setModal}
            onGasto={handleGasto}
            setGasto={setGasto}
            gasto={gasto}
            onEliminar={eliminarGasto}
          />
        </Modal>
      )}

      {isValid && (
        <Pressable style={styles.pressable} onPress={handleOpen}>
          <Image
            source={require('./src/img/nuevo-gasto.png')}
            style={styles.imagen}
          />
        </Pressable>
      )}
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  pressable: {
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});
