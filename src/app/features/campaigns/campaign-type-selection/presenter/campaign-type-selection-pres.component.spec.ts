import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CampaignTypeSelectionPresComponent} from './campaign-type-selection-pres.component';

describe('CampaignTypeSelectionPresComponent', () => {
  let component: CampaignTypeSelectionPresComponent;
  let fixture: ComponentFixture<CampaignTypeSelectionPresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignTypeSelectionPresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignTypeSelectionPresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be create cards by options', () => {});
});
