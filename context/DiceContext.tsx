import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default values
const defaultDiceContext = {
    diceColor: '#fff', // color predeterminado
    dotColor: '#000',  // color predeterminado
    lastRollNumber: 0, // valor por defecto
    maxDiceValue: 0,     // valor por defecto
    setDiceColor: (color: string) => { },
    setDotColor: (color: string) => { },
    setLastRollNumber: (number: number) => { },
    setMaxDiceValue: (value: number) => { },
    ClearAsyncStorage: () => { }
};

// Context
export const DiceContext = createContext<{
    diceColor: string;
    dotColor: string;
    lastRollNumber: number;
    maxDiceValue: number;//max dice value
    setDiceColor: (color: string) => void;
    setDotColor: (color: string) => void;
    setLastRollNumber: (number: number) => void;
    setMaxDiceValue: (value: number) => void;
    ClearAsyncStorage: () => void;
}>(defaultDiceContext);

// Provider
export const DiceProvider = ({ children }: { children: ReactNode }) => {
    const [diceColor, setDiceColor] = useState<string>('#fff');
    const [dotColor, setDotColor] = useState<string>('#000');
    const [lastRollNumber, setLastRollNumber] = useState<number>(0);
    const [maxDiceValue, setMaxDiceValue] = useState<number>(0);

    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const storedDiceColor = await AsyncStorage.getItem('AsyncDiceColor');
                const storedDotColor = await AsyncStorage.getItem('AsyncDotColor');
                const storedLastRollNumber = await AsyncStorage.getItem('AsyncLastRollNumber');
                const storedMaxDiceValue = await AsyncStorage.getItem('AsyncMaxDiceValue');

                // set values or default values
                setDiceColor(storedDiceColor ?? '#fff');
                setDotColor(storedDotColor ?? '#000');
                setLastRollNumber((storedLastRollNumber && storedLastRollNumber !== '0') ? Number(storedLastRollNumber) : 1);
                setMaxDiceValue((storedMaxDiceValue && storedMaxDiceValue !== '0') ? Number(storedMaxDiceValue) : 1);
            } catch (error) {
                console.error('Error loading stored data:', error);
            }
        };

        loadStoredData();
    }, []);

    useEffect(() => {
        console.log('useEfectDice')
        const saveDataToStorage = async () => {
            try {
                if (diceColor !== '#fff') {
                    await AsyncStorage.setItem('AsyncDiceColor', diceColor);
                }
            } catch (error) {
                console.error('Error saving data to AsyncStorage:', error);
            }
        };
        saveDataToStorage();
    }, [diceColor]);

    useEffect(() => {
        console.log('AsyncDotColor')
        const saveDataToStorage = async () => {
            try {
                if (dotColor !== '#fff') {
                    await AsyncStorage.setItem('AsyncDotColor', dotColor);
                }
            } catch (error) {
                console.error('Error saving data to AsyncStorage:', error);
            }
        };
        saveDataToStorage();
    }, [dotColor]);

    useEffect(() => {
        console.log('AsyncLastRollNumber')
        const saveDataToStorage = async () => {
            try {
                if (lastRollNumber !== 0) {
                    await AsyncStorage.setItem('AsyncLastRollNumber', String(lastRollNumber));
                }
            } catch (error) {
                console.error('Error saving data to AsyncStorage:', error);
            }
        };
        saveDataToStorage();
    }, [lastRollNumber]);

    useEffect(() => {
        console.log('AsyncMaxDiceValue')
        const saveDataToStorage = async () => {
            try {
                if (maxDiceValue !== 0) {
                    await AsyncStorage.setItem('AsyncMaxDiceValue', String(maxDiceValue));
                }
            } catch (error) {
                console.error('Error saving data to AsyncStorage:', error);
            }
        };
        saveDataToStorage();
    }, [maxDiceValue]);

    const ClearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear(); 
            console.log('AsyncStorage ha sido limpiado');
        } catch (error) {
            console.error('Error al borrar AsyncStorage:', error);
        }
    };

    return (
        <DiceContext.Provider value={{
            diceColor,
            dotColor,
            lastRollNumber,
            maxDiceValue,
            setDiceColor,
            setDotColor,
            setLastRollNumber,
            setMaxDiceValue,
            ClearAsyncStorage
        }}>
            {children}
        </DiceContext.Provider>
    );
};
