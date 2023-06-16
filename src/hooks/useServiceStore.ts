import { IService } from '@/src/types';
import { useState } from 'react';
import { devtools } from 'zustand/middleware';
import create from 'zustand';

interface ServiceState {
  services: IService[];
  selectedServiceId: number | null;
  isMouseDown: boolean;
  interval: {
    x: number;
    y: number;
  };
}
interface ServiceActions {
  addService: (service: IService) => void;
  removeService: (id: number) => void;
  clearService: () => void;
  onClickGrid: (event: React.MouseEvent) => void;
  onMouseDownService: (event: React.MouseEvent, service: IService | null) => void;
  onMouseUpService: (event: React.MouseEvent) => void;
  onMouseMoveService: (event: React.MouseEvent) => void;
}
// mouse down 이벤트만 사용해도 될듯?

const useServiceStore = create<ServiceState & ServiceActions>()(
  devtools((set) => ({
    services: [],
    selectedServiceId: null,
    interval: {
      x: 0,
      y: 0,
    },
    isMouseDown: false,
    onClickGrid: (event: React.MouseEvent) => {
      set(() => ({ selectedServiceId: null }));
    },
    onMouseDownService: (event: React.MouseEvent, service: IService | null) => {
      set((state) => {
        if (service) {
          const newInterval = {
            x: event.clientX - service.x,
            y: event.clientY - service.y,
          };
          return {
            isMouseDown: true,
            selectedServiceId: service ? service.id : null,
            interval: newInterval,
          };
        }
        return {
          ...state,
          selectedServiceId: null,
        };
      });
    },
    onMouseUpService: (e: React.MouseEvent) => {
      set(() => ({
        isMouseDown: false,
      }));
    },
    onMouseMoveService: (event: React.MouseEvent) => {
      set((state) => {
        if (state.selectedServiceId && state.isMouseDown) {
          const updatedServices = [...state.services];
          const index = updatedServices.findIndex((item) => item.id === state.selectedServiceId);
          updatedServices[index].x = event.clientX - state.interval.x;
          updatedServices[index].y = event.clientY - state.interval.y;
          return {
            services: updatedServices,
          };
        }
        return state;
      });
    },
    addService: (service: IService) => set((state) => ({ services: [...state.services, service] })),
    removeService: (id: number) =>
      set((state) => ({
        services: state.services.filter((service) => service.id !== id),
      })),
    clearService: () => set(() => ({ services: [], selectedServiceId: null })),
  })),
);

export default useServiceStore;
