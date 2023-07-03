import { IComponent, Services } from '@/src/types/Services';

export interface ServiceState {
  services: Record<string, Services>;
  selectedService: IComponent | null;
  lineContainerLocation: { x: number; y: number };
  ServiceAction: {
    onMouseDownService: (e: React.MouseEvent, services: Services | null) => void;
    createService: (service: Services) => void;
    setOptions: (service: IComponent) => void;
  };
}
