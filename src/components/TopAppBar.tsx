import {AppBar, Avatar, Box, IconButton, Toolbar, Typography,} from '@mui/material';
import usePageContext from "../hooks/usePageContext.tsx";
import {AllPages} from "../pages/AllPages.tsx";
import {ArrowBack} from "@mui/icons-material";
import useTheme from "../hooks/useTheme.tsx";
import {Contrast} from "@mui/icons-material";

export const TopAppBar = () => {
    const { page, setPage, navbarTitle } = usePageContext();
    const renderHomeBar: boolean = page.name == AllPages[0].name;
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <Box>
            {
                renderHomeBar && (
                    <Box sx={{ p: 2, pb: 1 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'between',
                                height: 48,
                                mb: 1,
                            }}
                        >
                            <Avatar
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1jdGY-YhbQ2VrrveiiD0z1NFwWFnXFrk-mvk9Swc_ktbhK8wbS0s3btYL8McFT58hzDmV-Bacrlwt_-iXewf0UYaC-zo4hmlDk-TV4jh8KRSs5Lq6Dpp-wJoYM3BlrpQOuzZQgl4Os3G2TMjXignHg7FTsf5hwFm6sr8sYJem6h5u_pom7ngWcXFIsDQ3dB5gWyJy7NEVgJQtjRpcjG6HdlR_HiW1b98JgKwgzDFZuvZDwwL9Fo6dtK6wIfdUKrKVkeDMtrILbUFX"
                                alt="User profile picture of Alex"
                                sx={{ width: 40, height: 40 }}
                            />
                            <Box sx={{ flex: 1 }} />
                            <IconButton onClick={()=> toggleDarkMode()} sx={{ p: 0 }}>
                                <Contrast />
                            </IconButton>
                        </Box>

                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 500,
                                fontSize: '28px',
                                lineHeight: 1.2,
                            }}
                        >
                            Good morning, Alex
                        </Typography>
                    </Box>
                )
            }

            {
                !renderHomeBar && (
                    <AppBar
                        position="sticky"
                        elevation={0}
                        sx={{
                            backgroundColor: 'background.default',
                            color: 'text.primary',
                            backdropFilter: 'blur(8px)',
                            borderBottom: 0,
                            borderColor: 'divider'
                        }}
                    >
                        <Toolbar sx={{ justifyContent: 'space-between', pt: 1 }}>
                            <IconButton onClick={() => setPage(AllPages[0])} color="inherit">
                                <ArrowBack />
                            </IconButton>
                            <Typography variant={"body1"} fontWeight="600" sx={{ flexGrow: 1, textAlign: 'center' }}>
                                {navbarTitle}
                            </Typography>
                            <Box sx={{ width: 40 }} />
                        </Toolbar>
                    </AppBar>
                )
            }
        </Box>
    );
};