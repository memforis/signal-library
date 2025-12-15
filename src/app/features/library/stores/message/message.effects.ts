import { inject } from '@angular/core';
import { patchState, signalStoreFeature } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';
import { tap } from 'rxjs';

import { bookApiEvents, bookEvents, clientApiEvents } from '@library/stores';

export function withMessageEffects() {
  return signalStoreFeature(
    withEffects(
      (
        store,
        events = inject(Events)
      ) => ({
        showErrorMessage$: events.on(
          bookApiEvents.loadBooksFailure,
          bookApiEvents.loadClientBooksFailure,
          bookEvents.borrowBookFailure,
          clientApiEvents.loadClientsFailure
        ).pipe(
          tap(({ payload }) => {
            patchState(store, { message: payload.error });
          })
        )
      })
    )
  );
}
