export const parsedNumberString = (n: string) => {
  if (Number.isNaN(Number(n))) {
    return NaN;
  }
  return Math.round(Number(n) * 100) / 100;
};
