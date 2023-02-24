import React, {FC} from 'react';
import {Text, SafeAreaView} from 'react-native';
import styles from './header.styles';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de Gastos</Text>
    </SafeAreaView>
  );
};

export default Header;
