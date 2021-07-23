import { Component, OnInit } from '@angular/core';
import { ModalAlertService } from '@app/services/modal-alert.service';
import Modal from 'bootstrap/js/src/modal';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html'
})
export class ModalAlertComponent implements OnInit {
  modal: Modal;

  title = '';
  description = '';

  constructor(
    private modalAlertService: ModalAlertService,
  ) { }

  ngOnInit() {
    this.modal = new Modal(document.getElementById('modalAlert'));

    this.modalAlertService.options.subscribe(options => {
      this.title = options.title || 'Atenção';
      this.description = options.description;
      options ? this.modal.show() : this.modal.hide();
    });
  }
}
