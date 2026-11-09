export const groupBy = <T>(
  list: T[],
  keySelector: (item: T) => string
): Record<string, T[]> => {
  const result: Record<string, T[]> = Object.create(null);
  for (const item of list) {
    const key = keySelector(item);
    if (key in result) {
      result[key].push(item);
    } else {
      result[key] = [item];
    }
  }
  return result;
};
