import { ThemeProvider } from '@/components/ThemeProvider';
import AppRoute from '@/routes/AppRoute';
import { NextUIProvider } from '@nextui-org/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <AppRoute />
        </QueryClientProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}
