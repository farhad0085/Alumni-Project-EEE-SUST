import re
from django.core.exceptions import ValidationError


class BatchSessionValidator:
    message = 'Enter a valid session in this form: 2010 - 11'
    code = 'invalid'

    def __init__(self, message=None, code=None):
        if message is not None:
            self.message = message
        if code is not None:
            self.code = code


    def __call__(self, value):
        if not re.fullmatch(r"[0-9]{4}\-[0-9]{2}", value): # match XXXX - XX format
            raise ValidationError(self.message, code=self.code)

        split_by_dash = value.split("-")
        start = split_by_dash[0].strip()
        end = start[:2] + split_by_dash[1].strip()
        difference = int(end) - int(start)
        if difference != 1:
            raise ValidationError(self.message, self.code)
