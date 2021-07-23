import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-environment-label',
  templateUrl: './environment-label.component.html',
  styleUrls: ['./environment-label.component.scss']
})
export class EnvironmentLabelComponent {
  label = environment.label;
}
