import {PageContext} from "./PageContext.ts";
import {useContext} from "react";

export default function usePageContext() {
    const pageContext = useContext(PageContext);

    if (!pageContext) {
        throw new Error('usePageContext debe ser usado dentro de un PageContextProvider');
    }

    return pageContext;
}