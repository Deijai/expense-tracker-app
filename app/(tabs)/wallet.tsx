import Loading from '@/components/Loading'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import WalletListItem from '@/components/WalletListItem'
import { radius, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { useTheme } from '@/contexts/themeContext'
import useFetchData from '@/hooks/useFetchData'
import { WalletType } from '@/types'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import { orderBy, where } from 'firebase/firestore'
import * as Icons from 'phosphor-react-native'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

const Wallet = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { data: wallets, loading, error } = useFetchData<WalletType>('wallets', [where('uid', "==", user?.uid), orderBy('created', 'desc')]);
  const router = useRouter();

  console.log('wallets: ', wallets);
  

  const getTotalBalance = () => {
    return 2300;
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/*balance view*/}
        <View style={styles.balanceView}>
          <View style={{ alignItems: 'center' }}>
            <Typo size={45} fontWeight={'500'}>{getTotalBalance().toFixed(2)}</Typo>
            <Typo size={16} color={theme.neutral500}>Total Balance</Typo>
          </View>
        </View>

        {/*wallets*/}
        <View style={[styles.wallets, { backgroundColor: theme.neutral100}]}>
          {/*header*/}
          <View style={styles.flexRow}>
              <Typo size={20} fontWeight={'500'}>My Wallets</Typo>
              <TouchableOpacity onPress={() => router.push('/(modals)/walletModal')}>
                <Icons.PlusCircle color={theme.primary} weight='fill' size={verticalScale(33)} />
              </TouchableOpacity>
          </View>

          {/*todo: wallets list*/}
          {loading && (<Loading color={theme.primary} />)}

          <FlatList 
          data={wallets} 
          contentContainerStyle={styles.listStyle}
          renderItem={({item, index}) => {return <WalletListItem item={item} index={index} router={router} />}} />

        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Wallet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  balanceView: {
    height: verticalScale(160),
    //backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._10
  },
  wallets: {
    flex: 1,
    //backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25

  },
  listStyle: {
    paddingVertical: spacingX._25,
    paddingTop: spacingY._15
  }
})