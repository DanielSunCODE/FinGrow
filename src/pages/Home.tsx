import {
    Box,
    Button,
    Card,
    CardContent,
    LinearProgress,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';
import {ShowChart} from '@mui/icons-material';
import {type MouseEvent, useState} from 'react';
import usePageContext from "../hooks/usePageContext.tsx";
import {AllPages} from "./AllPages.tsx";
import {LineChart, type HighlightScope} from "@mui/x-charts";

type PredictionPeriod = 'today' | '1month' | '3month';
export default function Home () {
    const { setPage, setNavBarTitle } = usePageContext();
    setNavBarTitle('Home');

    const [predictionPeriod, setPredictionPeriod] = useState<PredictionPeriod>('1month');

    const handlePredictionPeriodChange = (
        _event: React.MouseEvent<HTMLElement>,
        newPeriod: PredictionPeriod | null
    ) => {
        if (newPeriod !== null) {
            setPredictionPeriod(newPeriod);
        }
    };

    const handleNavigateToActions = () => {
        setPage(AllPages[1]);
    };

    const handleNavigateToGoals = () => {
        // Empty function
    };

    const handleContribute = (event: MouseEvent) => {
        event.stopPropagation();
        // Empty function
    };

    return (
        <Box sx={{ mb: 12 }}>
            <Stack
                direction={'column'}
                sx={{
                    m: 2,
                    p: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                }}
            >
                <Stack spacing={2} sx={{mb: 2}}>
                    <Typography variant={'body1'} color={'text.disabled'}>
                        Current Balance
                    </Typography>

                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant={'h4'} color={'text.primary'} fontWeight={500}>
                            $2,480.50
                        </Typography>

                        <Typography variant={'body1'} color={'success'} fontWeight={300}>
                            +$50 this week
                        </Typography>
                    </Stack>
                </Stack>


            </Stack>

            {/* Prediction Period Toggle */}
            <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="h6" fontWeight={500} sx={{ mb: 1 }}>Your forecast</Typography>

                <ToggleButtonGroup
                    value={predictionPeriod}
                    exclusive
                    onChange={handlePredictionPeriodChange}
                    sx={{
                        width: '100%',
                        height: 40,
                        backgroundColor: 'action.hover',
                        borderRadius: 2,
                        p: 0.5,
                        '& .MuiToggleButton-root': {
                            flex: 1,
                            border: 'none',
                            borderRadius: 1.5,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                backgroundColor: 'background.default',
                                color: 'text.primary',
                                boxShadow: 1,
                            }
                        }
                    }}
                >
                    <ToggleButton value="1month">
                        <Typography variant="body2" color="text.secondary">1 Month</Typography>
                    </ToggleButton>
                    <ToggleButton value="3month">
                        <Typography variant="body2" color="text.secondary">3 Months</Typography>
                    </ToggleButton>
                    <ToggleButton value="6month">
                        <Typography variant="body2" color="text.secondary">6 Months</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Graph */}
            <Box sx={{ pr: 2 }}>
                <Box
                    sx={{
                        height: 250,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 14, 16, 18, 20, 22 ], label: 'Days' }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5, 2.8, 5.57, 2.77, 8.57, 1.325, 9],
                                highlightScope: {
                                    highlight: 'series',
                                    fade: 'global',
                                },
                                showMark: false,
                                label: 'Balance'
                            },
                            {
                                data: [3.12, 7.95, 4.01, 3.38, 2.50, 6.71, 1.99, 8.15, 5.43, 12.00, 4.25, 7.30],
                                highlightScope: {
                                    highlight: 'series',
                                    fade: 'global',
                                },
                                showMark: false,
                                label: 'Balance'
                            },
                        ]}
                        grid={{horizontal: true, vertical: true}}
                        hideLegend
                    />
                </Box>
            </Box>

            {/* Graph Actions & Status */}
            <Box sx={{ px: 2, py: 1.5 }}>
                <Stack alignItems="center">
                    <Button
                        variant="contained"
                        onClick={handleNavigateToActions}
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            borderRadius: 2,
                            textTransform: 'none',
                            boxShadow: 0,
                            backgroundColor: 'grey.700',
                            '&:hover': {
                                opacity: 0.95,
                            }
                        }}
                    >
                        <Typography variant={'body1'} color={'white'} fontWeight={600}>
                            Learn how to improve it
                            {/*CAMBIAR ESTO POR UN INSIGHT*/}
                        </Typography>
                    </Button>
                </Stack>
            </Box>

            {/* Goal Card */}
            <Box sx={{ px: 2, pt: 2 }}>
                <Card
                    onClick={handleNavigateToGoals}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: 3,
                        transition: 'box-shadow 0.3s ease',
                        '&:hover': {
                            boxShadow: 4
                        }
                    }}
                >
                    <CardContent sx={{ p: 2, backgroundColor: 'background.default' }}>
                        <Typography variant="h6" fontWeight="bold">
                            Main goal: Trip to Japan
                        </Typography>

                        <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, border: 0 }}>
                            <Typography variant="h5" fontWeight="bold">
                                $1,200{' '}
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                    fontWeight="normal"
                                >
                                    out of $5,000
                                </Typography>
                            </Typography>
                            <Typography variant="body2" fontWeight="medium" color="text.secondary">
                                ETC: Dec 2025
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" fontWeight="medium" color="secondary.main">
                                    24% completed
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                color="success"
                                value={24}
                                sx={{
                                    height: 8,
                                    borderRadius: 2,
                                    backgroundColor: 'action.hover'
                                }}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleContribute}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: 0
                            }}
                        >
                            <Typography variant={'body1'} fontWeight={600}>Check your goal</Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};