import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import { setLanguage, setTheme } from "../../redux/slices/configurationSlice";
import { clearAsyncStorage } from "../../utils/AsyncStorageUtils";
import { useAppTheme } from "../../hooks/useAppTheme";
import CustomText from "../components/custom/CustomText";
import CustomModal from "../components/custom/CustomModal";

interface SettingsModalProps {
    visible: boolean;
    onDismiss: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onDismiss }) => {
    const dispatch = useDispatch();
    const { colors } = useAppTheme();
    const { t } = useTranslation();

    // redux
    const language = useSelector((state: RootState) => state.configuration.language);
    const currentTheme = useSelector((state: RootState) => state.configuration.theme);

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
                    <TouchableOpacity onPress={() => handleChangeLanguage('en')} style={styles.buttonOption}>
                        <Text style={styles.textOption}>EN</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <CustomText style={{ textAlign: 'center' }}>{language.toUpperCase()}</CustomText>
                    </View>
                    <TouchableOpacity onPress={() => handleChangeLanguage('es')} style={styles.buttonOption}>
                        <Text style={styles.textOption}>ES</Text>
                    </TouchableOpacity>
                </View>
                <Divider />
                <Button title={t('ScreenRollDice.buttonRemoveAsync')} onPress={clearAsyncStorage} />
                <Button title="Toggle Theme" onPress={toggleTheme} />
                <Divider />
                <Button title={t('close')} onPress={handleCloseModal} />
            </View>
        </CustomModal>
    );
};

export default SettingsModal;
