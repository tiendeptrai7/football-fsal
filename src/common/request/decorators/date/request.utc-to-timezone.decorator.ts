import { Transform } from 'class-transformer';
import dayjs, { OpUnitType } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function UtcToTimezone(): PropertyDecorator {
  return Transform(({ value }) => {
    if (!value) return value;

    const timeZone = process.env.TIMEZONE_DB || 'UTC';
    return dayjs(value).tz(timeZone).toISOString();
  });
}

export function StartOf(unit: OpUnitType): PropertyDecorator {
  return Transform(({ value }) => {
    if (!value) return value;

    const timeZone = process.env.TIMEZONE_DB || 'UTC';

    return dayjs(value).tz(timeZone).startOf(unit).toISOString();
  });
}

export function EndOf(unit: OpUnitType): PropertyDecorator {
  return Transform(({ value }) => {
    if (!value) return value;

    const timeZone = process.env.TIMEZONE_DB || 'UTC';

    return dayjs(value).tz(timeZone).endOf(unit).toISOString();
  });
}
