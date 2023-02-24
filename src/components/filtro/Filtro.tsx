import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text} from 'react-native';
import {gastoProp} from '../../Types/AppTypes';
import styles from './filtro.styles';

interface FiltroProps {
  filtro: string;
  setFiltro: Dispatch<SetStateAction<string>>;
  gastos: gastoProp[];
  setGastosFiltrados: Dispatch<SetStateAction<gastoProp[]>>;
}

const Filtro: FC<FiltroProps> = ({
  setFiltro,
  filtro,
  setGastosFiltrados,
  gastos,
}) => {
  useEffect(() => {
    if (filtro === '') {
      setGastosFiltrados([]);
    } else {
      const gastosFiltrados = gastos.filter(
        gasto => gasto.categoria === filtro,
      );
      setGastosFiltrados(gastosFiltrados);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro]);

  const onFilter = (valor: string) => {
    valor === '' ? setFiltro('') : setFiltro(valor);
  };
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar Gastos</Text>

      <Picker selectedValue={filtro} onValueChange={onFilter}>
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
  );
};

export default Filtro;
