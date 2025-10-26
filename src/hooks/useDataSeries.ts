import {useQuery} from "@tanstack/react-query";
import type DataSeries from "../types/DataSeries.ts";
import {api} from "../utils/api.ts";

export default function useDataSeries(accountId: number) {
    return useQuery<DataSeries>({
        queryKey: ["dataSeries"],
        queryFn: async () => {
            const { data } = await api.get<DataSeries>(`/forecast/${accountId}`);
            return data;
        },
        enabled: !!accountId,
    })
}