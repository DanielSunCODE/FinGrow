import {type SyntheticEvent, useState} from 'react';
import {
    Alert,
    Avatar,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import {
    Check,
    ChevronRight,
    Dashboard,
    DonutSmall,
    EmojiEvents,
    Recommend,
    TaskAlt,
    TrackChanges,
    TrendingUp
} from '@mui/icons-material';
import type {Goal} from '../types/Goal';
import {useParams} from 'react-router-dom';
import usePageContext from "../hooks/usePageContext.tsx";
import useTheme from "../hooks/useTheme.tsx";

export default function GoalTracking () {
    const {id} = useParams();
    const { isDarkMode } = useTheme();


    const borderColor: string = isDarkMode ? "1px solid rgba(0,0,0,0.1)" : "1px solid #e0e0e0";

    const [goals, setGoals] = useState<Goal[]>([
        {
            id: '1',
            name: 'Japan Trip',
            type: 'Travel',
            currentAmount: 1500,
            targetAmount: 5000,
            progress: 30,
            eta: 'Dec 2024',
            isCompleted: false
        },
        {
            id: '2',
            name: 'New Car Down Payment',
            type: 'Savings',
            currentAmount: 8000,
            targetAmount: 10000,
            progress: 80,
            eta: 'May 2025',
            isCompleted: false
        },
        {
            id: '3',
            name: 'Emergency Fund',
            type: 'Savings',
            currentAmount: 12000,
            targetAmount: 12000,
            progress: 100,
            eta: 'Completed',
            isCompleted: true
        }
    ]);

    const goal: Goal = goals.find(g => g.id === id) ?? goals[0];

    const { setNavBarTitle } = usePageContext();
    setNavBarTitle(goal.name);


    const [bottomNavValue, setBottomNavValue] = useState(2); // Goals is active

    const handleBackClick = () => {
        // Empty function
    };

    const handleMoreClick = () => {
        // Empty function
    };

    const handleBottomNavChange = (_event: SyntheticEvent, newValue: number) => {
        setBottomNavValue(newValue);
        // Empty function
    };

    const handleActionClick = (actionType: string) => {
        // Empty function
    };

    const remainingAmount = goal.targetAmount - goal.currentAmount;

    // Calculate if ahead of schedule (mock logic)
    const isAheadOfSchedule = goal.progress > 60;

    const actionSteps = [
        {
            id: 'recurring-transfer',
            icon: <EmojiEvents color="primary" />,
            title: 'Set up a recurring transfer',
            description: 'Automate your savings to reach your goal faster.',
            completed: false
        },
        {
            id: 'review-subscriptions',
            icon: <EmojiEvents color="primary" />,
            title: 'Review subscription spending',
            description: 'Find extra cash by canceling unused services.',
            completed: false
        },
        {
            id: 'round-up',
            icon: <TaskAlt color="success" />,
            title: 'Round up purchases',
            description: 'You added $3.50 this week!',
            completed: true
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, pb: 14, backgroundColor:'background.default'}}>
                {/* Goal Progress Visualizer */}
                <Box sx={{ p: 2, pt: 4, textAlign: 'center' }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress
                            variant="determinate"
                            value={goal.progress}
                            size={192}
                            thickness={4}
                            sx={{
                                color: goal.progress === 100 ? 'success.main' : 'primary.main',
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                }
                            }}
                            enableTrackSlot
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h3" sx={{color: goal.progress === 100 ? 'success.main' : 'primary.main', fontWeight: 600}}>
                                {goal.progress}%
                            </Typography>
                            <Typography variant="body2" color="text.disabled">
                                Complete
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body1" color="grey.800" sx={{ mt: 2 }}>
                        You've saved{' '}
                        <Typography component="span" color="grey.800" fontWeight="bold">
                            ${goal.currentAmount.toLocaleString()}
                        </Typography>
                        {' '}of your{' '}
                        <Typography component="span" color="grey.800" fontWeight="bold">
                            ${goal.targetAmount.toLocaleString()}
                        </Typography>
                        {' '}goal.
                    </Typography>
                </Box>

                {/* Metric Cards */}
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={1.5}>
                        <Grid size={6}>
                            <Card sx={{ borderRadius: 3,  boxShadow: "none", backgroundColor: 'background.default', border: borderColor }}>
                                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                        Amount Saved
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: '-1px', mt: 0.5, color: 'text.primary' }}>
                                        ${goal.currentAmount.toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={6}>
                            <Card sx={{ borderRadius: 3, backgroundColor: 'background.default', border: borderColor, boxShadow: "none" }}>
                                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                        Remaining
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: '-1px', mt: 0.5, color: 'text.primary'}}>
                                        ${remainingAmount.toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={12}>
                            <Card sx={{ borderRadius: 3, backgroundColor: 'background.default', border: borderColor, boxShadow: "none" }}>
                                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                        Projected Date
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: '-1px', mt: 0.5, color: 'text.primary'}}>
                                        {goal.eta}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Motivational Banner */}
                {isAheadOfSchedule && (
                    <Box sx={{ p: 2, pt: 1 }}>
                        <Alert
                            icon={<TrendingUp sx={{ color: 'text.primary', fontSize: '2rem' }} />}
                            severity="info"
                            sx={{
                                backgroundColor: '#88bafb31',
                                color: 'inherit',
                                borderRadius: 3,
                                '& .MuiAlert-icon': {
                                    color: 'secondary',
                                    margin: 'auto 12px auto 0',
                                }
                            }}
                        >
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5, color: 'primary.main' }}>
                                You're ahead of schedule!
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Your consistent contributions have put you on the fast track.
                            </Typography>
                        </Alert>
                    </Box>
                )}

                {/* Section Header */}
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ px: 2, pb: 1, pt: 2, letterSpacing: '-0.5px' }}
                >
                    Your Next Steps
                </Typography>

                {/* Actionable Steps List */}
                <Box sx={{ px: 2 }}>
                    <Stack spacing={1.2}>
                        {actionSteps.map((step) => (
                            <Card
                                key={step.id}
                                sx={{
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    boxShadow: 0,
                                    backgroundColor: 'background.default',
                                    border: borderColor,
                                    opacity: step.completed ? 0.6 : 1,
                                    '&:hover': {
                                        boxShadow: 2
                                    }
                                }}
                                onClick={() => handleActionClick(step.id)}
                            >
                                <CardContent sx={{ pt: 2}}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                                        <Avatar
                                            sx={{
                                                backgroundColor: step.completed ? 'success.main' : 'primary.main',
                                                color: step.completed ? 'success.contrastText' : 'primary.contrastText',
                                                width: 48,
                                                height: 48
                                            }}
                                        >
                                            {step.completed ? <TaskAlt /> : <TrackChanges />}
                                        </Avatar>

                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                sx={{
                                                    textDecoration: step.completed ? 'line-through' : 'none',
                                                    mb: 0.5
                                                }}
                                            >
                                                {step.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {step.description}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                fontSize: 22,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                p: 0.4,
                                                backgroundColor: step.completed ? 'success.main' : 'transparent',
                                                border: step.completed ? 'none' : 1,
                                                borderColor: 'divider',
                                                color: step.completed ? 'success.contrastText' : 'text.secondary'
                                            }}
                                        >
                                            {step.completed ? <Check fontSize={'inherit'} /> : <ChevronRight fontSize={'inherit'} color={'disabled'}/>}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            </Box>

            {/* Bottom Navigation */}
            <BottomNavigation
                value={bottomNavValue}
                onChange={handleBottomNavChange}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderTop: 1,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    backdropFilter: 'blur(8px)'
                }}
            >
                <BottomNavigationAction label="Home" icon={<Dashboard />} />
                <BottomNavigationAction label="Tips" icon={<Recommend />} />
                <BottomNavigationAction label="Goals" icon={<DonutSmall />} />
            </BottomNavigation>
        </Box>
    );
};