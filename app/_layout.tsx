import { AuthProvider } from '@/contexts/authContext';
import { ThemeProvider } from '@/contexts/themeContext';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <StackLayout />
            </AuthProvider>
        </ThemeProvider>

    );
}

const StackLayout = () => {
    return <Stack screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='(modals)/profileModal' options={{
            presentation: 'modal'
        }} />

        <Stack.Screen name='(modals)/walletModal' options={{
            presentation: 'modal'
        }} />
    </Stack>
}

const styles = StyleSheet.create({});