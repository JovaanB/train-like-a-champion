import AsyncStorage from "@react-native-async-storage/async-storage";

interface StorageData {
    key: string;
    value: string;
}

export const storeData = async ({ key, value }: StorageData) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (err) {
        console.error("Error storing data :", err);
    }
}

export const getItemFor = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        
        if (value != null) {
            return value
        }
    } catch (err) {
        console.error("Error getting data : ", err);
    }
}