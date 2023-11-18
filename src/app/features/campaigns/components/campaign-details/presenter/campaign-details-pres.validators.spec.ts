import {FormControl, FormGroup} from '@angular/forms';
import {dateValidatorFn} from './campaign-details-pres.validators';
import {dateUtils} from '@core/utils';

describe('Validators tests of campaign details presenter', () => {
  it('should valid campaign dates', () => {
    const validatorFn = dateValidatorFn();
    dateUtils.now = jest.fn(() => 1702155600261);

    const formGroup = new FormGroup({
      startDate: new FormControl('2023-12-10'),
      endDate: new FormControl('2024-01-01'),
      indefiniteCampaign: new FormControl(false),
    });

    const result = validatorFn(formGroup);
    expect(result).toBeNull();
  });

  it('should invalid campaign dates if given dates is wrong', () => {
    const validatorFn = dateValidatorFn();
    dateUtils.now = jest.fn(() => 1702155600261);

    const formGroup = new FormGroup({
      startDate: new FormControl('2023-12-08'),
      endDate: new FormControl('2023-12-20'),
      indefiniteCampaign: new FormControl(false),
    });

    const result = validatorFn(formGroup);
    expect(result).toEqual({invalidDates: true});
  });

  it('should valid campaign dates if campaing is indefinite', () => {
    const validatorFn = dateValidatorFn();
    dateUtils.now = jest.fn(() => 1702155600261);

    const formGroup = new FormGroup({
      startDate: new FormControl('2023-12-11'),
      endDate: new FormControl(null),
      indefiniteCampaign: new FormControl(true),
    });

    const result = validatorFn(formGroup);
    expect(result).toBeNull();
  });
});
