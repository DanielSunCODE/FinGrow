import {type SyntheticEvent, useState} from 'react';
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {Add, CheckCircle, Dashboard, Delete, DonutSmall, Recommend} from '@mui/icons-material';
import type {Goal, GoalType} from "../types/Goal.ts";
import {useNavigate} from "react-router-dom";
import usePageContext from "../hooks/usePageContext.tsx";
import {AllPages} from "./AllPages.tsx";

type TimeUnit = 'weeks' | 'months' | 'years';

export default function GoalsOverview() {
    const navigate = useNavigate();
    const { setPage, setNavBarTitle } = usePageContext();
    setNavBarTitle('Your Goals');

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

    const [bottomNavValue, setBottomNavValue] = useState(2); // Goals is active
    const [addGoalModalOpen, setAddGoalModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

    // Add Goal Modal State
    const [goalName, setGoalName] = useState('');
    const [goalType, setGoalType] = useState<GoalType>('Savings');
    const [goalAmount, setGoalAmount] = useState('');
    const [timeNumber, setTimeNumber] = useState('');
    const [timeUnit, setTimeUnit] = useState<TimeUnit>('months');

    const goalTypes: GoalType[] = ['Savings', 'Travel', 'Entertainment', 'Relations', 'Education', 'Health'];

    const handleBackClick = () => {
        // Empty function
    };

    const handleGoalClick = (goalId: string) => {
        navigate(`/goals/${goalId}`);
        setPage(AllPages[3])
    };

    const handleBottomNavChange = (_event: SyntheticEvent, newValue: number) => {
        setBottomNavValue(newValue);
        // Empty function
    };

    const handleAddGoalClick = () => {
        setAddGoalModalOpen(true);
    };

    const handleAddGoalClose = () => {
        setAddGoalModalOpen(false);
        setGoalName('');
        setGoalType('Savings');
        setGoalAmount('');
        setTimeNumber('');
        setTimeUnit('months');
    };

    const handleCreateGoal = () => {
        // Empty function
        handleAddGoalClose();
    };

    const handleDeleteClick = (event: MouseEvent, goal: Goal) => {
        event.stopPropagation();
        setGoalToDelete(goal);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Empty function
        setDeleteModalOpen(false);
        setGoalToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setGoalToDelete(null);
    };

    const getProgressColor = (goal: Goal) => {
        if (goal.isCompleted) return 'success';
        if (goal.progress >= 80) return 'primary';
        if (goal.progress >= 50) return 'info';
        return 'primary';
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: 'sm', mx: 'auto' }}>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, px: 2, pb: 14, pt: 1 }}>
                <Stack spacing={2}>
                    {goals.map((goal) => (
                        <Card
                            key={goal.id}
                            elevation={0}
                            onClick={() => handleGoalClick(goal.id)}
                            sx={{
                                cursor: 'pointer',
                                borderRadius: 3,
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 2
                                },
                                backgroundColor: 'background.default',
                                border: 1,
                                borderColor: 'rgba(0,0,0,0.1)'
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                    <Box>
                                        <Typography variant={'body2'} sx={{ pb: 1 }} color={'text.disabled'}>
                                            {goal.type}
                                        </Typography>

                                        <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                                            {goal.name}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {goal.isCompleted && (
                                            <CheckCircle color={goal.isCompleted ? 'success' : 'primary'} sx={{ fontSize: '1.25rem' }} />
                                        )}
                                        <Typography variant="h6" fontWeight="bold" color={goal.isCompleted ? 'success' : 'primary'}>
                                            {goal.progress}%
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleDeleteClick(e, goal)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'error.light',
                                                    color: 'error.contrastText'
                                                },
                                                color: 'error.light'
                                            }}
                                        >
                                            <Delete fontSize="small" color={'inherit'} />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={goal.progress}
                                    color={getProgressColor(goal)}
                                    sx={{
                                        height: 8,
                                        borderRadius: 2,
                                        mb: 0.5,
                                        backgroundColor: 'primary.main',
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: 2
                                        }
                                    }}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={goal.isCompleted ? 'primary' : 'text.secondary'}
                                        fontWeight={goal.isCompleted ? 'medium' : 'normal'}
                                    >
                                        {goal.isCompleted ? 'Completed' : `ETA: ${goal.eta}`}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 120,
                    right: 20,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    },
                    '&:active': {
                        transform: 'scale(0.95)'
                    }
                }}
                onClick={handleAddGoalClick}
            >
                <Add sx={{ fontSize: '2rem' }} />
            </Fab>

            {/* Bottom Navigation */}
            <BottomNavigation
                value={bottomNavValue}
                onChange={handleBottomNavChange}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    maxWidth: 'sm',
                    mx: 'auto',
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

            {/* Add Goal Modal */}
            <Dialog
                open={addGoalModalOpen}
                onClose={handleAddGoalClose}
                maxWidth="sm"
                sx={{ borderRadius: 4, '& .MuiDialog-paper': { borderRadius: 4} }}
                fullWidth
            >
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Goal Name"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                            placeholder="e.g., Trip to Europe"
                            size={'small'}
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Goal Type</InputLabel>
                            <Select
                                value={goalType}
                                label="Goal Type"
                                onChange={(e) => setGoalType(e.target.value as GoalType)}
                                size={'small'}
                            >
                                {goalTypes.map((type) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Amount to Save ($)"
                            type="number"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
                            placeholder="5000"
                            size={'small'}
                            fullWidth
                        />

                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                                Time to Achieve Goal
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <TextField
                                        type="number"
                                        value={timeNumber}
                                        onChange={(e) => setTimeNumber(e.target.value)}
                                        placeholder="6"
                                        slotProps={{
                                            htmlInput: {
                                                min: 1
                                            }
                                        }}
                                        size={'small'}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <FormControl fullWidth>
                                        <Select
                                            value={timeUnit}
                                            onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                                            size={'small'}
                                        >
                                            <MenuItem value="weeks">Weeks</MenuItem>
                                            <MenuItem value="months">Months</MenuItem>
                                            <MenuItem value="years">Years</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2.2, gap: 0.2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleAddGoalClose}
                        sx={{ flex: 1, textTransform: 'none', borderRadius: 2 }}
                    >
                        <Typography variant={'body1'} fontWeight={'500'}>Cancel</Typography>
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateGoal}
                        sx={{ flex: 1, textTransform: 'none', borderRadius: 2 }}
                    >
                        <Typography variant={'body1'} fontWeight={'500'}>Create Goal</Typography>
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog
                open={deleteModalOpen}
                onClose={handleDeleteCancel}
                maxWidth="sm"
                sx={{ borderRadius: 4, '& .MuiDialog-paper': { borderRadius: 4} }}
                fullWidth
            >
                <DialogTitle sx={{ color: 'error.main', fontWeight: '500' }}>
                    <Typography variant="body1" fontWeight={600} sx={{ pt: 2 }}>Delete Goal</Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} width={'100%'}>
                        <Typography variant="body1">
                            Are you sure you want to delete the goal "{goalToDelete?.name}"?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            When you delete this goal, the saved money will be returned to your main account and all progress will be lost.
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3, gap: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={handleDeleteCancel}
                        sx={{ flex: 1, textTransform: 'none', borderRadius: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteConfirm}
                        sx={{ flex: 1, textTransform: 'none', borderRadius: 2 }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

