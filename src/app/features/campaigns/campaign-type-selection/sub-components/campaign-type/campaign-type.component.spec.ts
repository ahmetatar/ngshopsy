import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CampaignTypeComponent} from './campaign-type.component';

describe('CampaignTypeComponent', () => {
  let component: CampaignTypeComponent;
  let fixture: ComponentFixture<CampaignTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
