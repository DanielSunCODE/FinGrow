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

export type GoalType = 'Savings' | 'Leisure' | 'Mobility' | 'Technology' | 'Education' | 'Health';

// ! Remove the above interface and use this one instead after implementing the backend
export default interface NewGoal {
    Category: string;
    CreatedAt: string;
    CurrentAmount: number;
    Deadline: string;
    Description: string;
    GoalId: number;
    GoalName: string;
    TargetAmount: number;
    UserId: number;
}