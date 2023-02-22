import React, {Dispatch, FC, SetStateAction} from 'react';
import {Text, View} from 'react-native';
import Gasto from './Gasto';
import {gastoProp} from '../../Types/AppTypes';
import styles from './listadoGastos.styles';

interface ListadoGastosProps {
  gastos: gastoProp[];
  setModal: Dispatch<SetStateAction<boolean>>;
}

const ListadoGastos: FC<ListadoGastosProps> = ({gastos, setModal}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Listado Gastos</Text>

      {gastos.length === 0 ? (
        <Text style={styles.noGasto}>No hay gastos</Text>
      ) : (
        gastos.map(gasto => (
          <Gasto key={gasto.id} gasto={gasto} setModal={setModal} />
        ))
      )}
    </View>
  );
};

export default ListadoGastos;
