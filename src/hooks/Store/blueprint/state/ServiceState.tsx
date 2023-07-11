import { IComponent, Services } from '@/src/types/Services';
import { Coordinate } from '@/src/types/Common';

export interface ServiceState {
  services: Record<string, Services>;
  selectedServiceId: string | null;
  lineDrawingMode: boolean;
  lineDrawingLocation: Coordinate;
  ServiceAction: {
    onMouseDownService: (e: React.MouseEvent, services: Services | null) => void;
    onMouseEnterService: (e: React.MouseEvent, services: Services | null) => void;
    onMouseLeaveService: (e: React.MouseEvent, services: Services | null) => void;
    createService: (service: Services) => void;
    setOptions: (service: IComponent) => void;
  };
}
