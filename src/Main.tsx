import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { I18nextProvider } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store, { AppDispatch } from '../redux/store';
import { loadStoredConfig } from '../redux/slices/configurationSlice';
import i18n from '../configuration/i18n';
import { DiceProvider } from '../context/DiceContext';
import ScreenRollDice from './ScreenRollDice/ScreenRollDice';


const AppInitializer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const paperTheme = useSelector((state: any) => state.configuration.paperTheme);

    useEffect(() => {
        const loadConfiguration = async () => {
            try {
                const storedLanguage = (await AsyncStorage.getItem('AsyncLanguage')) || 'en';
                const storedTheme = (await AsyncStorage.getItem('AsyncTheme')) || 'light';

                // Actualizamos Redux con la configuración almacenada
                dispatch(
                    loadStoredConfig({
                        language: storedLanguage,
                        theme: storedTheme as 'light' | 'dark',
                    })
                );

                // Cambiamos el idioma en i18n
                i18n.changeLanguage(storedLanguage);
            } catch (error) {
                console.error('Error loading stored configuration:', error);
            }
        };

        loadConfiguration();
    }, [dispatch]);

    return (
        <PaperProvider theme={paperTheme}>
            <DiceProvider>
                <ScreenRollDice />
            </DiceProvider>
        </PaperProvider>);
};

export default function Main(): JSX.Element {
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <AppInitializer />
            </I18nextProvider>
        </Provider>
    );
}
