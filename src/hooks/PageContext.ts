import type {AllPagesType} from "../pages/AllPages.tsx";
import {createContext} from "react";

interface PageContextProps {
    page: AllPagesType;
    setPage: (page: AllPagesType) => void;
}

export const PageContext = createContext<PageContextProps | null>(null);