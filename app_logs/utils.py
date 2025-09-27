import traceback
from pprint import pprint
from app_logs.models import Log


class LogHelper:

    base_name = None

    def __init__(self, base_name=None):
        """
        Args:
            base_name (str): base name of the log, to append before the message (usually app name)
        """
        self.base_name = base_name
    
    def get_processed_message(self, message):
        if self.base_name:
            message = f"{self.base_name}: {message}"
        return message
    
    def log_error(self, message, error=None, cron=False):
        if error:
            message = f"{message}: {str(error)}"
        message = f"[ERROR] {self.get_processed_message(message)}"
        print(message)
        
        if error:
            traceback_str = "".join(traceback.format_exception(None, error, error.__traceback__))
        else:
            traceback_str = ""
        self._create_database_log(message + "\n\n" + traceback_str, "error", cron)

    def log_info(self, message, cron=False, show_in_console=True, pretty=False, save_db=True):
        message = f"[INFO] {self.get_processed_message(message)}"
        
        if show_in_console:
            if pretty:
                pprint(message)
            else:
                print(message)

        # save only when save_db = True, no need to save everything
        if save_db:
            self._create_database_log(message, "info", cron)
    
    def _create_database_log(self, message, log_level, is_cron):

        Log.objects.create(
            log_level=log_level,
            message=message,
            is_cron=is_cron,
        )

