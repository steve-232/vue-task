import { generateRandomNumber } from "./generateRandomNumber";

export const pickAndRemove = <T>(pool: T[]) => {
  const indx = generateRandomNumber(0, pool.length - 1);
  const [res] = pool.splice(indx, 1);

  return res as T;
};
