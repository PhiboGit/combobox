import { ThemeProvider } from '@/components/theme/theme-provider';
import { ComboboxTest } from '@/components/ui/combobox-test';
import './app.css';
import { Toaster } from '@/components/ui/toaster';
import { ComboboxForm } from '@/features/form/form-combobox';
import { InputForm } from '@/features/form/form-example';

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ComboboxTest />
      <InputForm />
      <ComboboxForm />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
