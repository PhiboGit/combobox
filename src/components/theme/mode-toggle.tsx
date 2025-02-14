import { Moon, Sun } from 'lucide-react';
import { use } from 'react';

import { Button } from '@/components/ui/button';

import { ThemeProviderContext } from './theme-provider';
type Theme = 'dark' | 'light' | 'system';

export function ModeToggle() {
  const { setTheme, theme } = use(ThemeProviderContext);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Moon className="size-[1.2rem] transition-all" />
      ) : (
        <Sun className="size-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
