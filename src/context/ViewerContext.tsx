import React, { createContext, useContext, useState } from 'react';
import { InteractionMode, SpectrumMode } from '../data';

interface ViewerState {
  interactionMode: InteractionMode;
  setInteractionMode: (val: InteractionMode) => void;
  spectrumMode: SpectrumMode;
  setSpectrumMode: (val: SpectrumMode) => void;
  timeMachineYear: number;
  setTimeMachineYear: (val: number) => void;
  isSonifying: boolean;
  setIsSonifying: (val: boolean) => void;
}

export const ViewerContext = createContext<ViewerState | undefined>(undefined);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('none');
  const [spectrumMode, setSpectrumMode] = useState<SpectrumMode>('NIRCAM');
  const [timeMachineYear, setTimeMachineYear] = useState(2026);
  const [isSonifying, setIsSonifying] = useState(false);

  return (
    <ViewerContext.Provider value={{
      interactionMode, setInteractionMode,
      spectrumMode, setSpectrumMode,
      timeMachineYear, setTimeMachineYear,
      isSonifying, setIsSonifying
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
