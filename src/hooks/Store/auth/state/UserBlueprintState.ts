import { BlueprintInfo } from '@/src/types/Blueprint';

export interface UserBlueprintState {
  userBlueprints: BlueprintInfo[];
  UserBlueprintAction: {
    setUserBlueprints: (blueprints: BlueprintInfo[]) => void;
  };
}
