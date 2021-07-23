import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastServiceOptions {
  text: string;
  kind: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _options = new Subject<ToastServiceOptions>();

  get options() {
    return this._options.asObservable();
  }

  show(options: ToastServiceOptions) {
    if (options && options.text) {
      this._options.next(options);
    }
  }
}
