export interface TutorialState {
  isDone: boolean;
  tutorialNumber: number;
  tutorialAction: {
    decreaseNumber: () => void;
    increaseNumber: () => void;
    setIsDone: () => void;
  };
}
