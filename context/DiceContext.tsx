import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default values
const defaultDiceContext = {
    diceColor: '#fff', // color predeterminado
    dotColor: '#000',  // color predeterminado
    lastRollNumber: 0, // valor por defecto
    diceValue: 0,     // valor por defecto
    setDiceColor: (color: string) => { },
    setDotColor: (color: string) => { },
    setLastRollNumber: (number: number) => { },
    setDiceValue: (value: number) => { },
};

// Context
export const DiceContext = createContext<{
    diceColor: string;
    dotColor: string;
    lastRollNumber: number;
    diceValue: number;
    setDiceColor: (color: string) => void;
    setDotColor: (color: string) => void;
    setLastRollNumber: (number: number) => void;
    setDiceValue: (value: number) => void;
}>(defaultDiceContext);

// Provider
export const DiceProvider = ({ children }: { children: ReactNode }) => {
    const [diceColor, setDiceColor] = useState<string>('#fff');
    const [dotColor, setDotColor] = useState<string>('#000');
    const [lastRollNumber, setLastRollNumber] = useState<number>(0);
    const [diceValue, setDiceValue] = useState<number>(0);

    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const storedDiceColor = await AsyncStorage.getItem('AsyncDiceColor');
                const storedDotColor = await AsyncStorage.getItem('AsyncDotColor');
                const storedLastRollNumber = await AsyncStorage.getItem('AsyncLastRollNumber');
                const storedDiceValue = await AsyncStorage.getItem('AsyncDiceValue');

                // set values or default values
                setDiceColor(storedDiceColor ?? '#fff');
                setDotColor(storedDotColor ?? '#000');
                setLastRollNumber((storedLastRollNumber && storedLastRollNumber !== '0') ? Number(storedLastRollNumber) : 1);
                setDiceValue((storedDiceValue && storedDiceValue !== '0') ? Number(storedDiceValue) : 1);
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
        console.log('useEfectDot')
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
        console.log('useEfectLast')
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
        console.log('useEfectValue')
        const saveDataToStorage = async () => {
            try {
                if (diceValue !== 0) {
                    await AsyncStorage.setItem('AsyncDiceValue', String(diceValue));
                }
            } catch (error) {
                console.error('Error saving data to AsyncStorage:', error);
            }
        };
        saveDataToStorage();
    }, [diceValue]);

    return (
        <DiceContext.Provider value={{
            diceColor,
            dotColor,
            lastRollNumber,
            diceValue,
            setDiceColor,
            setDotColor,
            setLastRollNumber,
            setDiceValue
        }}>
            {children}
        </DiceContext.Provider>
    );
};
