import { format, getISOWeek, isSameDay, subDays } from "date-fns";
import { pl } from "date-fns/locale";

export class TimeAgo {
  static transform(value) {
    const date = typeof value === "string" ? new Date(value) : value;
    return this.timeDifference(new Date(), new Date(date));
  }

  static chatMessageTransform(value) {
    const date = typeof value === "string" ? new Date(value) : value;
    const yesterday = subDays(new Date(), 1);
    if (isSameDay(date, new Date())) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else if (getISOWeek(new Date()) === getISOWeek(date) || getISOWeek(new Date()) - getISOWeek(date) === 1) {
      return format(date, "EEEE");
    } else {
      return format(date, "d MMMM yyyy");
    }
  }

  static dayMonthYear(value) {
    const date = typeof value === "string" ? new Date(value) : value;
    return format(date, "d MMMM yyyy", { locale: pl });
  }

  static timeFormat(value) {
    const date = typeof value === "string" ? new Date(value) : value;
    return format(date, "HH:mm a", { locale: pl });
  }

  static timeDifference(current, date) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const elapsed = current.valueOf() - date.valueOf();

    if (format(current, "yyyy") === format(date, "yyyy")) {
      if (elapsed < msPerMinute) {
        return this.secondsAgo(elapsed);
      } else if (elapsed < msPerHour) {
        return this.minutesAgo(elapsed, msPerMinute);
      } else if (elapsed < msPerDay) {
        return this.hoursAgo(elapsed, msPerHour);
      } else if (elapsed < msPerMonth) {
        return this.monthsAgo(date, elapsed, msPerDay);
      } else {
        return format(date, "MMM d");
      }
    } else {
      return format(date, "MMM d, yyyy");
    }
  }

  static secondsAgo(elapsed) {
    if (Math.round(elapsed / 1000) <= 1) {
      return "a second ago";
    } else {
      return `${Math.round(elapsed / 1000)} seconds ago`;
    }
  }

  static minutesAgo(elapsed, msPerMinute) {
    if (Math.round(elapsed / msPerMinute) <= 1) {
      return "a minute ago";
    } else {
      return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    }
  }

  static hoursAgo(elapsed, msPerHour) {
    if (Math.round(elapsed / msPerHour) <= 1) {
      return "an hour ago";
    } else {
      return `${Math.round(elapsed / msPerHour)} hours ago`;
    }
  }

  monthsAgo(date, elapsed, msPerDay) {
    if (Math.round(elapsed / msPerDay) <= 7) {
      return format(date, "eeee");
    } else {
      return format(date, "MMM d");
    }
  }
}
