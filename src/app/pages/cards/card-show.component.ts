import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { ModalConfirmService } from '@app/services/modal-confirm.service';

type Card = {
  name: string,
  kind: string,
  input: string,
  output: string,
  duration: number,
  shortDescription: string,
  description: string,
  steps: string,
};

@Component({
  templateUrl: './card-show.component.html',
})
export class CardShowComponent implements OnInit {

  id = this.route.snapshot.params.id;

  data: Card;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private modalConfirmService: ModalConfirmService,
  ) { }

  async ngOnInit() {
    this.data = await this.apiService.get(`cards/${this.id}`);
  }

  delete(card) {
    this.modalConfirmService.show({
      title: 'Excluir cartão',
      description: 'O cartão será excluído. Confirma?',
      confirm: async () => {
        await this.apiService.delete(`/cards/${this.id}`);
        this.router.navigateByUrl('/');
      }
    });
  }

}
