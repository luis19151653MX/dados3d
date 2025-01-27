import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDiceContext } from '../../context/DiceContext';
import { useAppTheme } from '../../hooks/useAppTheme';
import SettingsModal from './ModalSettings';
import { Dice } from '../components/common/Dice';


export default function ScreenRollDice() {
    const { t } = useTranslation();
    const { colors } = useAppTheme(); 
    const { lastRollNumber, setLastRollNumber } = useDiceContext();
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
    const [isRolling, setIsRolling] = useState(false);
    const animationDuration = 1500;
    const [settingsModalVisible,setSettingsModalVisible]=useState(true);

    const handleOpenModal = () => setSettingsModalVisible(true);
    const handleCloseModal = () => setSettingsModalVisible(false);

    useEffect(() => {
        ClickRollDice();
    }, [lastRollNumber]);

    const ClickRollDice = () => {
        setIsRolling(true);
        const numbers: number[] = [];
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
    };

    const ClickIncreaseDiceNumber = () => {
        if (lastRollNumber < 16) {
            setLastRollNumber(lastRollNumber + 1);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: '10%',
            backgroundColor:colors.background
        },
        titleContainer: {
            flex: 2,
            minWidth: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 30,
            marginBottom: 20,
            color:colors.text
        },
        dicesContainer: {
            flex: 7,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'center',
            gap: 10,
            padding: 10,
        },
        optionsContainer: {
            flex: 2,
            padding: 10,
            width: '100%',
            backgroundColor: 'gray',
            gap: 10,
        },
        controls: {
            flexDirection: 'row',
            width: '100%',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{t('appName')}</Text>
                <TouchableOpacity onPress={handleOpenModal}>
                    <MaterialIcons name="settings" size={30} color={colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.dicesContainer}>
                {randomNumbers.map((number, index) => (
                    <Dice key={index} value={number} isRolling={isRolling} animationDuration={animationDuration} />
                ))}
            </View>
            <View style={styles.optionsContainer}>
                <Button title={t('ScreenRollDice.buttonRollDices')} onPress={ClickRollDice} />
                <View style={styles.controls}>
                    <Button title="-" disabled={lastRollNumber <= 1} onPress={ClickDecreaseDiceNumber} />
                    <Button title="+" disabled={lastRollNumber >= 16} onPress={ClickIncreaseDiceNumber} />
                </View>
            </View>
            <SettingsModal visible={settingsModalVisible} onDismiss={handleCloseModal}/>
        </View>
    );
}

