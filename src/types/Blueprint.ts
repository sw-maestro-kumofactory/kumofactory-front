import { IComponent } from '@/src/types/Services';
import { Line } from '@/src/types/Line';
import { Areas, IArea } from '@/src/types/Area';

export interface BlueprintResponse {
  name: string;
  components: Omit<IComponent, 'lines'>[];
  links: Line[];
  areas: IArea[];
}

export interface BlueprintInfo {
  id: number;
  name: string;
  createdAt: string;
}
