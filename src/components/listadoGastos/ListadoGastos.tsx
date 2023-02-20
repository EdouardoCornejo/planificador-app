import React, {FC} from 'react';
import {Text, View} from 'react-native';
import Gasto from './Gasto';
import {gastoProp} from '../../Types/AppTypes';
import styles from './listadoGastos.styles';

interface ListadoGastosProps {
  gastos: gastoProp[];
}

const ListadoGastos: FC<ListadoGastosProps> = ({gastos}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Listado Gastos</Text>

      {gastos.length === 0 ? (
        <Text style={styles.noGasto}>No hay gastos</Text>
      ) : (
        gastos.map(gasto => <Gasto key={gasto.id} gasto={gasto} />)
      )}
    </View>
  );
};

export default ListadoGastos;
