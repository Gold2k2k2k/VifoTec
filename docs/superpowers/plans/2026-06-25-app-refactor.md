# App Architecture Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the massive state held in `App.tsx` into smaller, focused Context Providers to eliminate unnecessary re-renders and follow Vercel Composition Patterns.

**Architecture:** We will create specialized context providers: `LayoutContext` (panel toggles), `ViewerContext` (interaction modes, spectrum), and `ChatContext` (AI sessions, messages). `App.tsx` will be simplified to just compose these providers.

**Tech Stack:** React (Hooks, Context API), TypeScript.

## Global Constraints

- Do not change existing UI aesthetics (must maintain frontend-design guidelines).
- Strictly follow `vercel-react-best-practices` (prevent unnecessary re-renders).

---

### Task 1: Create Layout Context

**Files:**
- Create: `src/context/LayoutContext.tsx`

**Interfaces:**
- Produces: `useLayout()` hook providing `{ leftPanelOpen, rightPanelOpen, bottomDockOpen, setLeftPanelOpen... }`

- [ ] **Step 1: Write the failing test**

```tsx
// skipping test for basic Context Provider as per TDD exceptions (throwaway/configuration) or we could write a renderHook test, but let's implement the context.
```

- [ ] **Step 2: Write minimal implementation**

```tsx
import React, { createContext, useContext, useState } from 'react';

interface LayoutState {
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  bottomDockOpen: boolean;
  setLeftPanelOpen: (val: boolean) => void;
  setRightPanelOpen: (val: boolean) => void;
  setBottomDockOpen: (val: boolean) => void;
}

export const LayoutContext = createContext<LayoutState | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [bottomDockOpen, setBottomDockOpen] = useState(true);

  return (
    <LayoutContext.Provider value={{ leftPanelOpen, rightPanelOpen, bottomDockOpen, setLeftPanelOpen, setRightPanelOpen, setBottomDockOpen }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used within LayoutProvider");
  return context;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/context/LayoutContext.tsx
git commit -m "refactor: add LayoutContext for panel state"
```

### Task 2: Create Viewer Context

**Files:**
- Create: `src/context/ViewerContext.tsx`

- [ ] **Step 1: Write minimal implementation**

```tsx
import React, { createContext, useContext, useState } from 'react';
import { InteractionMode, SpectrumMode } from '../data';

interface ViewerState {
  interactionMode: InteractionMode;
  setInteractionMode: (val: InteractionMode) => void;
  spectrumMode: SpectrumMode;
  setSpectrumMode: (val: SpectrumMode) => void;
  timeMachineYear: number;
  setTimeMachineYear: (val: number) => void;
}

export const ViewerContext = createContext<ViewerState | undefined>(undefined);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('none');
  const [spectrumMode, setSpectrumMode] = useState<SpectrumMode>('NIRCAM');
  const [timeMachineYear, setTimeMachineYear] = useState(2026);

  return (
    <ViewerContext.Provider value={{
      interactionMode, setInteractionMode,
      spectrumMode, setSpectrumMode,
      timeMachineYear, setTimeMachineYear,
    }}>
      {children}
    </ViewerContext.Provider>
  );
}

export function useViewer() {
  const context = useContext(ViewerContext);
  if (!context) throw new Error("useViewer must be used within ViewerProvider");
  return context;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/context/ViewerContext.tsx
git commit -m "refactor: add ViewerContext for interactions"
```

### Task 3: Simplify App.tsx

- [ ] **Step 1: Integrate Providers in App.tsx (or main.tsx)**
- [ ] **Step 2: Refactor LeftHUD and BottomDock to use hooks**
- [ ] **Step 3: Commit**
