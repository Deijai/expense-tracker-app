import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { useTheme } from '@/contexts/themeContext'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useRef, useState } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'

const Register = () => {
    const { theme, isDarkMode } = useTheme(); // Obter o tema atual
    const router = useRouter();
    const { register: registerUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false)

    const nameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const handleSubmit = async () => {
        if (!nameRef.current || !emailRef.current || !passwordRef.current) {
            Alert.alert('Sign Up', 'Please fill all the fields');
            return;
        }
        setIsLoading(true);
        const res = await registerUser(emailRef.current, passwordRef.current, nameRef.current);
        setIsLoading(false);
        if(!res.success) {
            Alert.alert('Sign up', res.msg);
            return;
        }

        router.replace('/(auth)/login');
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/*back button*/}
                <BackButton iconSize={28} />

                <View style={{ gap: 5, marginTop: spacingY._20 }}>
                    <Typo size={30} fontWeight={'800'} color={theme.text}>Let´s</Typo>
                    <Typo size={30} fontWeight={'800'} color={theme.text}>Get Started</Typo>
                </View>

                {/*form*/}
                <View style={styles.form}>
                    <Typo 
                        size={16} 
                        color={theme.textLighter}
                    >
                        Create an account to track your expenses
                    </Typo>

                    {/*input*/}
                    <Input
                        placeholder='Enter your name'
                        onChangeText={value => nameRef.current = value}
                        icon={
                            <Icons.User 
                                size={verticalScale(26)} 
                                weight='fill'
                                color={theme.neutral300} 
                            />
                        } 
                    />
                    
                    <Input
                        placeholder='Enter your email'
                        onChangeText={value => emailRef.current = value}
                        icon={
                            <Icons.At 
                                size={verticalScale(26)} 
                                weight='fill'
                                color={theme.neutral300} 
                            />
                        } 
                    />

                    <Input
                        placeholder='Enter your password'
                        secureTextEntry
                        onChangeText={value => passwordRef.current = value}
                        icon={
                            <Icons.Lock 
                                size={verticalScale(26)} 
                                weight='fill'
                                color={theme.neutral300} 
                            />
                        } 
                    />

                    <Button loading={isLoading} onPress={handleSubmit}>
                        <Typo 
                            fontWeight={'700'} 
                            color={theme.white} 
                            size={21}
                        >
                            Sign Up
                        </Typo>
                    </Button>
                </View>

                {/*footer*/}
                <View style={styles.footer}>
                    <Typo size={15} color={theme.text}>Already have an account?</Typo>
                    <Pressable onPress={() => router.navigate('/(auth)/login')}>
                        <Typo size={15} fontWeight={'700'} color={theme.primary}>Sign in</Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingX._30,
        paddingHorizontal: spacingX._30
    },
    form: {
        gap: spacingY._20
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})