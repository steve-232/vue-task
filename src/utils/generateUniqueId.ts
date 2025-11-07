export const generateUniqueId = (): number =>
  Math.round(Date.now() / Math.random());
