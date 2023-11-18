import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignListContComponent } from './campaign-list-cont.component';

describe('CampaignListContComponent', () => {
  let component: CampaignListContComponent;
  let fixture: ComponentFixture<CampaignListContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CampaignListContComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignListContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
