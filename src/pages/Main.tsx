import {Box, Container, Fade} from "@mui/material";
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

                <Box>
                    <Fade key={page.name} in={true} timeout={500}>
                        <Box>
                            <Content />
                        </Box>
                    </Fade>
                </Box>

                <BottomNavBar index={AllPages.indexOf(page)} onClick={(index) => setPage(AllPages[index])} />
            </Box>
        </Container>
    );
}