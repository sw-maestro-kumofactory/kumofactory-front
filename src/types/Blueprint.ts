import { IComponent } from '@/src/types/Services';
import { Line } from '@/src/types/Line';

export interface BlueprintResponse {
  name: string;
  components: Omit<IComponent, 'lines'>[];
  links: Line[];
}

export interface BlueprintInfo {
  id: number;
  name: string;
  createdAt: string;
}
