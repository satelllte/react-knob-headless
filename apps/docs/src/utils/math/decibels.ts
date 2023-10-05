export const dbMin = -96;

export const gainToDecibels = (gain: number): number => {
  let res = 20 * Math.log10(gain);
  res = Number.isFinite(res) ? res : dbMin;
  res = Math.max(res, dbMin);
  return res;
};
