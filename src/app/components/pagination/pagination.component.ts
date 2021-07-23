import { Component, OnChanges, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import _ from 'lodash';

export enum Pages {
  FIRST,
  PREVIOUS,
  NEXT,
  LAST,
};

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  public get pageTypes(): typeof Pages {
    return Pages;
  };

  @Input() items: any[];
  @Input() total: number;
  @Input() perPage = 50;
  @Input() maxPages = 3;

  @Output() changePage = new EventEmitter();

  @HostBinding('class.d-none') hidden = true;

  currentPage = 1;
  totalPages: any;
  currentMaxPages = this.maxPages;
  pageSize: number;
  pages: number[];

  ngOnChanges() {
    this.totalPages = Math.ceil(this.total / this.perPage);
    if (this.totalPages <= this.currentMaxPages) {
      this.currentMaxPages = this.totalPages;
    } else {
      this.currentMaxPages = this.maxPages;
    }
    this.pageSize = this.totalPages > this.currentMaxPages ? this.currentMaxPages : this.totalPages;
    let halfSizePages = Math.floor(this.currentMaxPages / 2);

    let firstPage = 1;
    let lastPage = this.totalPages + 1;

    if (this.currentPage > halfSizePages) {
      firstPage = this.currentPage - halfSizePages;

      if (this.currentPage <= (this.totalPages - halfSizePages)) {
        lastPage = this.currentPage + (halfSizePages + 1);
      } else {
        firstPage = this.totalPages - this.currentMaxPages + 1;
      }
    } else {
      lastPage = this.currentMaxPages + 1;
    }

    this.pages = _.range(firstPage, lastPage);
    this.hidden = !this.items || this.pageSize <= 1;
  }

  onChangePage(page) {
    this.currentPage = page;
    this.changePage.emit(page);
  }

  goToPage(page: Pages) {
    switch (page) {
      case Pages.FIRST:
        if (this.currentPage === 1) return;
        this.currentPage = 1;
        break;
      case Pages.PREVIOUS:
        if (this.currentPage === 1) return;
        this.currentPage--;
        break;
      case Pages.NEXT:
        if (this.currentPage === this.totalPages) return;
        this.currentPage++;
        break;
      case Pages.LAST:
        if (this.currentPage === this.totalPages) return;
        this.currentPage = this.totalPages;
        break;
      default:
        break;
    }
    this.changePage.emit(this.currentPage);
  }
}
