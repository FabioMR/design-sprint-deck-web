import { Component, OnInit } from '@angular/core';
import { ModalConfirmService } from '@app/services/modal-confirm.service';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './card-index.component.html',
})
export class CardIndexComponent implements OnInit {
  cards: any[];

  constructor (
    private apiService: ApiService,
    private modalConfirmService: ModalConfirmService,
  ) {}

  async ngOnInit() {
    const data = await this.apiService.get('cards.json');
    this.cards = data.cards;
  }

  delete(card) {
    this.modalConfirmService.show({
      title: 'Excluir cartão',
      description: 'O cartão será excluído. Confirma?',
      confirm: async () => {
        await this.apiService.delete(`/cards/${card.id}`);
        this.cards.splice(this.cards.indexOf(card), 1);
      }
    });
  }
}
