import { Injectable } from '@angular/core';
import {
  startOfWeek,
  add,
  differenceInMilliseconds,
  getWeek,
  subWeeks,
  addWeeks,
  getDay,
} from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateParserService {
  constructor() {}

  getTodayStartOfWeek(): Date {
    return startOfWeek(new Date(), { weekStartsOn: 1 });
  }

  getWorkingDays(firstDay?: Date): Date[] {
    const days = [];
    firstDay = firstDay ? firstDay : this.getTodayStartOfWeek();
    days.push(firstDay);
    for (let dayCount = 1; dayCount < 5; dayCount++) {
      days.push(add(new Date(firstDay), { days: dayCount }));
    }
    return days;
  }

  getWeekofCalender(day?: Date): number {
    return getWeek(day ? new Date(day) : new Date(), { weekStartsOn: 1 });
  }

  getPreviousWeek(day: Date): Date {
    return subWeeks(new Date(day), 1);
  }

  getNextWeek(day: Date): Date {
    return addWeeks(new Date(day), 1);
  }

  getDayOfWeekIndex(day: number): number {
    return getDay(new Date(day * 1000));
  }

  isDateInDisplayedWeek(date: number, weekStart: Date, weekEnd: Date): boolean {
    return (
      new Date(date * 1000) >= new Date(weekStart) &&
      new Date(date * 1000) <= new Date(weekEnd)
    );
  }

  /**
   * @param start start date in seconds format or date format
   * @param end end date in seconds format or date format
   * @returns duration for the input dates task as duration = difference + 1 ex: zero diff is one day
   */
  getTaskDuration(start: number | Date, end: number | Date): number {
    if (typeof start === 'number') {
      start = start * 1000;
    }
    if (typeof end === 'number') {
      end = end * 1000;
    }
    const differenceInMSeconds = differenceInMilliseconds(end , start);
    return Math.round(differenceInMSeconds / (1000 * 60 * 60 * 24) + 1);
  }

  isTaskStartedInPreviousWeek(weekStart: Date, noteStartDate: number): boolean {
    return new Date(weekStart) > new Date(noteStartDate * 1000);
  }

  isTaskFinishedBeforeEndOfWeek(weekEnd: Date, noteEndDate: number): boolean {
    return new Date(noteEndDate * 1000) <= new Date(weekEnd);
  }

  getEndDate(startDate: Date, duration: number): Date {
    return add(new Date(startDate), { days: duration - 1 });
  }

  formatDateInSeconds(date: Date): number {
    return Math.round(new Date(date).getTime() / 1000);
  }
}
