import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { signalStoreFeature } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';
import { catchError, map, of, switchMap } from 'rxjs';

import { ClientsApiService } from '@library/services';
import { bookApiEvents, clientApiEvents, clientEvents } from '@library/stores';

export function withClientEffects() {
  return signalStoreFeature(
    withEffects(
      (
        store,
        events = inject(Events),
        clientsApiService = inject(ClientsApiService)
      ) => ({
        selectClient$: events.on(clientEvents.selectClient).pipe(
          map(({ payload }) => bookApiEvents.loadClientBooks({ clientId: payload.id })),
        ),

        loadClients$: events.on(clientApiEvents.loadClients).pipe(
          switchMap(() => clientsApiService.getAll().pipe(
            map((clients) => clientApiEvents.loadClientsSuccess({ clients })),
            catchError((err: HttpErrorResponse) => of(clientApiEvents.loadClientsFailure({ error: String(err.statusText) })))
          ))
        )
      })
    )
  );
}
