import { IService } from '@/src/types';
import { useState } from 'react';
import { devtools } from 'zustand/middleware';
import create from 'zustand';

interface ServiceState {
  services: IService[];
  selectedServiceId: number | null;
}
interface ServiceActions {
  addService: (service: IService) => void;
  removeService: (id: number) => void;
  clearService: () => void;
  onClickService: (service: IService | null) => void;
}

const useServiceStore = create<ServiceState & ServiceActions>()(
  devtools((set) => ({
    services: [],
    selectedServiceId: null,
    onClickService: (service: IService | null) => set(() => ({ selectedServiceId: service ? service.id : null })),
    addService: (service: IService) => set((state) => ({ services: [...state.services, service] })),
    removeService: (id: number) =>
      set((state) => ({
        services: state.services.filter((service) => service.id !== id),
      })),
    clearService: () => set(() => ({ services: [] })),
  })),
);

export default useServiceStore;
