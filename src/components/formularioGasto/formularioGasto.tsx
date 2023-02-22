import React, {Dispatch, FC, SetStateAction, useState, useEffect} from 'react';
import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {soloNumeros} from '../../helpers';
import {gastoProp} from '../../Types/AppTypes';
import styles from './formulario.styles';

interface FormularioGastoProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  onGasto: (gasto: gastoProp) => void;
  setGasto: (gasto: gastoProp) => void;
  gasto: gastoProp;
}

const FormularioGasto: FC<FormularioGastoProps> = ({
  setModal,
  onGasto,
  setGasto,
  gasto,
}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState(0);

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  const onCloseModal = () => {
    setModal(false);
    setGasto({
      cantidad: '',
      categoria: '',
      id: '',
      nombre: '',
      fecha: 0,
    });
  };

  const onAddGasto = () => {
    if (gasto?.id) {
      onGasto({nombre, cantidad, categoria, id, fecha});
    } else {
      onGasto({nombre, cantidad, categoria, id: '', fecha: 0});
    }
  };

  const handleCantidad = (cantidad: string) => {
    const nuevaCantidad = soloNumeros(cantidad);
    setCantidad(nuevaCantidad);
  };
  const pickerValue = (value: string) => setCategoria(value);

  return (
    <SafeAreaView style={styles.contenedor}>
      <View>
        <Pressable style={styles.btnCancelar} onLongPress={onCloseModal}>
          <Text style={styles.btnCancelarTexto}>Cancelar</Text>
        </Pressable>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
        </Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del gasto"
            onChangeText={setNombre}
            value={nombre}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del gasto"
            keyboardType="numeric"
            onChangeText={handleCantidad}
            value={cantidad}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Categoria Gasto</Text>
          <Picker selectedValue={categoria} onValueChange={pickerValue}>
            <Picker.Item label="-- Seleccione" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Gastos Varios" value="gastos" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="Suscripciones" value="suscripciones" />
          </Picker>
        </View>
        <Pressable style={styles.submitBtn} onPress={onAddGasto}>
          <Text style={styles.submitBtnTexto}>
            {' '}
            {gasto?.nombre ? 'Actualizar Registro' : 'Agregar Gasto'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FormularioGasto;
