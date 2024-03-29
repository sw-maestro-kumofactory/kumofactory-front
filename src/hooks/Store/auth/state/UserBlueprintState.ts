import { BlueprintInfo } from '@/src/types/Blueprint';

interface bluePrintWithSaveState extends BlueprintInfo {
  saved: boolean;
}

export interface UserBlueprintState {
  userBlueprints: Record<string, bluePrintWithSaveState>;
  userBlueprintsIds: string[];
  UserBlueprintAction: {
    addUserBlueprint: (blueprint: BlueprintInfo, saved: boolean) => void;
    deleteUserBlueprint: (blueprintId: string) => void;
    setUserBlueprints: (blueprints: BlueprintInfo[], saved: boolean) => void;
    editUserBlueprints: (blueprint: BlueprintInfo, saved: boolean) => void;
  };
}
