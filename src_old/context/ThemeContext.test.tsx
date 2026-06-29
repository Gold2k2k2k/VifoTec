import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-val">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

test('toggles theme between dark and light', () => {
  render(<ThemeProvider><TestComponent /></ThemeProvider>);
  const val = screen.getByTestId('theme-val');
  expect(val.textContent).toBe('dark'); // Default
  fireEvent.click(screen.getByText('Toggle'));
  expect(val.textContent).toBe('light');
  expect(document.body.classList.contains('theme-light')).toBe(true);
});
