import type {JSX} from "react";
import Home from "./Home.tsx";
import Recommendations from "./Recommendations.tsx";
import GoalsOverview from "./GoalsOverview.tsx";

interface AllPagesProps {
    name: 'Inicio' | 'Recomendaciones' | 'Metas';
    Element: () => JSX.Element;
}

export const AllPages: AllPagesProps[] = [
    {
        name: 'Inicio',
        Element: Home
    },
    {
        name: 'Recomendaciones',
        Element: Recommendations
    },
    {
        name: 'Metas',
        Element: GoalsOverview
    }
];