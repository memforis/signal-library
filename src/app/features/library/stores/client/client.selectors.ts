import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';

import { ClientState } from '@library/stores';

export function withClientSelectors() {
  return signalStoreFeature(
    { state: type<ClientState>() },
    withComputed(({ clients, selectedClientId }) => ({
      borrowedBooks: computed(() =>
        clients()
          .find(c => c.id === selectedClientId())
          ?.books ?? []
      )
    })
  ));
}
