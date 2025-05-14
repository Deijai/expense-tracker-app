import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Input from '@/components/Input'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { useTheme } from '@/contexts/themeContext'
import { getProfileImage } from '@/services/imageService'
import { updateUser } from '@/services/userService'
import { UserDataType } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

const ProfileModal = () => {
    const { theme, isDarkMode } = useTheme(); // Obter o tema atual
    const { user, updateUserData } = useAuth();
    const router = useRouter();
    const [userData, setUserData] = useState<UserDataType>({
        name: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUserData({
            name: user?.name || "",
            image: user?.image || null
        });
    }, [user]);

    const onPickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            setUserData({ ...userData, image: result.assets[0] });
        }
    }

    const onSubmit = async () => {
        const { name, image } = userData;

        if (!name.trim()) {
            Alert.alert('User', 'Please fill all the fields');
            return;
        }

        setLoading(true)
        const res = await updateUser(user?.uid as string, { name, image })
        setLoading(false);

        if (res.success) {
            await updateUserData(user?.uid as string);
            router.back();
        } else {
            Alert.alert('User', res.msg);
        }
    }
    
    return (
        <ModalWrapper>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Header 
                    title='Update profile' 
                    leftIcon={<BackButton />} 
                    style={{ marginBottom: spacingY._10 }} 
                />
                
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.avatarContainer}>
                        <Image 
                            style={[styles.avatar, { 
                                backgroundColor: theme.neutral300,
                                borderColor: isDarkMode ? theme.neutral700 : theme.neutral400 
                            }]} 
                            source={getProfileImage(userData.image)} 
                            contentFit='cover' 
                            transition={100} 
                        />
                        <TouchableOpacity 
                            onPress={onPickImage} 
                            style={[styles.editIcon, { 
                                backgroundColor: theme.primary,
                                shadowColor: theme.black 
                            }]}
                        >
                            <Icons.Pencil size={verticalScale(20)} color={theme.white} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Typo color={theme.textLight}>Name</Typo>
                        <Input 
                            placeholder='Name' 
                            value={userData.name} 
                            onChangeText={value => setUserData({ ...userData, name: value })} 
                            containerStyle={{
                                borderColor: isDarkMode ? theme.neutral600 : theme.neutral300
                            }}
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={[styles.footer, { 
                borderTopColor: theme.isDarkMode ? theme.neutral200 : theme.neutral200,
                backgroundColor: theme.background
            }]}>
                <Button 
                    onPress={onSubmit} 
                    style={{ 
                        flex: 1,
                        backgroundColor: theme.primary
                    }} 
                    loading={loading}
                >
                    <Typo color={ theme.white } fontWeight={'700'}>
                        Update profile
                    </Typo>
                </Button>
            </View>
        </ModalWrapper>
    )
}

export default ProfileModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingY._20,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        marginBottom: spacingY._5,
        borderTopWidth: 1,
    },
    form: {
        marginTop: spacingY._15,
        gap: spacingY._30
    },
    avatarContainer: {
        position: 'relative',
        alignSelf: 'center'
    },
    avatar: {
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
    },
    editIcon: {
        position: 'absolute',
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7
    },
    inputContainer: {
        gap: spacingY._10
    }
})