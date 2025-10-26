export default interface DataSeries {
    account_id: number;
    dates: string[];
    scenarios: {
        ai_goals: number[],
        baseline: number[],
        cd_3_5: number[],
        combined: number[]
    }
}