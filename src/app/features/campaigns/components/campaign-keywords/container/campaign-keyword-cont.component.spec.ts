import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignKeywordContComponent } from './campaign-keyword-cont.component';

describe('CampaignKeywordContComponent', () => {
  let component: CampaignKeywordContComponent;
  let fixture: ComponentFixture<CampaignKeywordContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CampaignKeywordContComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignKeywordContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
