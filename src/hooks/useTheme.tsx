import {useContext} from "react";
import {ThemeContext} from '../theme/ThemeContext'

export default function useTheme() {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
    }

    return themeContext;
}