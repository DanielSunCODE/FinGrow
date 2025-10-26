import {useState, type MouseEvent} from 'react';
import {
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
import {Add, CheckCircle, Delete} from '@mui/icons-material';
import type {Goal, GoalType} from "../types/Goal.ts";
import {useNavigate} from "react-router-dom";
import usePageContext from "../hooks/usePageContext.tsx";
import {AllPages} from "./AllPages.tsx";
import useGoals from "../hooks/useGoals.tsx";
import useAccounts from "../hooks/useAccounts.ts";
import LoadingComponent from "../components/LoadingComponent.tsx";
import {formatNumberWithComma} from "../utils/numberFormatConvert.ts";

type TimeUnit = 'weeks' | 'months' | 'years';

export default function GoalsOverview() {
    const navigate = useNavigate();
    const { setPage, setNavBarTitle } = usePageContext();
    setNavBarTitle('Your Goals');

    const {data: account, isLoading: isAccountLoading} = useAccounts();
    const {data: goals, isLoading: isGoalsLoading, createGoal, deleteGoal} = useGoals(account?.id ?? 1); // Sorry, mooooooom

    const [addGoalModalOpen, setAddGoalModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

    // Add Goal Modal State
    const [goalName, setGoalName] = useState('');
    const [goalType, setGoalType] = useState<GoalType>('Savings');
    const [goalAmount, setGoalAmount] = useState('');
    const [timeNumber, setTimeNumber] = useState('');
    const [timeUnit, setTimeUnit] = useState<TimeUnit>('months');

    const goalTypes: GoalType[] = ['Savings', 'Leisure', 'Travel', 'Technology', 'Mobility', 'Education', 'Health'];

    const handleGoalClick = (goalId: number) => {
        navigate(`/goals/${goalId}`);
        setPage(AllPages[3])
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

    const computeDeadline = (): string => {
        const n = parseInt(timeNumber || '0', 10);
        const base = new Date();
        if (Number.isFinite(n) && n > 0) {
            if (timeUnit === 'weeks') {
                base.setDate(base.getDate() + n * 7);
            } else if (timeUnit === 'months') {
                base.setMonth(base.getMonth() + n);
            } else if (timeUnit === 'years') {
                base.setFullYear(base.getFullYear() + n);
            }
        }
        return base.toISOString().slice(0, 10); // YYYY-MM-DD
    };

    const formatLocalDateTime = (d: Date) => {
        const pad = (n: number) => n.toString().padStart(2, '0');
        const year = d.getFullYear();
        const month = pad(d.getMonth() + 1);
        const day = pad(d.getDate());
        const hours = pad(d.getHours());
        const minutes = pad(d.getMinutes());
        const seconds = pad(d.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleCreateGoal = async () => {
        if (!account?.id) return;
        const amount = parseFloat(goalAmount || '0');
        if (!goalName || !amount || amount <= 0) {
            console.warn('Please enter a goal name and a valid amount.');
            return;
        }
        const now = new Date();
        const payload: Goal = {
            Category: goalType,
            CreatedAt: formatLocalDateTime(now),
            CurrentAmount: 0,
            Deadline: computeDeadline(),
            Description: goalName,
            GoalId: Date.now(),
            GoalName: goalName,
            TargetAmount: amount,
            UserId: account.id,
        };
        try {
            await createGoal.mutateAsync(payload);
            handleAddGoalClose();
        } catch (e) {
            console.error('Failed to create goal', e);
        }
    };

    const handleDeleteClick = (event: MouseEvent, goal: Goal) => {
        event.stopPropagation();
        setGoalToDelete(goal);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!goalToDelete) return;
        try {
            await deleteGoal.mutateAsync(goalToDelete.GoalId);
        } catch (e) {
            console.error('Failed to delete goal', e);
        } finally {
            setDeleteModalOpen(false);
            setGoalToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setGoalToDelete(null);
    };

    const goalIsCompleted = (goal: Goal) => goal.TargetAmount == goal.CurrentAmount;

    const getGoalProgress = (goal: Goal): number => {
        const percentage: number = Math.max(0, Math.min(100, (goal.CurrentAmount / goal.TargetAmount) * 100));
        return Math.round(percentage);
    }

    const getProgressColor = (goal: Goal) => {
        if (goal.TargetAmount == goal.CurrentAmount) return 'success';
        if ((goal.TargetAmount - goal.CurrentAmount) * 100 >= 80) return 'primary';
        if ((goal.TargetAmount - goal.CurrentAmount) * 100 >= 50) return 'info';
        return 'primary';
    };

    if (isAccountLoading || isGoalsLoading || !goals) return <LoadingComponent sx={{ display: 'flex', flexGrow: 1 }} />

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: 'sm', mx: 'auto' }}>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, px: 2, pb: 14, pt: 1 }}>
                <Stack spacing={2}>
                    {goals.map((goal) => (
                        <Card
                            key={goal.GoalId}
                            elevation={0}
                            onClick={() => handleGoalClick(goal.GoalId)}
                            sx={{
                                cursor: 'pointer',
                                borderRadius: 3,
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 2
                                },
                                backgroundColor: 'background.paper',
                                border: 1,
                                borderColor: 'rgba(0,0,0,0.1)'
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                    <Box>
                                        <Typography variant={'body2'} sx={{ pb: 1 }} color={'text.disabled'}>
                                            {goal.Category}
                                        </Typography>

                                        <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                                            {goal.Description}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {goalIsCompleted(goal) && (
                                            <CheckCircle color={goalIsCompleted(goal) ? 'success' : 'primary'} sx={{ fontSize: '1.25rem' }} />
                                        )}
                                        <Typography variant="h6" fontWeight="bold" color={goalIsCompleted(goal) ? 'success' : 'primary'}>
                                            {getGoalProgress(goal)}%
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
                                    value={getGoalProgress(goal)}
                                    color={getProgressColor(goal)}
                                    sx={{
                                        height: 8,
                                        borderRadius: 2,
                                        mb: 0.5,
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: 2
                                        }
                                    }}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        ${formatNumberWithComma(goal.CurrentAmount)} / ${formatNumberWithComma(goal.TargetAmount)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={goalIsCompleted(goal) ? 'primary' : 'text.secondary'}
                                        fontWeight={goalIsCompleted(goal) ? 'medium' : 'normal'}
                                    >
                                        {/* FIXME TEMP DEADLINE */}
                                        {goalIsCompleted(goal) ? 'Completed' : `ETA: ${goal.Deadline}`}
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
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={goalType}
                                label="Category"
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
                        disabled={createGoal.isPending}
                        sx={{ flex: 1, textTransform: 'none', borderRadius: 2 }}
                    >
                        <Typography variant={'body1'} fontWeight={'500'}>
                            {createGoal.isPending ? 'Creating…' : 'Create Goal'}
                        </Typography>
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
                            Are you sure you want to delete the goal "{goalToDelete?.Description}"?
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

