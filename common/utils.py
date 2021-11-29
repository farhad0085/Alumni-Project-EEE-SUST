from typing import List
from dateutil.relativedelta import relativedelta
import datetime
from dateutil.rrule import rrule, MONTHLY
import math
import logging


class HelperMethods:
    @property
    def today(self) -> datetime.date:
        """Get today's date"""

        return datetime.date.today()

    @property
    def month_first_date(self) -> datetime.date:
        """Get current month's first day's date"""

        return self.today.replace(day=1)

    @property
    def week_first_date(self) -> datetime.date:
        """Get current week's first day's date"""

        start = self.today - datetime.timedelta(days=self.today.weekday())
        return start

    @property
    def yesterday(self) -> datetime.date:
        """Get yesterday's date"""

        return self.today - datetime.timedelta(days=1)

    @property
    def days_7_ago(self) -> datetime.date:
        """Get 7 days ago from today's date"""

        return self.days_n_ago(7)

    @property
    def previous_month_first_date(self) -> datetime.date:
        """Get last month's first day's date"""

        return self.previous_month_last_date.replace(day=1)

    @property
    def previous_month_last_date(self) -> datetime.date:
        """Get last month's last day's date"""

        return self.today.replace(day=1) - datetime.timedelta(days=1)

    @property
    def previous_week_first_date(self) -> datetime.date:
        """Get last week's first day's date"""

        return self.previous_week_last_date - datetime.timedelta(days=6)

    @property
    def previous_week_last_date(self) -> datetime.date:
        """Get last week last day's date"""

        return self.week_first_date - datetime.timedelta(days=1)

    @property
    def days_30_ago(self) -> datetime.date:
        """Get 30 days ago from today's date"""

        return self.days_n_ago(30)

    def days_n_ago(self, n) -> datetime.date:
        """Get n days ago's date"""

        return self.today - datetime.timedelta(days=n - 1)

    def stringify_date_range(self, start: datetime.date, end: datetime.date, format: str = "%d %b, %Y"):
        """Get string version for two dates"""
        
        start_date = start.strftime(format)
        end_date = end.strftime(format)
        return f"{start_date} - {end_date}"

    def _get_last_months(self, start_date, months):
        for i in range(months):
            yield start_date
            start_date += relativedelta(months = -1)

    def get_last_n_month(self, n) -> List[datetime.date]:
        """
        Get last n month's dates
        Example: 01-01-2021, 01-02-2021...
        """

        start_date=datetime.date.today().replace(day=1)
        return list(reversed([i for i in self._get_last_months(start_date, n)]))

    def get_months(self, start_date, end_date) -> List[datetime.date]:
        """Get all months between two dates"""

        dates = [dt for dt in rrule(MONTHLY, dtstart=start_date, until=end_date)]
        return dates

    @property
    def year_first_date(self) -> datetime.date:
        """Get current year's first day's date"""

        return self.today.replace(day=1, month=1)

    @property
    def last_year_first_date(self) -> datetime.date:
        """Get last year's first day's date"""

        return self.last_year_last_date.replace(day=1, month=1)

    @property
    def last_year_last_date(self) -> datetime.date:
        """Get last year's last day's date"""

        return self.year_first_date - datetime.timedelta(days=1)

    @property
    def current_quarter(self) -> int:
        """Get current quarter number"""

        return math.ceil(self.today.month / 3)

    @property
    def current_quarter_first_date(self) -> datetime.date:
        """Get current quarter's first day's date"""
        
        current_quarter = self.current_quarter
        month = 1 if current_quarter == 1 else 4 if current_quarter == 2 else 7 if current_quarter == 3 else 10
        return self.today.replace(day=1, month=month)

    @property
    def previous_quarter_first_date(self) -> datetime.date:
        """Get last quarter's first day's date"""

        return self.previous_quarter_last_date.replace(month=self.previous_quarter_last_date.month - 2, day=1)

    @property
    def previous_quarter_last_date(self) -> datetime.date:
        """Get last quarter's last day's date"""
        
        return self.current_quarter_first_date - datetime.timedelta(days=1)
    
    def weeks_dates(self, start_date) -> List[datetime.date]:
        """Get all weeks's start dates and today"""

        start = self.week_first_date
        end = self.today

        weeks = []
        while True:
            weeks.append([start, end])
            end = start - datetime.timedelta(days=1)
            start = end - datetime.timedelta(days=6)

            if start < start_date:
                break
        
        weeks.reverse()
        return weeks

    def get_dates(self, start_date: datetime.date, end_date: datetime.date) -> List[datetime.date]:
        """
        Get all dates between start_end and end_date
        
        Input: start_date=2021-03-03, end_date=2021-03-09
        Output: [2021-03-03, 2021-03-04, 2021-03-05, ... 2021-03-09]
        """

        day_difference = (end_date - start_date).days
        dates = [end_date - datetime.timedelta(days=i) for i in range(day_difference + 1)]
        dates.reverse()
        return dates


    def number_human_format(self, num: int) -> str:
        """
        Format a large number to string
        Example: 6543165413 => 6.54B
        """

        num = float('{:.3g}'.format(num))
        magnitude = 0
        while abs(num) >= 1000:
            magnitude += 1
            num /= 1000.0
        return '{}{}'.format('{:f}'.format(num).rstrip('0').rstrip('.'), ['', 'K', 'M', 'B', 'T'][magnitude])


class LogHelper:
    
    info_logger = logging.getLogger('info_logger')
    error_logger = logging.getLogger('error_logger')
    cron_logger = logging.getLogger('cron_logger')

    def log_error(self, message, error=None, cron=False):
        if error:
            message = f"{message}: {str(error)}"
        print(message)
        if cron:
            self.cron_logger.error(message, exc_info=True)
        else:
            self.error_logger.error(message, exc_info=True)


    def log_info(self, message, cron=False):
        print(message)
        if cron:
            self.cron_logger.info(message)
        else:
            self.info_logger.info(message)
