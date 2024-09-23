import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatDateVN(
  date: string | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
) {
  if (!date) {
    return null;
  }

  return dayjs(date).utcOffset(7).format(format);
}

export function greaterThanNow(date: string | Date, days: number): boolean {
  return Math.abs(dayjs(date).diff(dayjs(), 'day')) >= days;
}

export function diffMinutes(dt1: string | Date, dt2: string | Date) {
  return dayjs(dt2).diff(dayjs(dt1), 'minutes');
}

export function startOfDay(date: string | Date) {
  return dayjs(date).tz('UTC').startOf('date').toISOString();
}

export function endOfDay(date: string | Date) {
  return dayjs(date).tz('UTC').endOf('date').toISOString();
}
