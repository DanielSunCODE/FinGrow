import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Box, Paper,} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    DonutSmall as DonutSmallIcon,
    Recommend as RecommendIcon,
} from '@mui/icons-material';

interface BottomNavigationProps {
    page: number;
    setPage: (page: number) => void;
}

export default function BottomNavBar({page, setPage}: BottomNavigationProps) {
    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                borderTop: 1,
                borderColor: 'divider',
                backgroundColor: 'background.light',
                backdropFilter: 'blur(8px)',
            }}
            elevation={0}
        >
            <Box sx={{ maxWidth: 'sm', mx: 'auto' }}>
                <MuiBottomNavigation
                    value={page}
                    onChange={(_event, value: number ) => setPage(value)}
                    sx={{
                        height: 64,
                        bgcolor: 'transparent',
                        '& .MuiBottomNavigationAction-root': {
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                            '& .MuiBottomNavigationAction-label': {
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                '&.Mui-selected': {
                                    fontSize: '0.75rem',
                                },
                            },
                        },
                    }}
                >
                    <BottomNavigationAction
                        label={"Inicio"}
                        icon={<DashboardIcon />}
                        onClick={() => setPage(0)}
                        showLabel
                    />
                    <BottomNavigationAction
                        label={"Recomendaciones"}
                        icon={<RecommendIcon />}
                        onClick={() => setPage(1)}
                        showLabel
                    />
                    <BottomNavigationAction
                        label={"Metas"}
                        icon={<DonutSmallIcon />}
                        onClick={() => setPage(2)}
                        showLabel
                    />
                </MuiBottomNavigation>
            </Box>
        </Paper>
    );
};