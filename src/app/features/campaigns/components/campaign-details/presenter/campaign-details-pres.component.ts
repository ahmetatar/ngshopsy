import {NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {dateValidatorFn} from './campaign-details-pres.validators';
import {Campaign} from '@features/campaigns';

@Component({
  selector: 'ngs-campaign-details-pres',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './campaign-details-pres.component.html',
  styleUrls: ['./campaign-details-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetailsPresComponent {
  private fb = inject(FormBuilder);

  /** Campaign details submitted event */
  @Output()
  formSubmitted = new EventEmitter<Campaign>();

  /** Campaign setting form */
  form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      budget: [1, [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      indefiniteCampaign: [false],
    },
    {validators: [dateValidatorFn()]},
  );

  constructor() {
    this.form.value;
    this.form.controls.indefiniteCampaign.valueChanges.pipe(takeUntilDestroyed()).subscribe((checked) => {
      this.form.controls.endDate.clearValidators();
      this.form.controls.endDate.setValue('');
      this.form.controls.endDate.setValidators(checked ? [Validators.nullValidator] : [Validators.required]);
      this.form.controls.endDate.updateValueAndValidity();
    });
  }

  onFormSubmit(campaignForm: Partial<Campaign>) {
    this.formSubmitted.emit(new Campaign(campaignForm));
  }
}
