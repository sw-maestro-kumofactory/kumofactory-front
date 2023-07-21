import { IComponent } from '@/src/types/Services';
import { Line } from '@/src/types/Line';
import { Areas } from '@/src/types/Area';

export interface BlueprintResponse {
  name: string;
  components: Omit<IComponent, 'lines'>[];
  links: Line[];
  areas: Areas[];
}

export interface BlueprintInfo {
  id: number;
  name: string;
  createdAt: string;
}
