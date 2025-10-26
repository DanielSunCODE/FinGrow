import {type ReactNode, useState} from "react";
import {AllPages, type AllPagesType} from "../pages/AllPages.tsx";
import {PageContext} from "./PageContext.ts";

export function PageContextProvider({children}: {children: ReactNode}) {
    const [page, setPage] = useState<AllPagesType>(AllPages[0]);
    const [navbarTitle, setNavBarTitle] = useState<string | null>(null);

    return (
        <PageContext.Provider value={{page, setPage, navbarTitle, setNavBarTitle}}>
            {children}
        </PageContext.Provider>
    );
}