import React, {FC} from 'react';
import {Text, View, Image} from 'react-native';
import {formatearCantidad, formatearFecha} from '../../helpers';
import {categorias, gastoProp} from '../../Types/AppTypes';
import styles from './gasto.styles';

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
  const {cantidad, categoria, nombre, fecha} = gasto;

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenido}>
        <View style={styles.contenedorImagen}>
          <Image
            style={styles.imagen}
            source={diccionarioIconos[categoria as keyof categorias]}
          />
          <View style={styles.contenedorTexto}>
            <Text style={styles.categoria}>{categoria}</Text>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
          </View>
        </View>
        <Text style={styles.cantidad}>{formatearCantidad(cantidad)}</Text>
      </View>
    </View>
  );
};

export default Gasto;
