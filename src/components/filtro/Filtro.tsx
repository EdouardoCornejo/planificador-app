import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text} from 'react-native';
import {picker} from '../../helpers';
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
        {picker.map(pick => (
          <Picker.Item key={pick.id} label={pick.label} value={pick.value} />
        ))}
      </Picker>
    </View>
  );
};

export default Filtro;
