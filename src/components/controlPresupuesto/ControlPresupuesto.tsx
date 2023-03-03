import React, {FC, useState, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {formatearCantidad} from '../../helpers';
import {gastoProp} from '../../Types/AppTypes';
import styles from './control.styles';

interface ControlPresupuestoProps {
  presupuesto: number;
  gastos: gastoProp[];
  resetearApp: () => void;
}

const ControlPresupuesto: FC<ControlPresupuestoProps> = ({
  presupuesto,
  gastos,
  resetearApp,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0,
    );
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos, presupuesto]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          duration={1000}
          radius={150}
          valueSuffix={'%'}
          valuePrefix={'$'}
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3B82F6"
          activeStrokeWidth={20}
          titleStyle={{fontWeight: 'bold', fontSize: 20}}
          titleColor="#64748B"
        />
      </View>
      <View style={styles.contenedorTexto}>
        <Pressable style={styles.boton} onLongPress={resetearApp}>
          <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>

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
