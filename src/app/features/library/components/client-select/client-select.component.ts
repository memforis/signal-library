import { Component, input, output } from '@angular/core';

import { Client } from '@library/models';

@Component({
  selector: 'sl-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.scss']
})
export class ClientSelectComponent {
  readonly clients = input<Client[]>([]);
  readonly selectedId = input<number | null>();

  select = output<number>();

  onClientChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const id = Number(target.value);

    this.select.emit(id);
  }
}
