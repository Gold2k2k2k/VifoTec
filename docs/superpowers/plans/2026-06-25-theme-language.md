# Theme and Language Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Dark/Light mode toggling using CSS variables and Tailwind, and English/Vietnamese localization using `react-i18next`.

**Architecture:** 
- **Theme:** A `ThemeContext` will manage `light`/`dark` states, persisting to `localStorage` and toggling a `theme-light` class on the `<body>`. We will refactor hardcoded Tailwind colors into CSS variables in `index.css`.
- **Localization:** We will install `i18next` and `react-i18next`. Create `src/i18n.ts` and locales (`en.json`, `vi.json`). React components will use the `useTranslation` hook to retrieve localized strings.
- **Testing:** Since testing isn't set up yet, we will rely on manual DOM verification via Vite dev server or install Vitest for unit testing. For this plan, we will add Vitest to ensure TDD compliance.

**Tech Stack:** React, Tailwind CSS, i18next, react-i18next, Vitest.

## Global Constraints
- Target platform: Vite + React 18
- Tailwind version: 3.4.3
- Language codes: `en`, `vi`
- Default Theme: `dark`
- Default Language: `vi`

---

### Task 1: Setup Testing Environment

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`
- Create: `src/test/setup.ts`

**Interfaces:**
- Produces: A working `npm run test` command.

- [ ] **Step 1: Install Vitest and Testing Library**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Create Vitest config**
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true
  }
});
```

- [ ] **Step 3: Create Setup file**
Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 4: Update package.json scripts**
Modify `package.json` scripts block to add:
```json
"test": "vitest run"
```

- [ ] **Step 5: Commit**
```bash
git add package.json vitest.config.ts src/test/setup.ts
git commit -m "chore: setup vitest and testing library"
```

---

### Task 2: Implement Theme Context

**Files:**
- Create: `src/context/ThemeContext.tsx`
- Create: `src/context/ThemeContext.test.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: `<ThemeProvider>` and `useTheme()` hook.

- [ ] **Step 1: Write the failing test**
Create `src/context/ThemeContext.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm run test src/context/ThemeContext.test.tsx`
Expected: FAIL (File not found / Cannot resolve)

- [ ] **Step 3: Write minimal implementation**
Create `src/context/ThemeContext.tsx`:
```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

- [ ] **Step 4: Update main.tsx to include Provider**
Modify `src/main.tsx` (wrap App with ThemeProvider):
```tsx
import { ThemeProvider } from './context/ThemeContext';
// ...
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* existing providers */}
    </ThemeProvider>
  </React.StrictMode>
);
```

- [ ] **Step 5: Run test to verify it passes**
Run: `npm run test src/context/ThemeContext.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**
```bash
git add src/context/ src/main.tsx
git commit -m "feat: add ThemeContext for dark/light mode"
```

---

### Task 3: Setup i18next Localization

**Files:**
- Create: `src/i18n.ts`
- Create: `src/locales/en.json`
- Create: `src/locales/vi.json`
- Create: `src/i18n.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: Initialized `i18next` instance available globally.

- [ ] **Step 1: Install dependencies**
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

- [ ] **Step 2: Write the failing test**
Create `src/i18n.test.ts`:
```typescript
import i18n from './i18n';

test('i18n initializes correctly', async () => {
  await i18n.changeLanguage('vi');
  expect(i18n.t('hello')).toBe('Xin chào');
  await i18n.changeLanguage('en');
  expect(i18n.t('hello')).toBe('Hello');
});
```

- [ ] **Step 3: Run test to verify it fails**
Run: `npm run test src/i18n.test.ts`
Expected: FAIL (File not found)

- [ ] **Step 4: Create Locales**
Create `src/locales/en.json`:
```json
{
  "translation": {
    "hello": "Hello",
    "theme_dark": "Dark Mode",
    "theme_light": "Light Mode",
    "scan": "SCAN",
    "search_placeholder": "ENTER COORDINATES / TARGET NAME..."
  }
}
```
Create `src/locales/vi.json`:
```json
{
  "translation": {
    "hello": "Xin chào",
    "theme_dark": "Chế độ Tối",
    "theme_light": "Chế độ Sáng",
    "scan": "QUÉT",
    "search_placeholder": "NHẬP TỌA ĐỘ / TÊN THIÊN HÀ..."
  }
}
```

