import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Box, Paper,} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    DonutSmall as DonutSmallIcon,
    Recommend as RecommendIcon,
} from '@mui/icons-material';

interface BottomNavigationProps {
    index: number;
    onClick: (page: number) => void;
}

export default function BottomNavBar({index, onClick}: BottomNavigationProps) {
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
                    value={index}
                    onChange={(_event, value: number ) => onClick(value)}
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
                        label={"Home"}
                        icon={<DashboardIcon />}
                        onClick={() => onClick(0)}
                        sx={{
                            '& .MuiBottomNavigationAction-label': {
                                paddingTop: '4px',
                            }
                        }}
                        showLabel
                    />
                    <BottomNavigationAction
                        label={"Recomendaciones"}
                        icon={<RecommendIcon />}
                        onClick={() => onClick(1)}
                        sx={{
                            '& .MuiBottomNavigationAction-label': {
                                paddingTop: '4px',
                            }
                        }}
                        showLabel
                    />
                    <BottomNavigationAction
                        label={"Goals"}
                        icon={<DonutSmallIcon />}
                        onClick={() => onClick(2)}
                        sx={{
                            '& .MuiBottomNavigationAction-label': {
                                paddingTop: '4px',
                            }
                        }}
                        showLabel
                    />
                </MuiBottomNavigation>
            </Box>
        </Paper>
    );
};