import humanInterval = require('human-interval');

export const calculateProcessEvery = (input: number | string): number => {
  if (typeof input == 'number') return input;
  return (humanInterval(input) as number) / 1000 || 5000;
};
