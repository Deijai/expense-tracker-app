import { radius, spacingX } from '@/constants/theme'
import { useTheme } from '@/contexts/themeContext'
import { WalletListItemProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import * as Icons from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Typo from './Typo'

const WalletListItem = ({item, index, router}: WalletListItemProps) => {
  const { theme } = useTheme();
  return (
    <Animated.View entering={FadeInDown.delay(index*300).springify().damping(13)}>
      <TouchableOpacity style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={{flex: 1}} source={item.image} contentFit='cover' transition={100} />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={16}>{item.name}</Typo>
          <Typo size={14} color={theme.text}>R$ {item.amount}</Typo>
        </View>

        <Icons.CaretRight color={theme.primary} weight='bold' />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default WalletListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(17)
  },
  imageContainer: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderWidth: 1,
    // borderColor: colors.black
    borderRadius: radius._12,
    borderCurve: 'continuous',
    overflow: 'hidden'
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10
  }
})