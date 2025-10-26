import {Box, Container, Fade} from "@mui/material";
import BottomNavBar from "../components/BottomAppBar.tsx";
import {type JSX, useEffect} from "react";
import {AllPages} from "./AllPages.tsx";
import usePageContext from "../hooks/usePageContext.tsx";
import {TopAppBar} from "../components/TopAppBar.tsx";
import {useLocation} from "react-router-dom";

export default function Main() {
    const { page, setPage } = usePageContext();
    const Content: () => JSX.Element = page.Element;

    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null; // This component doesn't render anything
    }

    return (
        <Container maxWidth={false} disableGutters>
            <Box>
                <TopAppBar />

                <Box>
                    <Fade key={page.name} in={true} timeout={200}>
                        <Box>
                            <ScrollToTop />
                            <Content />
                        </Box>
                    </Fade>
                </Box>

                <BottomNavBar index={AllPages.indexOf(page)} onClick={(index) => setPage(AllPages[index])} />
            </Box>
        </Container>
    );
}