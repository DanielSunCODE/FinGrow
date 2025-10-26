import {Box, Stack, Container} from "@mui/material";
import BottomNavBar from "../components/BottomAppBar.tsx";
import {useState} from "react";
import {type AllPagesType, AllPages} from "./AllPages.tsx";

export default function Main() {
    const [page, setPage] = useState<AllPagesType>(AllPages[0]);
    const Content = page.Element;

    return (
        <Container maxWidth={false} disableGutters>
            <Box>
                <Content />

                <BottomNavBar index={AllPages.indexOf(page)} onClick={(index) => setPage(AllPages[index])} />
            </Box>
        </Container>
    );
}