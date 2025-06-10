import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes.tsx";
import {AuthProvider} from "./context/AuthProvider.tsx";
import {Toaster} from 'react-hot-toast';
import {CartProvider} from "./context/CartProvider.tsx";
import {WishlistProvider} from "./context/WishlistProvider.tsx";
import '../src/styles/shared-summary.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 0,
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
            <Toaster position="top-center" reverseOrder={false}/>
            <AuthProvider>
                <CartProvider>
                    <WishlistProvider>
                        <AppRoutes/>
                    </WishlistProvider>
                </CartProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
