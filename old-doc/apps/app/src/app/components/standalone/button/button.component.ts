import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() value = 'Button';
  @Output() clicked = new EventEmitter<void>();
  onClick($event: MouseEvent) {
    this.clicked.emit();
  }
}
