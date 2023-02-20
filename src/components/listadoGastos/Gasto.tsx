import React, {FC} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import globalStyles from '../../styles';
import {categoria, gastoProp} from '../../Types/AppTypes';
import {formatearCantidad} from '../../helpers';

interface GastoProps {
  gasto: gastoProp;
}

const diccionarioIconos = {
  ahorro: require('../../img/icono_ahorro.png'),
  comida: require('../../img/icono_comida.png'),
  casa: require('../../img/icono_casa.png'),
  gastos: require('../../img/icono_gastos.png'),
  ocio: require('../../img/icono_ocio.png'),
  salud: require('../../img/icono_salud.png'),
  suscripciones: require('../../img/icono_suscripciones.png'),
};

const Gasto: FC<GastoProps> = ({gasto}) => {
  const {cantidad, categoria, nombre} = gasto;

  return (
    <View style={styles.contenedor}>
      <View>
        <View>
          <Image source={diccionarioIconos[categoria as keyof categoria]} />
          <Text>{categoria}</Text>
          <Text>{nombre}</Text>
        </View>
        <Text>{formatearCantidad(cantidad)}</Text>
      </View>
    </View>
  );
};

export default Gasto;

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 15,
  },
});
