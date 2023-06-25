import { devtools } from 'zustand/middleware';
import create from 'zustand';
import { IComponent, Services } from '@/src/types';

interface ServiceState {
  services: IComponent[];
  selectedService: IComponent | null;
  isMouseDown: boolean;
  interval: {
    x: number;
    y: number;
  };
}
interface ServiceActions {
  action: {
    addService: (service: Services) => void;
    removeService: (id: number) => void;
    clearService: () => void;
    onClickGrid: (event: React.MouseEvent) => void;
    onMouseDownService: (event: React.MouseEvent, service: IComponent | null) => void;
    onMouseUpService: (event: React.MouseEvent) => void;
    onMouseMoveService: (event: React.MouseEvent) => void;
  };
}

const useServiceStore = create<ServiceState & ServiceActions>()(
  devtools((set) => ({
    services: [],
    selectedService: null,
    interval: {
      x: 0,
      y: 0,
    },
    isMouseDown: false,
    action: {
      onClickGrid: (event: React.MouseEvent) => {
        set(() => ({ selectedService: null }));
      },
      onMouseDownService: (event: React.MouseEvent, service: IComponent | null) => {
        set((state) => {
          if (service) {
            const newInterval = {
              x: event.clientX - service.x,
              y: event.clientY - service.y,
            };
            return {
              isMouseDown: true,
              selectedService: service ? service : null,
              interval: newInterval,
            };
          }
          return {
            ...state,
            selectedService: null,
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
          if (state.selectedService && state.isMouseDown) {
            const updatedServices = [...state.services];
            const index = updatedServices.findIndex((item) => item.id === state.selectedService?.id);
            updatedServices[index].x = event.clientX - state.interval.x;
            updatedServices[index].y = event.clientY - state.interval.y;
            return {
              services: updatedServices,
            };
          }
          return state;
        });
      },
      addService: (service: IComponent) =>
        set((state) => ({ services: [...state.services, service], selectedService: null })),
      removeService: (id: number) =>
        set((state) => ({
          services: state.services.filter((service) => service.id !== id),
        })),
      clearService: () => set(() => ({ services: [], selectedService: null })),
    },
  })),
);

export const useServiceActions = () => useServiceStore((state) => state.action);

export default useServiceStore;
