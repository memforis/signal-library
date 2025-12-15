import { signalStoreFeature, type } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';

import { bookApiEvents, bookEvents, clientApiEvents, clientEvents, ClientState } from '@library/stores';

export function withClientReducer() {
  return signalStoreFeature(
    { state: type<ClientState>() },
    withReducer(
      on(clientApiEvents.loadClients, () => ({
        isLoading: true,
      })),

      on(clientApiEvents.loadClientsSuccess, ({ payload }) => ({
        clients: payload.clients,
        isLoading: false,
      })),

      on(clientApiEvents.loadClientsFailure, () => ({
        isLoading: false,
      })),

      on(clientEvents.selectClient, ({ payload }) => ({
        selectedClientId: payload.id
      })),

      on(bookApiEvents.loadClientBooksSuccess, ({ payload }) => (state: ClientState) => ({
        ...state,
        clients: state.clients.map(c =>
          c.id === payload.clientId
            ? { ...c, books: payload.books }
            : c
        )
      })),

      on(bookEvents.borrowBookSuccess, ({ payload }) => (state: ClientState) => ({
        ...state,
        clients: state.clients.map(c =>
          c.id === payload.clientId
            ? { ...c, books: [...c.books, payload.book] }
            : c
        )
      }))
    )
  );
}
