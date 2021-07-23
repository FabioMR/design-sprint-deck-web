import { Directive, ElementRef } from '@angular/core';
import Tooltip from 'bootstrap/js/src/tooltip';

@Directive({
  selector: '[data-bs-toggle="tooltip"]'
})
export class TooltipDirective {
  constructor(private el: ElementRef) {
    setTimeout(() => new Tooltip(this.el.nativeElement), 0);
  }
}
