import React, {FC, useState, useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import styles from './control.styles';
import {formatearCantidad} from '../../helpers';
import {gastoProp} from '../../Types/AppTypes';

interface ControlPresupuestoProps {
  presupuesto: number;
  gastos: gastoProp[];
}

const ControlPresupuesto: FC<ControlPresupuestoProps> = ({
  presupuesto,
  gastos,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0,
    );
    const totalDisponible = presupuesto - totalGastado;

    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos, presupuesto]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <Image
          style={styles.imagen}
          source={require('../../img/grafico.jpg')}
        />
      </View>
      <View style={styles.contenedorTexto}>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

export default ControlPresupuesto;