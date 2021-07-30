import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { ModalAlertService } from '@app/services/modal-alert.service';

@Component({
  templateUrl: './card-new.component.html',
})
export class CardNewComponent implements OnInit {

  form: FormGroup;
  saving = false;

  kinds: any[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalAlertService: ModalAlertService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const data = await this.apiService.get('cards/new');
    this.kinds = data.kinds;

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      kind: [null, Validators.required],
      input: [null, Validators.required],
      ouput: [null, Validators.required],
      duration: [null, Validators.required],
      shortDescription: [null, Validators.required],
      description: [null, Validators.required],
      steps: [null, Validators.required],
    });
  }

  async save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.saving = true;

    try {
      await this.apiService.post('cards', this.form.value);
      this.router.navigateByUrl('/');
    } catch (response) {
      this.modalAlertService.show({ description: response.errors })
    }

    this.saving = false;
  }

}
