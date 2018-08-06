export enum DecisionType {
  Default,
  Random,
  DecisionTree
}

export enum TransitionType {
  FadeIn,
  Slam,
  BeatRepeat,
  Crossfade,
  Beatmatch,
  BeatmatchMultiple,
  EchoFreeze,
  PowerDown,
  Effects
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