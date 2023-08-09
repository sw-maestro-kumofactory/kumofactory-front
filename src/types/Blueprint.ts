import { IComponent } from '@/src/types/Services';
import { Line } from '@/src/types/Line';
import { IArea } from '@/src/types/Area';

export interface BlueprintResponse {
  uuid: string;
  name: string;
  components: Omit<IComponent, 'lines'>[];
  links: Line[];
  areas: IArea[];
  svgFile: string;
}

export interface BlueprintInfo {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
}
