import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Dice } from '../Dice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiceContext } from '../../context/DiceContext';

export default function ScreenRollDice() {
    const { lastRollNumber, setLastRollNumber } = useContext(DiceContext);
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
    const [isRolling, setIsRolling] = useState(false);
    const animationDuration = 1500;

    useEffect(() => {
        ClickRollDice();
    }, [lastRollNumber])


    const ClickRollDice = () => {
        setIsRolling(true);
        let numbers: number[] = [];
        for (let i = 0; i < lastRollNumber; i++) {
            numbers.push(Math.floor(Math.random() * 6) + 1);
        }
        setRandomNumbers(numbers);
        setTimeout(() => {
            setIsRolling(false);
        }, animationDuration);
    };

    const ClickDecreaseDiceNumber = () => {
        if (lastRollNumber > 1) {
            setLastRollNumber(lastRollNumber - 1);
        }
    }
    const ClickIncreaseDiceNumber = () => {
        if (lastRollNumber < 16) {
            setLastRollNumber(lastRollNumber + 1);
        }
    }

    const ClearStorage = async () => {
        try {
            await AsyncStorage.clear(); // Borra todo el almacenamiento de AsyncStorage
            console.log('AsyncStorage ha sido limpiado');
        } catch (error) {
            console.error('Error al borrar AsyncStorage:', error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Tirar Dados</Text>
            </View>
            <View style={styles.dicesContainer}>
                {randomNumbers.map((number, index) => (
                    <Dice key={index} value={number} isRolling={isRolling} animationDuration={animationDuration} />
                ))}
            </View>
            <View style={styles.optionsContainer}>
                <Button title="Tirar Dados" onPress={ClickRollDice} />
                <Button title="Borrrar" onPress={ClearStorage} />
                <View style={styles.controls}>
                    <Button title="Quitar Dado" disabled={lastRollNumber <= 1} onPress={ClickDecreaseDiceNumber} />
                    <Button title="Agregar Dado" disabled={lastRollNumber >= 16} onPress={ClickIncreaseDiceNumber} />
                </View>
            </View>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '10%',
    },
    titleContainer: {
        flex: 2,
        minWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
    },
    dicesContainer: {
        flex: 7,
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent:'center',
        gap:10,
        padding:10
    },
    optionsContainer: {
        flex: 2,
        backgroundColor: 'gray',
        gap: 10
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
});