import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { spacingX } from '@/constants/theme';
import { useTheme } from '@/contexts/themeContext';
import { verticalScale } from '@/utils/styling';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const Welcome = () => {
    const { theme, isDarkMode } = useTheme(); // Obter o tema atual
    const router = useRouter();
    
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/*Login button e image*/}
                <View>
                    <TouchableOpacity 
                        style={[styles.loginButton, { backgroundColor: theme.primary }]} 
                        onPress={() => router.push('/(auth)/login')}
                    >
                        <Typo fontWeight={"500"} color={theme.white}>Sign In</Typo>
                    </TouchableOpacity>
                    
                    <Animated.Image 
                        entering={FadeIn.duration(1000)} 
                        resizeMode='contain' 
                        style={styles.welcomeImage} 
                        source={require('../../assets/images/welcome.png')} 
                    />
                </View>
            </View>
            
            {/*footer*/}
            <View style={[
                styles.footer, 
                { 
                    backgroundColor: theme.background,
                    shadowColor: isDarkMode ? "white" : theme.black
                }
            ]}>
                <Animated.View 
                    entering={FadeInDown.duration(1000).springify().damping(12)} 
                    style={{ alignItems: 'center' }}
                >
                    <Typo size={30} fontWeight={"800"} color={isDarkMode ? theme.white : theme.textLight}>
                        Always take control
                    </Typo>
                    <Typo size={30} fontWeight={"800"} color={isDarkMode ? theme.white : theme.textLight}>
                        of your finances
                    </Typo>
                </Animated.View>
                
                <Animated.View 
                    entering={FadeInDown.duration(1000).delay(100).springify().damping(12)} 
                    style={{ alignItems: 'center', gap: 2 }}
                >
                    <Typo size={17} color={isDarkMode ? theme.white : theme.textLight}>
                        Finances must be arranged to set a better
                    </Typo>
                    <Typo size={17} color={isDarkMode ? theme.white : theme.textLight}>
                        lifestyle in future
                    </Typo>
                </Animated.View>
                
                <Animated.View 
                    entering={FadeInDown.duration(1000).delay(200).springify().damping(12)} 
                    style={styles.buttonContainer}
                >
                    {/*button*/}
                    <Button 
                        onPress={() => router.push('/(auth)/register')}
                        style={{
                            backgroundColor: theme.primary
                        }}
                    >
                        <Typo 
                            size={22} 
                            color={theme.white} 
                            fontWeight={"600"}
                        >
                            Get Started
                        </Typo>
                    </Button>
                </Animated.View>
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: spacingX._7
    },
    welcomeImage: {
        width: '100%',
        height: verticalScale(300),
        alignSelf: 'center',
        marginTop: verticalScale(100)
    },
    loginButton: {
        alignSelf: 'flex-end',
        marginEnd: spacingX._15,
        paddingHorizontal: spacingX._10,
        paddingVertical: 8,
        borderRadius: 8,
        // backgroundColor dinamicamente aplicado
    },
    footer: {
        // backgroundColor dinamicamente aplicado
        alignItems: 'center',
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingX._20,
        // shadowColor dinamicamente aplicado
        shadowOffset: { width: 0, height: -10 },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.15
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: spacingX._25
    },
});