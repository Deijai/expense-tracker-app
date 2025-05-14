import { useTheme } from '@/contexts/themeContext';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.text }]}>
        {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: theme.primaryLight }}
        thumbColor={isDarkMode ? theme.primary : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default ThemeToggle;