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
import { Alert, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'

const Login = () => {
    const { theme, isDarkMode } = useTheme(); // Obter o tema atual
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [changeIcon, setChangeIcon] = useState(true)
    const { login: loginUser } = useAuth();

    const emailRef = useRef("")
    const passwordRef = useRef("")

    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', 'Please fill all the fields');
            return;
        }

        setIsLoading(true);
        const res = await loginUser(emailRef.current, passwordRef.current);
        setIsLoading(false);
        if (!res.success) {
            Alert.alert('Sign in', res.msg);
            return;
        }
        router.replace('/(tabs)');
    }

    const handleVisibilityPassword = () => {
        setChangeIcon(prevState => !prevState);
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/*back button*/}
                <BackButton iconSize={28} />

                <View style={{ gap: 5, marginTop: spacingY._20 }}>
                    <Typo size={30} fontWeight={'800'} color={theme.text}>Hey,</Typo>
                    <Typo size={30} fontWeight={'800'} color={theme.text}>Welcome Back</Typo>
                </View>

                {/*form*/}
                <View style={styles.form}>
                    <Typo 
                        size={16} 
                        color={theme.textLighter}
                    >
                        Login now to track all your expenses
                    </Typo>

                    {/*input*/}
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
                        secureTextEntry={changeIcon}
                        onChangeText={value => passwordRef.current = value}
                        icon={changeIcon ? (
                            <TouchableOpacity onPress={handleVisibilityPassword}>
                                <Icons.Lock
                                    size={verticalScale(26)}
                                    weight='fill'
                                    color={theme.neutral300}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleVisibilityPassword}>
                                <Icons.LockOpen
                                    size={verticalScale(26)}
                                    weight='fill'
                                    color={theme.neutral300}
                                />
                            </TouchableOpacity>
                        )} 
                    />

                    <Typo 
                        size={14} 
                        color={theme.text} 
                        style={{ alignSelf: 'flex-end' }}
                    >
                        Forgot Password
                    </Typo>
                    
                    <Button loading={isLoading} onPress={handleSubmit}>
                        <Typo 
                            fontWeight={'700'} 
                            color={theme.white} 
                            size={21}
                        >
                            Sign In
                        </Typo>
                    </Button>
                </View>

                {/*footer*/}
                <View style={styles.footer}>
                    <Typo size={15} color={theme.text}>Don´t have an account?</Typo>
                    <Pressable onPress={() => router.navigate('/(auth)/register')}>
                        <Typo size={15} fontWeight={'700'} color={theme.primary}>Sign up</Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login

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