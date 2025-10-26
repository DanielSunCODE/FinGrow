export interface Goal {
    id: string;
    name: string;
    type: string;
    currentAmount: number;
    targetAmount: number;
    progress: number;
    eta: string;
    isCompleted: boolean;
}

export type GoalType = 'Savings' | 'Travel' | 'Entertainment' | 'Relations' | 'Education' | 'Health';