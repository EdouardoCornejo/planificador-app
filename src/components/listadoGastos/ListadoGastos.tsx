import React, {Dispatch, FC, SetStateAction} from 'react';
import {Text, View} from 'react-native';
import Gasto from './Gasto';
import {gastoProp} from '../../Types/AppTypes';
import styles from './listadoGastos.styles';

interface ListadoGastosProps {
  gastos: gastoProp[];
  setModal: Dispatch<SetStateAction<boolean>>;
  setGasto: (gasto: gastoProp) => void;
  filtro: string;
  gastosFiltrados: gastoProp[];
}

const ListadoGastos: FC<ListadoGastosProps> = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Listado Gastos</Text>

      {filtro
        ? gastosFiltrados.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))
        : gastos.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))}

      {(gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
        <Text style={styles.noGasto}>No hay gastos</Text>
      )}
    </View>
  );
};

export default ListadoGastos;
