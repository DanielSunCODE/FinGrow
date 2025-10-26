import type {JSX} from "react";
import Home from "./Home.tsx";
import Recommendations from "./Recommendations.tsx";
import GoalsOverview from "./GoalsOverview.tsx";

export interface AllPagesType {
    name: 'Home' | 'Recomendaciones' | 'Goals';
    Element: () => JSX.Element;
}

export const AllPages: AllPagesType[] = [
    {
        name: 'Home',
        Element: Home
    },
    {
        name: 'Recomendaciones',
        Element: Recommendations
    },
    {
        name: 'Goals',
        Element: GoalsOverview
    }
] as const;