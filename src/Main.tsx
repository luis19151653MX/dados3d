import { DiceProvider } from "../context/DiceContext";
import ScreenRollDice from "./ScreenRollDice/ScreenRollDice";

export default function Main(): JSX.Element {
    return (
        <DiceProvider>
            <ScreenRollDice />
        </DiceProvider>
    );
}