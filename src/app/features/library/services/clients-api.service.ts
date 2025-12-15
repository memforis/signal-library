import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

import { Book, Client } from '@library/models';

@Injectable({ providedIn: 'root' })
export class ClientsApiService {
  readonly #http = inject(HttpClient);

  getAll(): Observable<Client[]> {
    return this.#http.get<Client[]>(`assets/mock-data/clients.json`).pipe(delay(300));
  }

  getBooks(clientId: number): Observable<Book[]> {
    const url = `assets/mock-data/clients/${clientId}/books.json`;

    return this.#http.get<Book[]>(url).pipe(delay(300));
  }
}
