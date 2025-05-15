import { firestore } from "@/config/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, doc, setDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const createorUpdateWallet = async (walletData: WalletType): Promise<ResponseType> => {

    try {
        let walletToSave = { ...walletData };

        if (walletData.image) {
            const imageUploadRes = await uploadFileToCloudinary(walletData.image, "wallets");
            if (!imageUploadRes.success) {
                return { success: false, msg: imageUploadRes.msg || 'Failed to upload wallet icon' }
            }
            walletToSave.image = imageUploadRes.data;
        }

        if (!walletData.id) {
            // new wallet
            walletToSave.amount = 0;
            walletToSave.totalIncome = 0;
            walletToSave.totalExpenses = 0;
            walletToSave.created = new Date();
        }

        const walletRef = walletData?.id ? doc(firestore, 'wallets', walletData.uid!) : doc(collection(firestore, 'wallets'));
        await setDoc(walletRef, walletToSave, { merge: true })

        return {
            success: true,
            data: { ...walletToSave, id: walletRef.id }
        }
    } catch (error: any) {
        console.log('Error wallet create or update');
        return {
            success: false,
            msg: error.message,
            data: null
        }
    }
}