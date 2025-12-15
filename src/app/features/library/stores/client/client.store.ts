import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withState } from '@ngrx/signals';

import { Client } from '@library/models';
import { withClientEffects, withClientReducer, withClientSelectors } from '@library/stores';

export interface ClientState {
  clients: Client[];
  selectedClientId: number | null;
  isLoading: boolean;
}

const initialClientState: ClientState = {
  clients: [],
  selectedClientId: null,
  isLoading: false
};

export const ClientStore = signalStore(
  { providedIn: 'root' },
  withState<ClientState>(initialClientState),
  withDevtools('client'),
  withClientSelectors(),
  withClientReducer(),
  withClientEffects()
);
