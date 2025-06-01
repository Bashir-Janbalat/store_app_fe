import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppRoutes from "./components/routes/AppRoutes.tsx";
import {AuthProvider} from "./components/context/AuthProvider.tsx";
import {Toaster} from 'react-hot-toast';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
        },
        mutations: {
            retry: 1,
        },
    },
});


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-right" reverseOrder={false}/>
            <AuthProvider>
                <AppRoutes/>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
