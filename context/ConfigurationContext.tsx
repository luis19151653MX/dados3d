import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../configuration/i18n';

// Default values
const defaultConfigurationContext = {
    language: 'en',
    SetLanguageWithStorage: (language: string) => { },
    ClearAsyncStorage: () => { }
};

// Context
export const ConfigurationContext = createContext<{
    language: string;
    SetLanguageWithStorage: (language: string) => void;
    ClearAsyncStorage: () => void;
}>(defaultConfigurationContext);

// Provider
export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>('en');

    useEffect(() => {
        LoadStoredData();
    }, []);
    
    const LoadStoredData = async () => {
        try {
            console.log("AsyncLanguage");
            const storedLanguage = await AsyncStorage.getItem('AsyncLanguage');
            // set values or default values
            setLanguage(storedLanguage ?? 'en');
            i18n.changeLanguage(storedLanguage ?? 'en');
        } catch (error) {
            console.error('Error loading stored data:', error);
        }
    };

    const SetLanguageWithStorage = async (language: string) => {
        try {
            await AsyncStorage.setItem('AsyncLanguage', language);
            setLanguage(language);
            i18n.changeLanguage(language);
        } catch (error) {
            console.error('Error al guardar el idioma:', error);
        }
    };


    const ClearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage ha sido limpiado');
        } catch (error) {
            console.error('Error al borrar AsyncStorage:', error);
        }
    };

    return (
        <ConfigurationContext.Provider value={{
            language,
            SetLanguageWithStorage,
            ClearAsyncStorage
        }}>
            {children}
        </ConfigurationContext.Provider>
    );
};
