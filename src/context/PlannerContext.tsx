import { createContext, useContext, useState, ReactNode } from 'react';
import { MonthKey } from '../types';

interface PlannerContextValue {
  assignments: Record<string, Set<MonthKey>>;
  assignMonth: (programId: string, month: MonthKey) => void;
  toggleMonth: (programId: string, month: MonthKey) => void;
  removeFromMonth: (programId: string, month: MonthKey) => void;
  clearProgram: (programId: string) => void;
  clearAll: () => void;
  selectedProgramCount: number;
  getMonthsForProgram: (programId: string) => MonthKey[];
}

const PlannerContext = createContext<PlannerContextValue | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [assignments, setAssignments] = useState<Record<string, Set<MonthKey>>>({});

  const assignMonth = (programId: string, month: MonthKey) => {
    setAssignments(prev => {
      const existing = prev[programId] ? new Set(prev[programId]) : new Set<MonthKey>();
      existing.add(month);
      return { ...prev, [programId]: existing };
    });
  };

  const toggleMonth = (programId: string, month: MonthKey) => {
    setAssignments(prev => {
      const existing = prev[programId] ? new Set(prev[programId]) : new Set<MonthKey>();
      if (existing.has(month)) {
        existing.delete(month);
      } else {
        existing.add(month);
      }
      if (existing.size === 0) {
        const next = { ...prev };
        delete next[programId];
        return next;
      }
      return { ...prev, [programId]: existing };
    });
  };

  const removeFromMonth = (programId: string, month: MonthKey) => {
    setAssignments(prev => {
      if (!prev[programId]) return prev;
      const existing = new Set(prev[programId]);
      existing.delete(month);
      if (existing.size === 0) {
        const next = { ...prev };
        delete next[programId];
        return next;
      }
      return { ...prev, [programId]: existing };
    });
  };

  const clearProgram = (programId: string) => {
    setAssignments(prev => {
      const next = { ...prev };
      delete next[programId];
      return next;
    });
  };

  const clearAll = () => setAssignments({});

  const selectedProgramCount = Object.keys(assignments).filter(id => assignments[id].size > 0).length;

  const getMonthsForProgram = (programId: string): MonthKey[] => {
    return assignments[programId] ? Array.from(assignments[programId]) : [];
  };

  return (
    <PlannerContext.Provider value={{
      assignments,
      assignMonth,
      toggleMonth,
      removeFromMonth,
      clearProgram,
      clearAll,
      selectedProgramCount,
      getMonthsForProgram,
    }}>
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlannerContext(): PlannerContextValue {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlannerContext must be used within PlannerProvider');
  return ctx;
}
