import {Component} from '@angular/core';
import {SvgDirective} from './svg.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SVG_IMAGE_OPTIONS, SvgImageService, SvgImageServiceFixture} from '@core/svg-utils';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'dummy',
  template: `<div data-test-id="logo" svg="logo"></div>`,
})
class DummyComponent {}

describe('SvgDirective', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let svgImageServiceFixture: SvgImageServiceFixture;

  beforeEach(async () => {
    svgImageServiceFixture = new SvgImageServiceFixture();
    svgImageServiceFixture.loadSvg.mockImplementation(() => of('<svg xmlns=""></svg>'));

    await TestBed.configureTestingModule({
      declarations: [DummyComponent],
      imports: [SvgDirective],
      providers: [
        {provide: SVG_IMAGE_OPTIONS, useValue: {path: 'dummy/path'}},
        {provide: SvgImageService, useValue: svgImageServiceFixture},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
  });

  it('should load svg file and append to dom', () => {
    fixture.detectChanges();
    const logoDiv = fixture.debugElement.query(By.css('[data-test-id="logo"]'));
    expect(logoDiv.nativeElement.innerHTML).toBe('<svg xmlns=""></svg>');
  });
});
