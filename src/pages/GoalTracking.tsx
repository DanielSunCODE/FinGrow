import {type SyntheticEvent, useState} from 'react';
import {
    Alert,
    AppBar,
    Avatar,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    IconButton,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {
    AccountBalance,
    ArrowBack,
    Check,
    ChevronRight,
    Dashboard,
    DonutSmall,
    MoreVert,
    Recommend,
    Subscriptions,
    TaskAlt,
    TrendingUp
} from '@mui/icons-material';
import type {Goal} from '../types/Goal';
import {useParams} from 'react-router-dom';

export default function GoalTracking () {
    const {id} = useParams();

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
            icon: <AccountBalance color="primary" />,
            title: 'Set up a recurring transfer',
            description: 'Automate your savings to reach your goal faster.',
            completed: false
        },
        {
            id: 'review-subscriptions',
            icon: <Subscriptions color="primary" />,
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
            {/* Top App Bar */}
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    borderBottom: 1,
                    borderColor: 'divider'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: 2, pb: 1 }}>
                    <IconButton onClick={handleBackClick} color="inherit">
                        <ArrowBack />
                    </IconButton>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ flexGrow: 1, textAlign: 'center', letterSpacing: '-0.5px' }}
                    >
                        {goal.name}
                    </Typography>
                    <IconButton onClick={handleMoreClick} color="inherit">
                        <MoreVert />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, pb: 14 }}>
                {/* Goal Progress Visualizer */}
                <Box sx={{ p: 2, pt: 4, textAlign: 'center' }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress
                            variant="determinate"
                            value={goal.progress}
                            size={192}
                            thickness={5}
                            sx={{
                                color: 'primary.main',
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                }
                            }}
                        />
                        <CircularProgress
                            variant="determinate"
                            value={100}
                            size={192}
                            thickness={5}
                            sx={{
                                color: 'action.disabled',
                                position: 'absolute',
                                left: 0,
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                }
                            }}
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
                            <Typography variant="h2" fontWeight="bold" color="primary">
                                {goal.progress}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Complete
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                        You've saved{' '}
                        <Typography component="span" fontWeight="bold" color="text.primary">
                            ${goal.currentAmount.toLocaleString()}
                        </Typography>
                        {' '}of your{' '}
                        <Typography component="span" fontWeight="bold" color="text.primary">
                            ${goal.targetAmount.toLocaleString()}
                        </Typography>
                        {' '}goal.
                    </Typography>
                </Box>

                {/* Metric Cards */}
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={1.5}>
                        <Grid size={6}>
                            <Card sx={{ borderRadius: 3 }}>
                                <CardContent sx={{ p: 2 }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                        Amount Saved
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: '-1px', mt: 0.5 }}>
                                        ${goal.currentAmount.toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={6}>
                            <Card sx={{ borderRadius: 3 }}>
                                <CardContent sx={{ p: 2 }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                        Remaining
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: '-1px', mt: 0.5 }}>
                                        ${remainingAmount.toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={12}>
                            <Card sx={{ borderRadius: 3 }}>
                                <CardContent sx={{ p: 2 }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                        Projected Date
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: '-1px', mt: 0.5 }}>
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
                            icon={<TrendingUp sx={{ color: 'success.main', fontSize: '2rem' }} />}
                            severity="info"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                borderRadius: 3,
                                '& .MuiAlert-icon': {
                                    color: 'success.main'
                                }
                            }}
                        >
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                                You're ahead of schedule!
                            </Typography>
                            <Typography variant="body2">
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
                    <Stack spacing={1.5}>
                        {actionSteps.map((step) => (
                            <Card
                                key={step.id}
                                sx={{
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    opacity: step.completed ? 0.6 : 1,
                                    '&:hover': {
                                        boxShadow: 2
                                    }
                                }}
                                onClick={() => handleActionClick(step.id)}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                backgroundColor: step.completed ? 'success.main' : 'primary.main',
                                                color: step.completed ? 'success.contrastText' : 'primary.contrastText',
                                                width: 48,
                                                height: 48
                                            }}
                                        >
                                            {step.icon}
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
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: step.completed ? 'success.main' : 'transparent',
                                                border: step.completed ? 'none' : 1,
                                                borderColor: 'divider',
                                                color: step.completed ? 'success.contrastText' : 'text.secondary'
                                            }}
                                        >
                                            {step.completed ? <Check /> : <ChevronRight />}
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