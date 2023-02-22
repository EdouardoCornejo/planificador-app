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
} from './src/components/';
import {gastoProp} from './src/Types/AppTypes';

const App = () => {
  const [isValid, setIsValid] = useState(false);
  const [presupuesto, setPresupuesto] = useState('0');
  const [gastos, setGastos] = useState<gastoProp[]>([]);
  const [gasto, setGasto] = useState({});
  const [modal, setModal] = useState(false);

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
    if (Object.values(gasto).includes('')) {
      Alert.alert('Error:', 'Todos los campos son obligatorios');
      return;
    }
    setGastos([...gastos, gasto]);
    setModal(!modal);
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
          <ListadoGastos
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
          />
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
          />
        </Modal>
      )}

      {isValid && (
        <Pressable onPress={handleOpen}>
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
  imagen: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
});
