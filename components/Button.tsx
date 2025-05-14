import { radius } from '@/constants/theme';
import { useTheme } from '@/contexts/themeContext';
import { verticalScale } from '@/utils/styling';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomButtonProps } from '../types';
import Loading from './Loading';

const Button = ({ 
  style, 
  onPress, 
  loading = false,
  children,
}: CustomButtonProps) => {
  const { theme } = useTheme();
  
  if(loading) {
    return (
      <View 
        style={[
          styles.button, 
          { backgroundColor: 'transparent' },
          style
        ]}
      >
        {/*loading*/}
        <Loading />
      </View>
    )
  }
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.button, 
        { backgroundColor: theme.primary },
        style
      ]}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    // backgroundColor é dinâmico agora
    borderRadius: radius._17,
    borderCurve: 'continuous',
    height: verticalScale(52),
    justifyContent: 'center',
    alignItems: 'center'
  }
})
