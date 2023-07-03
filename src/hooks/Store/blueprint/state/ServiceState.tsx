import { IComponent, Services } from '@/src/types/Services';

export interface ServiceState {
  services: Record<string, Services>;
  selectedServiceId: string | null;
  lineDrawingMode: boolean;
  ServiceAction: {
    onMouseDownService: (e: React.MouseEvent, services: Services | null) => void;
    setLineDrawingMode: () => void;
    createService: (service: Services) => void;
    setOptions: (service: IComponent) => void;
  };
}
