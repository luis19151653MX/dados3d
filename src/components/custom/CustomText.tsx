import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';

interface CustomTextProps extends TextProps {
    // add more props
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
        fontSize: 16,
    },
});

export default CustomText;

