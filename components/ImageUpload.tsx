import { radius } from '@/constants/theme'
import { useTheme } from '@/contexts/themeContext'
import { getFilePath } from '@/services/imageService'
import { ImageUploadProps } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import * as Icons from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Typo from './Typo'

const ImageUpload = ({ file = null, onSelect, onClear, containerStyle, imageStyle, placeholder = ""}: ImageUploadProps) => {
    const { theme } = useTheme();

   const onPickImage = async () => {
           let result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.Images,
               allowsEditing: true,
               aspect: [4, 3],
               quality: 0.7,
           });
   
           if (!result.canceled) {
               onSelect(result.assets[0]);
           }
       }
    return (
        <View>
            {!file && (<TouchableOpacity onPress={onPickImage} style={[styles.inputContainer, containerStyle && containerStyle, {backgroundColor: theme.background, borderColor: theme.text}]}>
                <Icons.UploadSimple color={theme.text} />
                {placeholder && <Typo size={15}>{placeholder}</Typo>}
            </TouchableOpacity>)}

            {file && (
                <View style={[styles.image, imageStyle && imageStyle]}>
                    <Image contentFit='cover' transition={100} source={getFilePath(file)} style={{flex: 1,}} />
                    <TouchableOpacity 
                    onPress={onClear} 
                    style={[styles.deleteIcon, { shadowColor: theme.text, shadowOffset: {height: 0, width: 0}, shadowOpacity: 1, shadowRadius: 10}]}>
                        <Icons.XCircle size={verticalScale(24)} weight='fill' color={theme.primary} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default ImageUpload

const styles = StyleSheet.create({
    inputContainer: {
        height: verticalScale(54),
        borderRadius: radius._15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    image: {
        height: scale(150),
        width: scale(150),
        borderRadius: radius._15,
        borderCurve: 'continuous',
        overflow: 'hidden'
    },
    deleteIcon: {
        position: 'absolute',
        top: scale(6),
        right: scale(6)
    }
})