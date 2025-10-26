import {Box, Container} from "@mui/material";
import BottomNavBar from "../components/BottomAppBar.tsx";
import {type JSX} from "react";
import {AllPages} from "./AllPages.tsx";
import usePageContext from "../hooks/usePageContext.tsx";
import {TopAppBar} from "../components/TopAppBar.tsx";

export default function Main() {
    const { page, setPage } = usePageContext();
    const Content: () => JSX.Element = page.Element;

    return (
        <Container maxWidth={false} disableGutters>
            <Box>
                <TopAppBar />
                <Content />
                <BottomNavBar index={AllPages.indexOf(page)} onClick={(index) => setPage(AllPages[index])} />
            </Box>
        </Container>
    );
}