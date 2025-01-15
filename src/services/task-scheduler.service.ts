import * as debug from 'debug';
import { datefields, TJobDatefield } from 'src/types/jobParameters';
import { Injectable } from '@nestjs/common';
import { Job as JobParameters } from '@prisma/client';

const log = debug('Cron');

@Injectable()
export class Job<DATA = unknown | void> {
  readonly attrs: JobParameters;

  private cancelled?: Error | true;

  toJson(): JobParameters {
    const result = {} as JobParameters;

    for (const key of Object.keys(this.attrs)) {
      if (Object.hasOwnProperty.call(this.attrs, key)) {
        result[key] =
          datefields.includes(key as TJobDatefield) && this.attrs[key]
            ? new Date(this.attrs[key])
            : this.attrs[key];
      }
    }

    return result;
  }

  repeatEvery(
    interval: string,
    options: {
      timezone?: string;
      skipImmediate?: boolean;
    } = {},
  ): this {
    this.attrs.repeatInterval = interval;
    if (options.skipImmediate) {
      this.attrs.lastRunAt = this.attrs.nextRunAt || new Date();

      this.computeNextRunAt();

      this.attrs.lastRunAt = undefined;
    } else {
      this.computeNextRunAt();
    }

    return this;
  }


  private computeNextRunAt() {

    try {
        if (this.attrs.repeatInterval) {
            
        }
    }
  }
}
