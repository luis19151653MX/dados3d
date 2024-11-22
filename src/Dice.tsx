import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, Text } from 'react-native';
import Animated,{useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DiceProps {
    value: number; // dice value
    isRolling: boolean; // flag dice is rolling?
    animationDuration:number; //time animation
}

export const Dice: React.FC<DiceProps> = ({ value, isRolling, animationDuration }) => {
    const rotation = useSharedValue<number>(0);
    const rotationX = useSharedValue<number>(0);
    const rotationY = useSharedValue<number>(0);

    const styles = StyleSheet.create({
        dice: {
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
        },
        diceIcon: {
            display: isRolling ? 'flex' : 'none',
            color: '#00664d',
        },
        diceContent: {
            display: isRolling ? 'none' : 'flex',
            width: '100%',
            height: '100%',
            position: 'relative',
            
        },
        dot: {
            width: 10,
            height: 10,
            backgroundColor: '#333',
            borderRadius: 5,
            position: 'absolute',
        },
        // dot positions
        centerDot: {
            top: '45%',
            left: '45%',
        },
        topLeftDot: {
            top: '20%',
            left: '20%',
        },
        topRightDot: {
            top: '20%',
            right: '20%',
        },
        bottomLeftDot: {
            bottom: '20%',
            left: '20%',
        },
        bottomRightDot: {
            bottom: '20%',
            right: '20%',
        },
        centerLeftDot: {
            top: '45%',
            left: '20%',
        },
        centerRightDot: {
            top: '45%',
            right: '20%',
        },
    });

    useEffect(() => {
        if (isRolling) {
            rotation.value = withTiming(360, { duration: animationDuration / 2 }, () => {
                // La second halt time return state to 0
                rotation.value = withTiming(0, { duration: animationDuration / 2 });
            });

            rotationX.value = withTiming(360, { duration: animationDuration / 2 }, () => {
                rotationX.value = withTiming(0, { duration: animationDuration / 2 });
            });

            rotationY.value = withTiming(360, { duration: animationDuration / 2 }, () => {
                rotationY.value = withTiming(0, { duration: animationDuration / 2 });
            });
        }
    }, [isRolling]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: `${rotation.value}deg` },
            { rotateX: `${rotationX.value}deg` },
            { rotateY: `${rotationY.value}deg` },
        ],
    }));

    // Función para generar los puntos según el valor del dice
    const renderDots = () => {
        // Map de posiciones de los puntos
        const dotPositions: { [key: number]: StyleProp<ViewStyle>[] } = {
            1: [styles.centerDot],
            2: [styles.topLeftDot, styles.bottomRightDot],
            3: [styles.topLeftDot, styles.centerDot, styles.bottomRightDot],
            4: [styles.topLeftDot, styles.topRightDot, styles.bottomLeftDot, styles.bottomRightDot],
            5: [styles.topLeftDot, styles.topRightDot, styles.bottomLeftDot, styles.bottomRightDot, styles.centerDot],
            6: [
                styles.topLeftDot,
                styles.topRightDot,
                styles.centerLeftDot,
                styles.centerRightDot,
                styles.bottomLeftDot,
                styles.bottomRightDot,
            ],
        };
        return dotPositions[value]?.map((dotStyle: StyleProp<ViewStyle>, index: number) => (
            <View key={index} style={[styles.dot, dotStyle]} />
        ));
    };

    return (
        <Animated.View style={[styles.dice, animatedStyle]}>
            <Ionicons name='dice-sharp'  style={styles.diceIcon} size={40}/>
            <View style={styles.diceContent}>{renderDots()}</View>
        </Animated.View>
    );
};


