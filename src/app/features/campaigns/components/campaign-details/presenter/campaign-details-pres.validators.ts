import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {dateUtils} from '@core/utils';

/**
 * Gets form level date validator function.
 *
 * @returns Form level validator function
 */
export function dateValidatorFn(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const startDate = Date.parse(formGroup.get('startDate')?.value);
    const endDate = Date.parse(formGroup.get('endDate')?.value);
    const indefiniteCampaign = formGroup.get('indefiniteCampaign')?.value as boolean;

    const cond1 = !isNaN(startDate) && startDate >= dateUtils.now();
    const cond2 = !indefiniteCampaign ? !isNaN(endDate) && endDate > startDate : true;

    return !(cond1 && cond2) ? {invalidDates: true} : null;
  };
}
