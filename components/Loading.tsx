import { useTheme } from '@/contexts/themeContext';
import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';

const Loading = ({
  size = 'large', 
  color,
  ...props
}: ActivityIndicatorProps) => {
  const { theme } = useTheme();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator 
        size={size} 
        color={color || theme.primary} 
        {...props}
      />
    </View>
  )
}

export default Loading