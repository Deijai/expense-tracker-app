import { useTheme } from '@/contexts/themeContext'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { Text, TextStyle } from 'react-native'

const Typo = ({ 
  size, 
  color,
  fontWeight = '400', 
  children, 
  style, 
  textProps = {} 
}: TypoProps) => {
  const { theme } = useTheme();
  
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color: color || theme.text,
    fontWeight,
  }
  
  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  )
}

export default Typo