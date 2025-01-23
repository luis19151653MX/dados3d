import { I18nextProvider } from "react-i18next";
import i18n from "../configuration/i18n";
import { ConfigurationProvider } from "../context/ConfigurationContext";
import { DiceProvider } from "../context/DiceContext";
import ScreenRollDice from "./ScreenRollDice/ScreenRollDice";

export default function Main(): JSX.Element {
    return (
        <ConfigurationProvider>
            <I18nextProvider i18n={i18n}>
                <DiceProvider>
                    <ScreenRollDice />
                </DiceProvider>
            </I18nextProvider>
        </ConfigurationProvider>
    );
}