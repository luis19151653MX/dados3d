import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootState } from "../../redux/store";
import { setLanguage, setTheme } from "../../redux/slices/configurationSlice";
import { clearAsyncStorage } from "../../utils/AsyncStorageUtils";
import { useAppTheme } from "../../hooks/useAppTheme";
import CustomText from "../components/custom/CustomText";
import CustomModal from "../components/custom/CustomModal";
import { useState } from "react";
import CustomActionSheet from "../components/custom/CustomActionSheet";
import { CustomButton, CustomButtonWithChildren } from "../components/custom/CustomButton";

interface SettingsModalProps {
    visible: boolean;
    onDismiss: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onDismiss }) => {
    const dispatch = useDispatch();
    const { colors, iconSize } = useAppTheme();
    const { t } = useTranslation();

    // redux
    const language = useSelector((state: RootState) => state.configuration.language);
    const currentTheme = useSelector((state: RootState) => state.configuration.theme);

    const [isVisibleActionSheetLanguage, setIsVisibleActionsheetLanguage] = useState(false);

    const closeActionSheetLanguage = () => {
        setIsVisibleActionsheetLanguage(false);
    };

    const openActionSheetLanguage = () => {
        setIsVisibleActionsheetLanguage(true);
    };

    const handleChangeLanguage = (lang: 'en' | 'es') => {
        dispatch(setLanguage(lang));
    };

    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
    };

    const handleCloseModal = () => {
        onDismiss();
    };

    const styles = StyleSheet.create({
        title: {
            fontSize: 30,
            marginBottom: 20,
            color: colors.text,
        },
        optionsContainer: {
            padding: 10,
            width: '100%',
            gap: 10
        },
        buttonOption: {
            flex: 1,
            backgroundColor: colors.primary,
            padding: '5%',
            alignItems: 'center',
            borderRadius: 5
        },
        textOption: {
            color: 'white'
        }
    });

    return (
        <CustomModal visible={visible} onRequestClose={handleCloseModal} >
            <Text style={styles.title}>{t('ScreenSettings.title')}</Text>
            <View style={styles.optionsContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <CustomText>{t('ScreenSettings.labelLanguage')}</CustomText>
                    </View>
                    <View style={{ flex: 2 }}>
                        <CustomButton title={language.toLocaleUpperCase()} onPress={openActionSheetLanguage} />
                    </View>
                </View>
                <Divider />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <CustomText>{t('ScreenSettings.labelDeleteData')}</CustomText>
                    </View>
                    <View style={{ flex: 2 }}>
                        <CustomButton title={t('ScreenSettings.buttonDeleteData')} onPress={clearAsyncStorage} />
                    </View>
                </View>
                <Divider />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <CustomText>{t('ScreenSettings.labelTheme')}</CustomText>
                    </View>
                    <View style={{ flex: 2 }}>
                        <CustomButtonWithChildren onPress={toggleTheme}>
                            {
                                currentTheme === 'light' ? <MaterialIcons name="light-mode" color="white" size={iconSize}/> : <MaterialIcons name="dark-mode" color="white" size={iconSize}/>
                            }
                        </CustomButtonWithChildren>
                    </View>
                </View>
                <View></View>
                <View >
                    <CustomButton title={t('closeButton')} onPress={handleCloseModal} buttonStyle={{ backgroundColor: colors.disabled }} />
                </View>
            </View>
            <CustomActionSheet isVisible={isVisibleActionSheetLanguage} onClose={closeActionSheetLanguage}>
                <TouchableOpacity onPress={() => handleChangeLanguage('en')} style={styles.buttonOption}>
                    <Text style={styles.textOption}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChangeLanguage('es')} style={styles.buttonOption}>
                    <Text style={styles.textOption}>ES</Text>
                </TouchableOpacity>
            </CustomActionSheet>
        </CustomModal>
    );
};

export default SettingsModal;
