import { Component, inject } from '@angular/core';

import { MessageStore } from '@library/stores';

@Component({
  selector: 'sl-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  readonly #messageStore = inject(MessageStore);

  readonly message = this.#messageStore.message;
}
