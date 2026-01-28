import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'CIS@2026!';

export const encryptData = (data: any): string => {
    try {
        const jsonString = JSON.stringify(data);
        return CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
    } catch (error) {
        console.log('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
};

export const decryptData = <T>(encryptedData: string): T | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedString) return null;
        return JSON.parse(decryptedString);
    } catch (error) {
        console.log('Decryption error:', error);
        return null;
    }
};
