export const compareObjects = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const compareArrays = (a, b) => {
  if (a.length !== b.length) return false;

  const set = new Set([...a, ...b]);
  return set.size === a.length;
};
