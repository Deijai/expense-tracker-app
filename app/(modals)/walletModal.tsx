import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Header from '@/components/Header'
import ImageUpload from '@/components/ImageUpload'
import Input from '@/components/Input'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { useTheme } from '@/contexts/themeContext'
import { createorUpdateWallet } from '@/services/walletService'
import { WalletType } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'

const WalletModal = () => {
  const { theme, isDarkMode } = useTheme(); // Obter o tema atual
  const { user } = useAuth();
  const router = useRouter();
  const [wallet, setWallet] = useState<WalletType>({
    name: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const { name, image } = wallet;

    if (!name.trim() || !image) {
      Alert.alert('Wallet', 'Please fill all the fields');
      return;
    }

    const data: WalletType = {
      name,
      image,
      uid: user?.uid,
    }

    //todo: include wallet id if updating

    setLoading(true)
    const res = await createorUpdateWallet(data);
    setLoading(false);

    if (res.success) {
      router.back();
    } else {
      Alert.alert('Wallet', res.msg);
    }
  }

  return (
    <ModalWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header
          title='New Wallet'
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={theme.textLight}>Wallet Name</Typo>
            <Input
              placeholder='Description Wallet'
              value={wallet.name}
              onChangeText={value => setWallet({ ...wallet, name: value })}
              containerStyle={{
                borderColor: isDarkMode ? theme.neutral600 : theme.neutral300
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={theme.textLight}>Wallet Icon</Typo>
            {/*image input*/}
            <ImageUpload
              file={wallet.image}
              onClear={() => setWallet({ ...wallet, image: null })}
              onSelect={file => setWallet({ ...wallet, image: file })}
              placeholder='Upload Image' />
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
          <Typo color={theme.white} fontWeight={'700'}>
            Add Wallet
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default WalletModal

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