import {Box, CircularProgress, type SxProps} from "@mui/material";

interface LoadingComponentProps {
    sx?: SxProps;
}

export default function LoadingComponent({sx}: LoadingComponentProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...sx }}>
            <CircularProgress />
        </Box>
    );
}