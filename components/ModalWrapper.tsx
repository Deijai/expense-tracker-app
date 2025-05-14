import { spacingY } from '@/constants/theme';
import { useTheme } from '@/contexts/themeContext';
import { ModalWrapperProps } from '@/types';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const isIos = Platform.OS == 'ios';

const ModalWrapper = ({ style, children, bg }: ModalWrapperProps) => {
  const { theme } = useTheme();
  
  // Usar o tema.background como padrão ao invés de cores fixas
  // Isso garante consistência com o restante da aplicação
  const backgroundColor = bg || theme.background;
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor }, 
        style
      ]}
    >
      {children}
    </View>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isIos ? spacingY._15 : 50,
    paddingBottom: isIos ? spacingY._20 : spacingY._10
  }
});