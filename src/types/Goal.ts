export interface Goal {
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

export type GoalType = 'Savings' | 'Leisure' | 'Travel' | 'Technology' | 'Mobility' | 'Education' | 'Health'
