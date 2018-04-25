export enum TransitionType {
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
  features: number[],
  transition: TransitionType,
  parameters: number[],
  duration: number
}