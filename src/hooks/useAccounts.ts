import type Account from "../types/Account.ts";
import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api.ts";

export default function useAccounts() {
    return useQuery<Account>({
        queryKey: ["account"],
        queryFn: async () => {
            const { data } = await api.get<Account>("/accounts/1");
            return data;
        }
    });
}
