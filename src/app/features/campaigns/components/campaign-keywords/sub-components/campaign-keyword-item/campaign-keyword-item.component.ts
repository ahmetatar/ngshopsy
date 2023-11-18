import {NgClass, NgIf} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import {Keyword} from '@features/campaigns/campaigns.model';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'ngs-campaign-keyword-item',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './campaign-keyword-item.component.html',
  styleUrls: ['./campaign-keyword-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CampaignKeywordItemComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CampaignKeywordItemComponent),
      multi: true,
    },
  ],
})
export class CampaignKeywordItemComponent implements ControlValueAccessor, Validator {
  private readonly fb = inject(FormBuilder);
  private formComparator = (prev: Partial<Keyword>, curr: Partial<Keyword>) =>
    JSON.stringify(prev) === JSON.stringify(curr);

  form = this.fb.group({
    keyword: ['', [Validators.required]],
    bid: [0, [Validators.required, Validators.min(1)]],
    matchType: [1],
  });

  disabled: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};
  onValidationChange: any = () => {};

  @Input()
  index: number = 0;

  @Output()
  deleteClicked: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.form.valueChanges.pipe(
      debounceTime(250), 
      distinctUntilChanged(this.formComparator)).subscribe((values) => {
        this.onChange(values);
        this.onValidationChange();
      });
  }

  validate(): ValidationErrors | null {
    if (this.form.invalid) {
      return {invalid: true};
    } else {
      return null;
    }
  }

  registerOnValidatorChange?(fn: () => void) {
    this.onValidationChange = fn;
  }

  writeValue(keyword: Keyword) {
    if (keyword) {
      this.form.setValue(keyword);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
