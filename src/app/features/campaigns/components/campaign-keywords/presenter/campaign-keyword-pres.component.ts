import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation, inject} from '@angular/core';
import {NgFor} from '@angular/common';
import {CampaignKeywordItemComponent} from '../sub-components';
import {FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Keyword} from '@features/campaigns/campaigns.model';
import {
  ACTION_BUTTONS,
  ACTION_CONTINUE,
  ActionButtonsComponent,
  ButtonClickedEvent,
  ModalComponent,
  ModalDismissDirective,
  ModalTriggerDirective,
} from '@shared/components';

@Component({
  selector: 'ngs-campaign-keyword-pres',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    CampaignKeywordItemComponent,
    ActionButtonsComponent,
    ModalComponent,
    ModalTriggerDirective,
    ModalDismissDirective,
  ],
  templateUrl: './campaign-keyword-pres.component.html',
  styleUrls: ['./campaign-keyword-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignKeywordPresComponent {
  private readonly fb = inject(FormBuilder);
  public readonly buttons = inject(ACTION_BUTTONS);

  @Output()
  keywordsAdded: EventEmitter<(Keyword | null)[]> = new EventEmitter();

  /** Bridge form control for textarea */
  keywordListControl = new FormControl('', {nonNullable: true, validators: [Validators.required]});

  /** Form group for keywords */
  form = this.fb.group({
    keywords: new FormArray<FormControl<Keyword | null>>([]),
  });

  /** Form accessor for keywords */
  get keywords() {
    return this.form.controls.keywords;
  }

  /** Delete button handler for keyword rows */
  onDeleteButtonClicked(index: number) {
    this.form.controls.keywords.removeAt(index);
  }

  onAddKeywords() {
    if (this.keywordListControl.valid) {
      this.keywordListControl.value
        .split(/\n/)
        .map((keyword) => new FormControl({keyword, bid: 1, matchType: 1}))
        .forEach((control) => this.keywords.push(control));

      this.keywordListControl.setValue('');
    }
  }

  onKeywordsSubmit(e: ButtonClickedEvent) {
    if (e.source.name == ACTION_CONTINUE && this.keywords.controls.length > 0) {
      this.keywordsAdded.emit(this.keywords.value);
    }
  }
}
