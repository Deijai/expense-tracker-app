import { radius, spacingX } from '@/constants/theme'
import { useTheme } from '@/contexts/themeContext'
import { InputProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const Input = (props: InputProps) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          borderColor: isDarkMode ? theme.neutral300 : theme.neutral400,
          backgroundColor: isDarkMode ? 'transparent' : theme.neutral50
        },
        props.containerStyle
      ]}
    >
      {props.icon && props.icon}
      <TextInput
        style={[
          styles.input, 
          { color: theme.text },
          props.inputStyle
        ]}
        placeholderTextColor={theme.neutral400}
        ref={props.inputRef}
        {...props} 
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: verticalScale(54),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    // borderColor é dinâmico agora
    // backgroundColor é dinâmico agora
    borderRadius: radius._17,
    borderCurve: 'continuous',
    paddingHorizontal: spacingX._15,
    gap: spacingX._10
  },
  input: {
    flex: 1,
    // color é dinâmico agora
    fontSize: verticalScale(14)
  }
})