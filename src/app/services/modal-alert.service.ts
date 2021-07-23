import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalAlertServiceOptions {
  title?: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalAlertService {
  private _options = new Subject<ModalAlertServiceOptions>();

  get options() {
    return this._options.asObservable();
  }

  show(options: ModalAlertServiceOptions) {
    if (options && options.description) {
      this._options.next(options);
    }
  }
}
