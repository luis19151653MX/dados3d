import React from 'react';
import { Modal, View, StyleSheet, ModalProps } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';

interface CustomModalProps extends ModalProps {
  modalBackgroundStyle?: object; // Estilo para el fondo del modal
  modalContentStyle?: object; // Estilo para el contenido del modal
  animation?:'fade'|'slide';
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onRequestClose,
  modalBackgroundStyle,
  modalContentStyle,
  children,
  animation='fade',
  ...rest
}) => {
    const {colors}=useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        animationType={animation}
        transparent={true}
        onRequestClose={onRequestClose}
        {...rest}
      >
        <View style={[styles.modalBackground, modalBackgroundStyle]}>
          <View style={[styles.modalContent, modalContentStyle,{backgroundColor:colors.modal}]}>
            {children}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: '#fff', // Fondo del modal
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default CustomModal;
