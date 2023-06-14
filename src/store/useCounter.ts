import { useState } from 'react';
import create from 'zustand';

interface ICounter {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounter = create<ICounter>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
