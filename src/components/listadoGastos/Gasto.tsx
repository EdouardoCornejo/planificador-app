import React, {Dispatch, FC, SetStateAction} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {
  formatearCantidad,
  formatearFecha,
  diccionarioIconos,
} from '../../helpers';
import {categorias, gastoProp} from '../../Types/AppTypes';
import styles from './gasto.styles';

interface GastoProps {
  gasto: gastoProp;
  setModal: Dispatch<SetStateAction<boolean>>;
  setGasto: (gasto: gastoProp) => void;
}

const Gasto: FC<GastoProps> = ({gasto, setModal, setGasto}) => {
  const {cantidad, categoria, nombre, fecha} = gasto;

  const handleAcciones = () => {
    setModal(true);
    setGasto(gasto);
  };

  return (
    <Pressable onLongPress={handleAcciones}>
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
    </Pressable>
  );
};

export default Gasto;
