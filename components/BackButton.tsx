import { radius } from '@/constants/theme'
import { useTheme } from '@/contexts/themeContext'
import { BackButtonProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import { CaretLeft } from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const BackButton = ({style, iconSize = 26}: BackButtonProps) => {
  const { theme,isDarkMode } = useTheme();
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: theme.primary },
        style
      ]} 
      onPress={() => router.back()}
    >
      <CaretLeft 
        size={verticalScale(iconSize)} 
        color={theme.white} 
        weight='bold' 
      />
    </TouchableOpacity>
  ) 
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    // backgroundColor é dinâmico agora
    alignSelf: 'flex-start',
    borderRadius: radius._12,
    borderCurve: 'continuous',
    padding: 5
  } 
})