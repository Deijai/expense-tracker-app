import { useTheme } from '@/contexts/themeContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
    const router = useRouter();
    const { theme } = useTheme();
    
    // Se quiser reativar o redirecionamento automático, basta descomentar:
    // useEffect(() => {
    //     setTimeout(() => {
    //         router.push('/(auth)/welcome');
    //     }, 5000);
    // }, []);
    
    return (
        <View style={[
            styles.container, 
            { backgroundColor: theme.background } // Usa a cor de fundo dinâmica do tema
        ]}>
            <Image 
                resizeMode="contain" 
                style={styles.logo} 
                source={require('../assets/images/splashImage.png')} 
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Cor de fundo removida daqui e aplicada dinamicamente acima
    },
    logo: {
        height: '20%',
        aspectRatio: 1,
    }
});