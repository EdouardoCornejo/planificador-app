import React, {Dispatch, FC, SetStateAction, useState, useEffect} from 'react';
import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {picker, soloNumeros} from '../../helpers';
import {gastoProp} from '../../Types/AppTypes';
import styles from './formulario.styles';

interface FormularioGastoProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  onGasto: (gasto: gastoProp) => void;
  setGasto: (gasto: gastoProp) => void;
  gasto: gastoProp;
  onEliminar: (id: string) => void;
}

const FormularioGasto: FC<FormularioGastoProps> = ({
  setModal,
  onGasto,
  setGasto,
  gasto,
  onEliminar,
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

  const onDelete = () => onEliminar(id);
  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBtn}>
        <Pressable
          style={[styles.btn, styles.btnCancelar]}
          onLongPress={onCloseModal}>
          <Text style={styles.btnTexto}>Cancelar</Text>
        </Pressable>

        {id && (
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={onDelete}>
            <Text style={[styles.btnTexto]}>Eliminar</Text>
          </Pressable>
        )}
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
            {picker.map(pick => (
              <Picker.Item
                key={pick.id}
                label={pick.label}
                value={pick.value}
              />
            ))}
          </Picker>
        </View>
        <Pressable style={styles.submitBtn} onPress={onAddGasto}>
          <Text style={styles.submitBtnTexto}>
            {gasto?.nombre ? 'Actualizar Registro' : 'Agregar Gasto'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FormularioGasto;
