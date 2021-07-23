import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() name: string;
  @Input() size: number = 32;

  get href() {
    return `assets/bootstrap-icons.svg#${this.name}`;
  }
}
