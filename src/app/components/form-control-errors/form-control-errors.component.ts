import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-errors',
  templateUrl: './form-control-errors.component.html',
})
export class FormControlErrorsComponent {
  @Input() control: FormControl;
}
