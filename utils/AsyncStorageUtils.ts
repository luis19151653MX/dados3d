import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log('AsyncStorage ha sido limpiado');
    } catch (error) {
        console.error('Error al borrar AsyncStorage:', error);
    }
};