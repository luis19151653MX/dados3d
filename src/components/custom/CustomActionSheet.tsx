import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import { useAppTheme } from "../../../hooks/useAppTheme";

interface CustomActionSheetProps {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const CustomActionSheet: React.FC<CustomActionSheetProps> = ({ children, isVisible, onClose }) => {
    const [slideAnim] = useState(new Animated.Value(300)); // Animación inicial (oculto)
    const { colors } = useAppTheme();

    React.useEffect(() => {
        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: 0, // Aparece desde abajo
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 300, // Desaparece hacia abajo
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                onClose(); // Llamar a la función cuando termine la animación
            });
        }
    }, [isVisible]);

    return (
        <Modal transparent visible={isVisible} animationType="fade">
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
            <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }], backgroundColor:colors.modal }]}>
                {children}
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 10, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export default CustomActionSheet;
