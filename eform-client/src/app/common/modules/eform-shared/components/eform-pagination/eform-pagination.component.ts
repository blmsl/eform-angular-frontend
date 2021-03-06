import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Observable, range} from 'rxjs';
import {filter, map, toArray} from 'rxjs/operators';

@Component({
  selector: 'eform-pagination',
  templateUrl: './eform-pagination.component.html',
  styleUrls: ['./eform-pagination.component.scss']
})
export class EformPaginationComponent implements OnInit, OnChanges {
  @Output() onPageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() offset = 0;
  @Input() limit = 1;
  @Input() size = 1;
  @Input() range = 3;
  currentPage: number;
  totalPages: number;
  pages: Observable<number[]>;

  selectPage(page: number) {
    if (page === 0 || page > this.totalPages) {
      return;
    }
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.onPageChanged.emit((page - 1) * this.limit);
    }
  }

  getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = range(-this.range, this.range * 2 + 1).pipe(
      map((offset) => this.currentPage + offset),
      filter(page => this.isValidPageNumber(page, this.totalPages)),
      toArray()
    );
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  ngOnChanges() {
    this.getPages(this.offset, this.limit, this.size);
  }

  ngOnInit() {
    this.getPages(this.offset, this.limit, this.size);
  }

}
