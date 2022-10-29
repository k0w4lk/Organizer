import angular from 'angular';

const appModule = angular.module('organizerApp');

appModule.component('appCalendar', {
  templateUrl: 'components/calendar/appCalendar.html',
});

appModule.controller('calendarController', function () {
  this.currentDate = new Date();
  this.currentMonth = this.currentDate.getMonth();
  this.currentYear = this.currentDate.getFullYear();

  this.currentMonthDates = [];

  this.columnsBeforeFirstDate = 0;

  this.holidays = [
    { month: 0, day: 1 },
    { month: 0, day: 7 },
    { month: 2, day: 8 },
    { month: 4, day: 1 },
    { month: 4, day: 9 },
    { month: 6, day: 3 },
    { month: 10, day: 7 },
    { month: 11, day: 25 },
  ];

  this.days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  this.setCurrentMonthDates = () => {
    const lastDayTimestamp = new Date(
      this.currentYear,
      this.currentMonth + 1,
    ).setDate(0);
    const lastDay = new Date(lastDayTimestamp).getDate();

    this.currentMonthDates = [];

    for (let dateIndex = 1; dateIndex <= lastDay; dateIndex++) {
      const date = new Date(this.currentYear, this.currentMonth, dateIndex, 0);
      const day = date.getDay();

      const today =
        date.toLocaleDateString() === this.currentDate.toLocaleDateString();

      const weekend = day === 0 || day === 6;

      const holiday = this.holidays.some(
        (item) => item.day === dateIndex && item.month === this.currentMonth,
      );

      const dateData = {
        date: dateIndex,
        weekend,
        today,
        holiday,
      };

      this.currentMonthDates.push(dateData);
    }

    const firstDateDay = new Date(this.currentYear, this.currentMonth).getDay();

    this.columnsBeforeFirstDate = firstDateDay ? firstDateDay - 1 : 6;
  };

  this.openPreviousMonth = () => {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }

    this.setCurrentMonthDates();
  };

  this.openNextMonth = () => {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }

    this.setCurrentMonthDates();
  };

  this.openCurrentMonth = () => {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();

    this.setCurrentMonthDates();
  };
});

appModule.directive('gridSpace', () => ({
  scope: false,
  link: (scope, element, attrs) => {
    const firstDate = scope[attrs.gridSpace];

    if (firstDate) {
      element.css(
        'grid-column-start',
        `${element.controller().columnsBeforeFirstDate + 1}`,
      );
    }
  },
}));

appModule.filter('getMonthName', () => (month) => {
  const date = new Date(new Date().setMonth(month, 1)).toLocaleString(
    'default',
    { month: 'long' },
  );

  return date;
});
