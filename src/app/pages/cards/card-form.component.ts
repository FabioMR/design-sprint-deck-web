import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { ModalAlertService } from '@app/services/modal-alert.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
})
export class CardFormComponent implements OnInit {

  private id = this.route.snapshot.params.id;
  private newRecord = !this.id;

  backPath = this.newRecord ? '/' : `/cartoes/${this.id}`;

  form: FormGroup;
  saving = false;

  kinds: any[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalAlertService: ModalAlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const path = this.newRecord ? 'cards/new' : `cards/${this.id}/edit`;
    const data = await this.apiService.get(path);

    this.kinds = data.kinds;

    this.form = this.formBuilder.group({
      name: [data.name, Validators.required],
      kind: [data.kind, Validators.required],
      input: [data.input, Validators.required],
      output: [data.output, Validators.required],
      duration: [data.duration, Validators.required],
      shortDescription: [data.shortDescription, Validators.required],
      description: [data.description, Validators.required],
      steps: [data.steps, Validators.required],
    });
  }

  async save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.saving = true;

    try {
      const path = this.newRecord ? 'cards' : `cards/${this.id}`;
      const method = this.newRecord ? 'post' : 'patch';
      await this.apiService[method](path, this.form.value);
      this.router.navigateByUrl(this.backPath);
    } catch (response) {
      this.modalAlertService.show({ description: response.errors })
    }

    this.saving = false;
  }

}
