import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalConfirmServiceOptions {
  title: string;
  description: string;
  confirm: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmService {
  private _options = new Subject<ModalConfirmServiceOptions>();

  get options() {
    return this._options.asObservable();
  }

  show(options: ModalConfirmServiceOptions) {
    if (options && options.description) {
      this._options.next(options);
    }
  }
}
