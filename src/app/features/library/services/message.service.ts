import { inject, Injectable } from '@angular/core';

import { MessageStore } from '@library/stores';

@Injectable({ providedIn: 'root' })
export class MessageService {
  readonly #messageStore = inject(MessageStore);

  show(message: string): void {
    this.#messageStore.show(message);
  }

  clear(): void {
    this.#messageStore.clear();
  }
}
