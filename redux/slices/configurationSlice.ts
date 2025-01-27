import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme } from 'react-native-paper';
import i18n from '../../configuration/i18n';
import { darkTheme, lightTheme } from '../../theme';

interface ConfigurationState {
    language: string;
    theme: 'light' | 'dark';
    paperTheme: typeof DefaultTheme;
}

const initialState: ConfigurationState = {
    language: 'en', // default values
    theme: 'light', 
    paperTheme:lightTheme
};

const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            i18n.changeLanguage(action.payload); // Cambiar el idioma en i18n
            AsyncStorage.setItem('AsyncLanguage', action.payload); // Guardar en AsyncStorage
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
            state.paperTheme=action.payload==='light'?lightTheme:darkTheme;
            AsyncStorage.setItem('AsyncTheme', action.payload); // Guardar en AsyncStorage
        },
        loadStoredConfig: (
            state,
            action: PayloadAction<{ language: string; theme: 'light' | 'dark' }>
        ) => {
            state.language = action.payload.language;
            state.theme = action.payload.theme;
            state.paperTheme=action.payload.theme === 'light' ? lightTheme : darkTheme;
            i18n.changeLanguage(action.payload.language); // Sincronizar i18n
        },
    },
});

export const { setLanguage, setTheme, loadStoredConfig } = configurationSlice.actions;

export default configurationSlice.reducer;
