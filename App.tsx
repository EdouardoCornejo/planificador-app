import React, {useState, useEffect} from 'react';
import {View, Alert, Pressable, Image, Modal, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import styles from './src/styles/app.styles';

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

  /* Getting the presupuesto from the local storage. */
  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem('planificador_presupuesto')) ?? '0';
        if (Number(presupuestoStorage) > 0) {
          setPresupuesto(presupuestoStorage);
          setIsValid(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerPresupuestoStorage();
  }, [presupuesto]);

  /* Saving the presupuesto to the local storage. */
  useEffect(() => {
    if (isValid) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto);
        } catch (error) {
          console.error(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValid, presupuesto]);

  /* Getting the gastos from the local storage. */
  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos');
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerGastosStorage();
  }, []);

  /* Saving the gastos to the local storage. */
  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem(
          'planificador_gastos',
          JSON.stringify(gastos),
        );
      } catch (error) {
        console.error(error);
      }
    };
    guardarGastosStorage();
  }, [gastos]);

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
      setFiltro('');
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

  const resetearApp = () => {
    Alert.alert(
      '¿Deseas Resetear la app?',
      'Esto eliminará presupuesto y gastos',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Aceptar',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValid(false);
              setPresupuesto('0');
              setGastos([]);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValid ? (
            <ControlPresupuesto
              presupuesto={Number(presupuesto)}
              gastos={gastos}
              resetearApp={resetearApp}
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
