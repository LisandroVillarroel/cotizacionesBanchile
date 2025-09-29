import { MatDateFormats } from '@angular/material/core';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/yyyy',
  },
  display: {
    dateInput: 'DD/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM ',
  },
};
