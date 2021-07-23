import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './card-index.component.html',
})
export class CardIndexComponent implements OnInit {
  cards: any[];

  constructor (
    private apiService: ApiService,
  ) {}

  async ngOnInit() {
    const data = await this.apiService.get('cards.json');
    this.cards = data.cards;
  }
}
