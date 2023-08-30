import { IComponent } from '@/src/types/Services';
import { Line } from '@/src/types/Line';
import { IArea } from '@/src/types/Area';
import { DeployState } from '@/src/types/Deploy';

export interface BlueprintResponse {
  uuid: string;
  name: string;
  description: string;
  downloadCount: number;
  scope: BlueprintScope;
  components: Omit<IComponent, 'lines'>[];
  links: Line[];
  areas: IArea[];
  svgFile: string;
}

export interface BlueprintInfo {
  id?: number;
  uuid: string;
  name: string;
  description: string;
  downloadCount?: number;
  scope: BlueprintScope;
  createdAt?: string;
  status: DeployState;
  presignedUrl?: string;
}

export type BlueprintScope = 'PUBLIC' | 'PRIVATE' | 'KUMOFACTORY';
