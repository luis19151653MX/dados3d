import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string; 
    buttonStyle?: ViewStyle; 
    textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, buttonStyle, textStyle, ...rest }) => {
    const { colors } = useAppTheme();

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }, buttonStyle]} // Combina estilos
            {...rest}
        >
            <Text style={[styles.text, { color: 'white' }, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};







interface CustomButtonWithChildrenProps extends TouchableOpacityProps {
    buttonStyle?: ViewStyle; 
}

const CustomButtonWithChildren: React.FC<CustomButtonWithChildrenProps> = ({ children, buttonStyle, ...rest }) => {
    const { colors } = useAppTheme();

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }, buttonStyle]} 
            {...rest}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export {CustomButton,CustomButtonWithChildren};
