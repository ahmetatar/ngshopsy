import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {UiMessageCloseDirective} from './ui-message-close.directive';

describe('Alert directive tests', () => {
  @Component({
    template: `<div messageClosed (closed)="onMessageClosed()" class="alert"></div>`,
  })
  class DummyComponent {
    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    onMessageClosed() {}
  }

  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [UiMessageCloseDirective],
      declarations: [DummyComponent],
    }).createComponent(DummyComponent);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('.alert'));
    component.onMessageClosed = jest.fn();
  });

  it('should trigger event when message closed', () => {
    const event = new CustomEvent('close.bs.alert');
    (debugElement.nativeElement as HTMLDivElement).dispatchEvent(event);
    fixture.detectChanges();

    expect(component.onMessageClosed).toHaveBeenCalled();
  });
});
