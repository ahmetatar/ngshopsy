import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CampaignTypeSelectionContComponent} from './campaign-type-selection-cont.component';

describe('CampaignTypeSelectionContComponent', () => {
  let component: CampaignTypeSelectionContComponent;
  let fixture: ComponentFixture<CampaignTypeSelectionContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignTypeSelectionContComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignTypeSelectionContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
