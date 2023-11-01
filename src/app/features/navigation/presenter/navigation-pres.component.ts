import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationModel} from '../contracts/navigation.contract';

@Component({
  selector: 'ngs-navigation-pres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-pres.component.html',
  styleUrls: ['./navigation-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationPresComponent {
  /**
   * Navbar title
   */
  @Input()
  title: string = 'Navbar';

  /**
   * Navigation model
   */
  @Input()
  navigationModel!: NavigationModel | null;

  /**
   * Logout request event
   */
  @Output()
  logout: EventEmitter<void> = new EventEmitter();
}
