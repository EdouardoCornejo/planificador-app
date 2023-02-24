import React, {Dispatch, FC, SetStateAction} from 'react';
import {Pressable, TextInput, Text, View} from 'react-native';
import {soloNumeros} from '../../helpers/soloNumeros';
import styles from './presupuesto.styles';

interface NuevoPresupuestoProps {
  handleNuevoPresupuesto: (presupuesto: string) => void;
  setPresupuesto: Dispatch<SetStateAction<string>>;
  presupuesto: string;
}

const NuevoPresupuesto: FC<NuevoPresupuestoProps> = ({
  handleNuevoPresupuesto,
  presupuesto,
  setPresupuesto,
}) => {
  const onPresupuesto = () => handleNuevoPresupuesto(presupuesto.toString());
  const handlePresupuesto = (presupuesto: string) => {
    const nuevaCantidad = soloNumeros(presupuesto);
    setPresupuesto(nuevaCantidad);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto"
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={handlePresupuesto}
      />

      <Pressable style={styles.boton} onPress={onPresupuesto}>
        <Text style={styles.botonTexto}>Agregar Presupuesto </Text>
      </Pressable>
    </View>
  );
};

export default NuevoPresupuesto;
