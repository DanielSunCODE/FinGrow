import {type SyntheticEvent, useState} from 'react';
import {
    Alert,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {Close, Dashboard, DonutSmall, Recommend, ShowChart, TrendingUp} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import usePageContext from "../hooks/usePageContext.tsx";

type FilterCategory = 'ALL' | 'SAVINGS' | 'CREDIT' | 'SMALL EXPENSES' | 'ON-TIME PAYMENTS';

interface InvestmentOption {
    name: string;
    apy: number;
    description: string;
}

export default function Recommendation() {
    const navigate = useNavigate();

    const { setNavBarTitle } = usePageContext();
    setNavBarTitle('Recommendations for you');

    const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('ALL');
    const [bottomNavValue, setBottomNavValue] = useState(1); // Recommendations is active
    const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
    const [forecastModalOpen, setForecastModalOpen] = useState(false);
    const [currentInvestment, setCurrentInvestment] = useState<InvestmentOption | null>(null);
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [investmentTerm, setInvestmentTerm] = useState(3);
    const [projectionResult, setProjectionResult] = useState<string | null>(null);

    const filterCategories: FilterCategory[] = ['ALL', 'SAVINGS', 'CREDIT', 'SMALL EXPENSES', 'ON-TIME PAYMENTS'];

    const categoryLabelMap: Record<FilterCategory, string> = {
        'ALL': 'All',
        'SAVINGS': 'Savings',
        'CREDIT': 'Credit',
        'SMALL EXPENSES': 'Small expenses',
        'ON-TIME PAYMENTS': 'On-time payments'
    };

    const recommendations = [
        {
            category: 'SAVINGS' as FilterCategory,
            title: 'Automate your monthly savings',
            description: 'Set up automatic transfers into your savings account and watch your money grow with zero effort.',
            color: 'primary.main'
        },
        {
            category: 'CREDIT' as FilterCategory,
            title: 'Pay down your credit card balance',
            description: 'Paying more than the minimum helps your credit health and cuts the interest you pay over time.',
            color: 'secondary.main'
        },
        {
            category: 'SMALL EXPENSES' as FilterCategory,
            title: 'Spot and shrink your small daily spends',
            description: 'Check little day-to-day costs like coffees or subscriptions to find easy ways to save.',
            color: 'warning.main'
        }
    ];

    const investmentOptions: InvestmentOption[] = [
        {
            name: '360 Performance Savings',
            apy: 4.25,
            description: 'High-yield savings account with 4.25% APY. No minimum balance.'
        },
        {
            name: 'Certificate of Deposit (CD)',
            apy: 5.00,
            description: '12-month CD with 5.00% APY. $1,000 minimum deposit.'
        },
        {
            name: 'Money Market Account',
            apy: 4.00,
            description: 'Money market account with 4.00% APY and flexible access to your money.'
        }
    ];

    const handleBackClick = () => {
        navigate('/');
    };

    const handleFilterChange = (category: FilterCategory) => {
        setSelectedFilter(category);
    };

    const handleBottomNavChange = (_event: SyntheticEvent, newValue: number) => {
        setBottomNavValue(newValue);
        // Empty function
    };

    const handleInvestmentModalOpen = () => {
        setInvestmentModalOpen(true);
    };

    const handleInvestmentModalClose = () => {
        setInvestmentModalOpen(false);
    };

    const handleOpenForecastModal = (investment: InvestmentOption) => {
        setCurrentInvestment(investment);
        setInvestmentModalOpen(false);
        setForecastModalOpen(true);
    };

    const handleForecastModalClose = () => {
        setForecastModalOpen(false);
        setCurrentInvestment(null);
        setInvestmentAmount('');
        setInvestmentTerm(3);
        setProjectionResult(null);
    };

    const handleCalculateProjection = () => {
        if (!currentInvestment || !investmentAmount) return;

        const amount = parseFloat(investmentAmount);
        const monthlyRate = currentInvestment.apy / 100 / 12;
        const finalAmount = amount * Math.pow(1 + monthlyRate, investmentTerm);
        const earnings = finalAmount - amount;

        const result = `
      Initial investment: $${amount.toLocaleString()}
      Term: ${investmentTerm} months
      APY: ${currentInvestment.apy}%
      Final amount: $${finalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      Earnings: $${earnings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
    `;

        setProjectionResult(result);
    };

    const handleAddToForecast = () => {
        // Empty function
        handleForecastModalClose();
    };

    const filteredRecommendations = selectedFilter === 'ALL'
        ? recommendations
        : recommendations.filter(rec => rec.category === selectedFilter);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, pb: 12 }}>
                {/* Motivational Banner */}
                <Box sx={{ p: 2, pt: 1 }}>
                    <Alert
                        icon={<TrendingUp sx={{ color: 'text.primary', fontSize: '1.8rem', justifyContent: 'center' }} />}
                        severity="info"
                        sx={{
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            borderRadius: 3,
                            '& .MuiAlert-icon': {
                                color: 'success.main',
                                margin: 'auto 12px auto 0',
                            }
                        }}
                    >
                        <Typography variant="body1" fontWeight="bold" color={'primary'} sx={{ mb: 0.5 }}>
                            You're ahead of schedule!
                        </Typography>
                        <Typography variant="body2" color={'text.disabled'}>
                            Your consistent contributions have put you on the fast track.
                        </Typography>
                    </Alert>
                </Box>

                {/* Graph Placeholder */}
                <Box sx={{ px: 2, pb: 4 }}>
                    <Box
                        sx={{
                            aspectRatio: '16/10',
                            width: '100%',
                            borderRadius: 2,
                            backgroundColor: 'action.hover',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Box sx={{ textAlign: 'center', p: 2 }}>
                            <ShowChart sx={{ fontSize: '3rem', color: 'text.secondary', opacity: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Line chart representing cash flow prediction.
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                                Solid lines for historical, dashed for projected.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Category Filter Chips */}
                <Box
                    sx={{
                        position: 'sticky',
                        top: 64,
                        zIndex: 10,
                        backgroundColor: 'background.default',
                        backdropFilter: 'blur(8px)',
                        pb: 1.5
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        gap: 1.5,
                        px: 2,
                        overflowX: 'auto',
                        '&::-webkit-scrollbar': { display: 'none' }
                    }}>
                        {filterCategories.map((category) => (
                            <Chip
                                key={category}
                                label={categoryLabelMap[category]}
                                onClick={() => handleFilterChange(category)}
                                variant={selectedFilter === category ? 'filled' : 'outlined'}
                                color={selectedFilter === category ? 'primary' : 'default'}
                                sx={{
                                    minWidth: 'fit-content',
                                    fontWeight: selectedFilter === category ? '500' : 'medium'
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Recommendations */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
                    {filteredRecommendations.map((rec, index) => (
                        <Card key={index} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: 'background.default' }}>
                            <CardContent sx={{ p: 2.5 }}>
                                <Typography
                                    variant="caption"
                                    fontWeight="bold"
                                    sx={{
                                        color: rec.color,
                                        letterSpacing: 1,
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {categoryLabelMap[rec.category]}
                                </Typography>
                                <Typography variant="h6" fontWeight="500" sx={{ mt: 1.5, mb: 1 }}>
                                    {rec.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {rec.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Explore Investments Button */}
                <Box sx={{ px: 2, pb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleInvestmentModalOpen}
                        sx={{
                            py: 1.5,
                            fontWeight: 'bold',
                            borderRadius: 2,
                            textTransform: 'none'
                        }}
                    >
                        <Typography variant={'body1'} fontWeight={500}>
                            Check more investments
                        </Typography>
                    </Button>
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
                <BottomNavigationAction label="Recommendations" icon={<Recommend />} />
                <BottomNavigationAction label="Goals" icon={<DonutSmall />} />
            </BottomNavigation>

            {/* Investment Modal */}
            <Dialog
                open={investmentModalOpen}
                onClose={handleInvestmentModalClose}
                maxWidth="sm"
                sx={{ borderRadius: 3, '& .MuiDialog-paper': { borderRadius: 3} }}
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight={500}>Your investment options</Typography>

                    <IconButton onClick={handleInvestmentModalClose}>
                        <Close fontSize={'small'}/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {investmentOptions.map((option, index) => (
                            <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="body1" fontWeight={600} color="primary" sx={{ mb: 1 }}>
                                        {option.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {option.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => handleOpenForecastModal(option)}
                                        sx={{ textTransform: 'none', borderRadius: 2, boxShadow: 0 }}
                                    >
                                        <Typography variant="body2" color="primary.contrastText">
                                            View in Forecast
                                        </Typography>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </DialogContent>
            </Dialog>

            {/* Forecast Modal */}
            <Dialog
                open={forecastModalOpen}
                onClose={handleForecastModalClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Projection: {currentInvestment?.name}
                    <IconButton onClick={handleForecastModalClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Amount to invest ($)"
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            placeholder="1000"
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Term</InputLabel>
                            <Select
                                value={investmentTerm}
                                label="Term"
                                onChange={(e) => setInvestmentTerm(e.target.value as number)}
                            >
                                <MenuItem value={3}>3 months</MenuItem>
                                <MenuItem value={6}>6 months</MenuItem>
                            </Select>
                        </FormControl>

                        {projectionResult && (
                            <Box sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', p: 2, borderRadius: 2 }}>
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                                    Projection:
                                </Typography>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                    {projectionResult}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 0.2 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleCalculateProjection}
                        sx={{ flex: 1, textTransform: 'none', borderRadius: 2, py: 1.2 }}
                    >
                        <Typography variant="body2" fontWeight={500}>Calculate</Typography>
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleAddToForecast}
                        color={'primary'}
                        sx={{ flex: 1, textTransform: 'none', borderRadius: 2, py: 1.2 }}
                    >
                        <Typography variant="body2" fontWeight={500}>Add to Forecast</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};