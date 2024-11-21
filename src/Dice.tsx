import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface DiceProps {
    value: number; // El valor del dado a mostrar
    isRolling: boolean; // Indica si el dado está rodando
}

export const Dice: React.FC<DiceProps> = ({ value, isRolling }) => {
    const rotation = useSharedValue(0); // Valor compartido para la rotación

    // Efecto para manejar la animación de rotación
    useEffect(() => {
        if (isRolling) {
            rotation.value = 0; // Reinicia la rotación
            rotation.value = withTiming(360, { duration: 500 }); // Animación de 360 grados en 500ms
        }
    }, [isRolling]);

    // Estilo animado
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    // Función para generar los puntos según el valor del dado
    const renderDots = () => {
        // Map de posiciones de los puntos
        const dotPositions = {
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

        return (dotPositions[value] || []).map((dotStyle, index) => (
            <View key={index} style={[styles.dot, dotStyle]} />
        ));
    };

    return (
        <Animated.View style={[styles.dado, animatedStyle]}>
            <View style={styles.dadoContent}>{renderDots()}</View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    dado: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4, // Para Android
    },
    dadoContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#333',
        borderRadius: 5, // Hace que el punto sea circular
        position: 'absolute',
    },
    // Posiciones de los puntos
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

