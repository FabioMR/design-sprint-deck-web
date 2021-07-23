import { Component, OnInit } from '@angular/core';
import { ToastService } from '@app/services/toast.service';
import Toast from 'bootstrap/js/src/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit {
  text;
  kind;

  constructor(
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    const toast = new Toast(document.getElementById('toast'));

    this.toastService.options.subscribe(options => {
      this.text = options.text;
      this.kind = options.kind;
      toast.show();
    });
  }
}
