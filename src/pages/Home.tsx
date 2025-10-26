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
import {type MouseEvent, useState} from 'react';
import usePageContext from "../hooks/usePageContext.tsx";
import {AllPages} from "./AllPages.tsx";
import {LineChart} from "@mui/x-charts";
import useAccounts from "../hooks/useAccounts.ts";
import LoadingComponent from "../components/LoadingComponent.tsx";
import useGoals from "../hooks/useGoals.tsx";
import {useNavigate} from "react-router-dom";
import {formatNumberWithComma} from "../utils/numberFormatConvert.ts";
import useDataSeries from "../hooks/useDataSeries.ts";

type PredictionPeriod = 'today' | '1month' | '3month';
export default function Home () {
    const { setPage, setNavBarTitle } = usePageContext();
    const navigate = useNavigate();
    setNavBarTitle('Home');

    const {data: account, isLoading: isAccountLoading} = useAccounts();
    const {data: goals, isLoading: isGoalsLoading} = useGoals(account?.id ?? 1); // Sorry, mom. There is only 2 hours left. I cannot take the time to make properly.

    const {data: dataSeries, isLoading: isDataSeriesLoading} = useDataSeries(account?.id ?? 1);

    const [predictionPeriod, setPredictionPeriod] = useState<PredictionPeriod>('1month');

    const handlePredictionPeriodChange = (
        _event: MouseEvent<HTMLElement>,
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
        navigate(`/goals/${0}`);
        setPage(AllPages[3])
    };

    const handleContribute = (event: MouseEvent) => {
        event.stopPropagation();
    };

    if (isAccountLoading || isGoalsLoading || isDataSeriesLoading) return <LoadingComponent sx={{ height: 100 }} />

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
                            ${formatNumberWithComma(account?.balance ?? 0)}
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
                        xAxis={[{
                            data: dataSeries?.dates.map(date => new Date(date).getTime()) ?? [],
                            label: 'Days',
                            scaleType: 'time',
                        }]}
                        series={[
                            {
                                data: dataSeries?.scenarios.baseline ?? [],
                                highlightScope: {
                                    highlight: 'series',
                                    fade: 'global',
                                },
                                showMark: false,
                                label: 'Your standard balance forecast'
                            },
                            {
                                data: dataSeries?.scenarios.combined ?? [],
                                highlightScope: {
                                    highlight: 'series',
                                    fade: 'global',
                                },
                                showMark: false,
                                label: 'Capital One Inversioning Boost'
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
                            Main goal: {goals?.at(0)?.Description ?? 'No goal set'}
                        </Typography>

                        <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, border: 0 }}>
                            <Typography variant="h5" fontWeight="bold">
                                ${goals?.at(0)?.CurrentAmount} {' '}
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                    fontWeight="normal"
                                >
                                    out of ${formatNumberWithComma(goals?.at(0)?.TargetAmount ?? 0)}
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