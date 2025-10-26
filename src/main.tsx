import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ThemeContextProvider} from "./theme/ThemeContextProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PageContextProvider} from "./hooks/PageContextProvider.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeContextProvider>
            <QueryClientProvider client={queryClient}>
                <PageContextProvider>
                    <App />
                    <ReactQueryDevtools initialIsOpen={false} />
                </PageContextProvider>
            </QueryClientProvider>
        </ThemeContextProvider>
    </StrictMode>,
)
