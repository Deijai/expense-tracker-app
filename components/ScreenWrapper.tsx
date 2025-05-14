import { useTheme } from '@/contexts/themeContext';
import { ScreenWrapperProps } from '@/types';
import React from 'react';
import { Dimensions, Platform, StatusBar, View } from 'react-native';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const { theme, isDarkMode } = useTheme();
  const paddingTop = Platform.OS === 'ios' ? height * 0.06 : 50;

  return (
    <View 
      style={[
        { 
          paddingTop, 
          flex: 1, 
          backgroundColor: theme.background  // Uso dinâmico da cor de fundo
        }, 
        style
      ]}
    >
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.background}
      />
      {children}
    </View>
  );
};

export default ScreenWrapper;