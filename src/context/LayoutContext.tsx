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
    <LayoutContext.Provider value={{
      leftPanelOpen,
      rightPanelOpen,
      bottomDockOpen,
      setLeftPanelOpen,
      setRightPanelOpen,
      setBottomDockOpen
    }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used within LayoutProvider");
  return context;
}
