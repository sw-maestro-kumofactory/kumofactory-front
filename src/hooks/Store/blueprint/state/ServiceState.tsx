import { IComponent } from '@/src/types/Services';
import { Coordinate } from '@/src/types/Common';

export interface ServiceState {
  services: Record<string, IComponent>;
  selectedServiceId: string | null;
  doubleClickedServiceId: string | null;
  isLineDrawing: boolean;
  lineDrawingLocation: Coordinate;
  ServiceAction: {
    onMouseDownService: (e: React.MouseEvent, services: IComponent | null) => void;
    onMouseEnterService: (e: React.MouseEvent, services: IComponent | null) => void;
    onMouseLeaveService: (e: React.MouseEvent, services: IComponent | null) => void;
    onDoubleClickService: (e: React.MouseEvent, services: IComponent | null) => void;
    createService: (service: IComponent, id: string) => void;
    setOptions: (service: IComponent) => void;
  };
}
