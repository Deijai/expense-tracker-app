// src/app/(tabs)/_layout.tsx
import CustomTabs from '@/components/CustomTabs';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs 
      tabBar={props => <CustomTabs {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen name='index' />
      <Tabs.Screen name='statistic' />
      <Tabs.Screen name='wallet' />
      <Tabs.Screen name='profile' />
    </Tabs>
  );
}