import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

import { Book } from '@library/models';

@Injectable({ providedIn: 'root' })
export class BooksApiService {
  readonly #http = inject(HttpClient);

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(`assets/mock-data/books.json`).pipe(delay(300));
  }

  borrow(clientId: number, book: Book): Observable<Book> {
    // return this.#http.post<Book>(`/api/clients/${clientId}/books/${book.id}/borrow`, {});

    return of(book).pipe(delay(300));
  }
}
