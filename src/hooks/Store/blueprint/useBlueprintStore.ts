import { devtools } from 'zustand/middleware';
import create from 'zustand';
import { IComponent, ServiceOptions, Services } from '@/src/types/Services';
import { immer } from 'zustand/middleware/immer';
import { v1 } from 'uuid';

interface ServiceState {
  action: {
    addService: (service: Services) => void;
    removeService: () => void;
    clearService: () => void;
    onClickGrid: (event: React.MouseEvent) => void;
    onMouseDownService: (event: React.MouseEvent, service: IComponent | null) => void;
    onMouseUpService: (event: React.MouseEvent) => void;
    onMouseMoveService: (event: React.MouseEvent) => void;
    setOptions: (options: ServiceOptions) => void;
  };
}

const useServiceStore = create<ServiceState>()(
  devtools(
    immer((set, get) => ({
      services: {},
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
              const newX = Math.round((event.clientX - state.interval.x) / 22.5) * 22.5;
              const newY = Math.round((event.clientY - state.interval.y) / 22.5) * 22.5;
              state.services[state.selectedService.id].x = newX;
              state.services[state.selectedService.id].y = newY;
              return state;
            }
          });
        },
        addService: (service: Services) =>
          set((state) => {
            const id = v1().toString();
            state.services[id] = {
              ...service,
              id,
            };
          }),
        removeService: () =>
          set((state) => {
            if (state.selectedService !== null) {
              state.services = Object.fromEntries(
                Object.entries(state.services).filter(([key, service]) => service.id !== state.selectedService!.id),
              );
            }
            state.selectedService = null;
          }),
        clearService: () => set(() => ({ services: [], selectedService: null })),
        setOptions: (options: ServiceOptions) => {
          if (get().selectedService) {
            set((state) => {
              state.services[get().selectedService!.id].options = options;
            });
          }
        },
      },
    })),
  ),
);

export const useServiceActions = () => useServiceStore((state) => state.action);

export default useServiceStore;
