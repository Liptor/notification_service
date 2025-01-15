import { Job as JobParameters } from '@prisma/client';

export type TJobDatefield = keyof Pick<
  JobParameters,
  'lastRunAt' | 'lastFinishedAt' | 'nextRunAt' | 'lockedAt'
>;

export const datefields: Array<TJobDatefield> = [
  'lastRunAt',
  'lastFinishedAt',
  'nextRunAt',
  'lockedAt',
];
