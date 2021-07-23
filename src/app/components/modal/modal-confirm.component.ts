import { Component, OnInit } from '@angular/core';
import { ModalConfirmService } from '@app/services/modal-confirm.service';
import Modal from 'bootstrap/js/src/modal';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent implements OnInit {
  modal: Modal;

  title = '';
  description = '';

  confirmFuction: Function;
  confirming = false;

  constructor(
    private modalConfirmService: ModalConfirmService,
  ) { }

  ngOnInit() {
    this.modal = new Modal(document.getElementById('modalConfirm'), {
      backdrop: 'static',
      keyboard: false,
    });

    this.modalConfirmService.options.subscribe(options => {
      this.title = options.title;
      this.description = options.description;
      this.confirmFuction = options.confirm;
      options ? this.modal.show() : this.modal.hide();
    });
  }

  async confirm() {
    this.confirming = true;
    await this.confirmFuction();
    this.confirming = false;

    this.modal.hide();
  }
}
