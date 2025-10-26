import {type ReactNode, useState} from "react";
import {CssBaseline, type Theme, ThemeProvider, Box, Fade} from "@mui/material";
import {darkTheme} from "./DarkTheme.ts";
import {lightTheme} from "./LightTheme.ts";
import {ThemeContext} from "./ThemeContext.ts";

export function ThemeContextProvider({children}: {children: ReactNode}) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    const theme: Theme = isDarkMode ? darkTheme : lightTheme
    const themeIndex: number = isDarkMode ? 1 : 0;
    return (
        <ThemeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <Box>
                    <Fade key={themeIndex} in={true} timeout={25}>
                        <Box>
                            {children}
                        </Box>
                    </Fade>
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}