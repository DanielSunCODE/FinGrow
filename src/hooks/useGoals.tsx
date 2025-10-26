import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api.ts";
import type { Goal } from "../types/Goal.ts";

export default function useGoals(accountId: number) {
    const queryClient = useQueryClient();

    // Fetch goals for a specific account/user
    const goalsQuery = useQuery<Goal[]>({
        queryKey: ["goals", accountId],
        queryFn: async () => {
            const { data } = await api.get<Goal[]>(`/goals/account/${accountId}`);
            return data;
        },
        enabled: !!accountId,
    });

    // Create goal mutation (sends full Goal object)
    const createGoal = useMutation({
        mutationFn: async (payload: Goal) => {
            const res = await api.post(`/goals/`, payload);
            return res.data as Goal;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["goals", accountId] });
        },
    });

    // Delete goal mutation
    const deleteGoal = useMutation({
        mutationFn: async (goalId: number) => {
            const res = await api.delete(`/goals/${goalId}`);
            return res.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["goals", accountId] });
        },
    });

    return {
        ...goalsQuery,
        createGoal,
        deleteGoal,
    };
}