- [ ] **Step 5: Write minimal implementation**
Create `src/i18n.ts`:
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import vi from './locales/vi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, vi },
    fallbackLng: 'vi',
    interpolation: { escapeValue: false }
  });

export default i18n;
```
Import in `src/main.tsx`:
```tsx
import './i18n';
```

- [ ] **Step 6: Run test to verify it passes**
Run: `npm run test src/i18n.test.ts`
Expected: PASS

- [ ] **Step 7: Commit**
```bash
git add package.json src/locales/ src/i18n.ts src/i18n.test.ts src/main.tsx
git commit -m "feat: setup i18next for en/vi localization"
```

---

### Task 4: Add Theme & Language Toggle UI

**Files:**
- Create: `src/components/layout/SettingsToggle.tsx`
- Create: `src/components/layout/SettingsToggle.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `useTheme()`, `useTranslation()`.
- Produces: Floating widget in `App.tsx` top-right corner.

- [ ] **Step 1: Write the failing test**
Create `src/components/layout/SettingsToggle.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsToggle } from './SettingsToggle';
import { ThemeProvider } from '../../context/ThemeContext';
import '../../i18n'; // Init i18n

test('renders toggles and changes language/theme', () => {
  render(<ThemeProvider><SettingsToggle /></ThemeProvider>);
  const langBtn = screen.getByTestId('lang-toggle');
  expect(langBtn).toBeInTheDocument();
  fireEvent.click(langBtn); // Should switch to EN
  
  const themeBtn = screen.getByTestId('theme-toggle');
  fireEvent.click(themeBtn); // Switch to light
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm run test src/components/layout/SettingsToggle.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
Create `src/components/layout/SettingsToggle.tsx`:
```tsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const SettingsToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2">
      <button data-testid="lang-toggle" onClick={toggleLang} className="px-3 py-1 text-xs font-mono border border-cyan-500/30 text-cyan-400 rounded-sm hover:bg-cyan-500/20">
        {i18n.language === 'vi' ? 'EN' : 'VI'}
      </button>
      <button data-testid="theme-toggle" onClick={toggleTheme} className="px-3 py-1 text-xs font-mono border border-cyan-500/30 text-cyan-400 rounded-sm hover:bg-cyan-500/20">
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
};
```
Modify `src/App.tsx` to include `<SettingsToggle />` near the top of the render tree.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm run test src/components/layout/SettingsToggle.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/layout/SettingsToggle* src/App.tsx
git commit -m "feat: add theme and language toggle widget"
```

---

### Task 5: Implement Light Mode CSS Variables

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `.theme-light` body class.

- [ ] **Step 1: Write CSS variables**
Modify `src/index.css` root and `theme-light`:
```css
:root {
  --bg-primary: #000;
  --text-cyan: #22d3ee; /* cyan-400 */
  --border-cyan: rgba(6, 182, 212, 0.3);
}

.theme-light {
  --bg-primary: #f8fafc; /* slate-50 */
  --text-cyan: #0891b2; /* cyan-600 */
  --border-cyan: rgba(8, 145, 178, 0.3);
}

/* Update hardcoded values to use variables where needed */
body {
  background-color: var(--bg-primary);
}
```

- [ ] **Step 2: Apply variables to UI classes**
Replace `bg-black` with `bg-[var(--bg-primary)]` in `App.tsx` Landing Page wrapper, and update `.hologram-btn` text colors to use `var(--text-cyan)`.
*Note: Due to the complexity of Tailwind replacements, use global overrides for the grid and backgrounds in CSS.*

- [ ] **Step 3: Commit**
```bash
git add src/index.css src/App.tsx
git commit -m "feat: implement light mode CSS variables"
```
