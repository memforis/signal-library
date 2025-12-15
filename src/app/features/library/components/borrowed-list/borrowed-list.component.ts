import { Component, input } from '@angular/core';

import { Book } from '@library/models';

@Component({
  selector: 'sl-borrowed-list',
  templateUrl: './borrowed-list.component.html',
  styleUrls: ['./borrowed-list.component.scss']
})
export class BorrowedListComponent {
  readonly books = input<Book[]>([]);
}
