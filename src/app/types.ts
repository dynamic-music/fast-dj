export enum DecisionType {
  Default,
  Random,
  DecisionTree
}

export enum TransitionType {
  FadeIn,
  Direct,
  BeatRepeat,
  Crossfade,
  Beatmatch,
  BeatmatchMultiple,
  EchoFreeze,
  PowerDown
}

export interface Transition {
  date: Date,
  user: string,
  rating: number,
  names: string[],
  features: number[],
  type: TransitionType,
  decision: DecisionType,
  parameters: number[],
  duration: number
}