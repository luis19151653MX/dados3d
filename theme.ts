// theme.ts
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';


export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',  // Puedes personalizarlo
    background: '#ffffff',
    text: '#000000',
    modal: '#fff',
    disabled:'gray'
  },
  iconSize:20
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',  // Personaliza según tus necesidades
    background: '#121212',
    text: '#ffffff',
    modal: '#171746',
    disabled:'gray'
  },
  iconSize:20
};

export type AppTheme = typeof lightTheme;