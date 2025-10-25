import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";
import BottomNavBar from "../components/BottomAppBar.tsx";
import {useState} from "react";

export default function Main() {
    const [page, setPage] = useState(0);

    return (
        <Container maxWidth={false} disableGutters>
            <Outlet />
            <BottomNavBar page={page} setPage={setPage} />
        </Container>
    );
}