// src/components/CustomTabs.tsx
import { spacingY } from '@/constants/theme';
import { useTheme } from '@/contexts/themeContext';
import { verticalScale } from '@/utils/styling';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Icons from 'phosphor-react-native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

// Usando sintaxe de função nomeada para o componente
function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  // O hook useTheme deve estar sempre no nível superior do componente
  const { theme } = useTheme();
  
  const tabbarIcons = {
    index: (isFocused: boolean) => (
      <Icons.House 
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? theme.primary : theme.neutral400} 
      />
    ),
    statistic: (isFocused: boolean) => (
      <Icons.ChartBar 
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? theme.primary : theme.neutral400} 
      />
    ),
    wallet: (isFocused: boolean) => (
      <Icons.Wallet 
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? theme.primary : theme.neutral400} 
      />
    ),
    profile: (isFocused: boolean) => (
      <Icons.UserCircle 
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? theme.primary : theme.neutral400} 
      />
    ),
  };
  
  return (
    <View style={[
      styles.tabbar,
      { 
        backgroundColor: theme.isDarkMode ? theme.background : theme.white,
        borderTopColor: theme.isDarkMode ? theme.neutral200 : theme.neutral200
      }
    ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        
        const isFocused = state.index === index;
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        
        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {tabbarIcons[route.name as keyof typeof tabbarIcons]?.(isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabs;

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    width: '100%',
    height: Platform.OS === 'ios' ? verticalScale(73) : verticalScale(55),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  tabbarItem: {
    marginBottom: Platform.OS === 'ios' ? spacingY._10 : spacingY._5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});