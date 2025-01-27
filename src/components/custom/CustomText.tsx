import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../hooks/useApptheme';

interface CustomTextProps extends TextProps {
    // Puedes agregar más props si es necesario
}

const CustomText: React.FC<CustomTextProps> = ({ style, children, ...rest }) => {
    const { colors } = useAppTheme();

    return (
        <Text style={[styles.text, { color: colors.text }, style]} {...rest}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16, // Tamaño de texto por defecto
    },
});

export default CustomText;

