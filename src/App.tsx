import { ThemeProvider } from '@/components/ThemeProvider';
import AppRoute from '@/routes/AppRoute';
import { NextUIProvider } from '@nextui-org/system';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <NextUIProvider>
        <AppRoute />
      </NextUIProvider>
    </ThemeProvider>
  );
}
