export const generateRandomNumber = (from: number, to: number): number =>
  from + Math.floor(Math.random() * (to - from + 1));
