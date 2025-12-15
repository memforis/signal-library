import { type } from '@ngrx/signals';
import { event } from '@ngrx/signals/events';

import { Client } from '@library/models';

export interface LoadClientsPayload {}
export interface LoadClientsSuccessPayload { clients: Client[] }
export interface LoadClientsFailurePayload { error: string }

export const loadClients = event('[Clients API] Load', type<LoadClientsPayload>());
export const loadClientsSuccess = event('[Clients API] Load Success', type<LoadClientsSuccessPayload>());
export const loadClientsFailure = event('[Clients API] Load Failure', type<LoadClientsFailurePayload>());

export const clientApiEvents = {
  loadClients,
  loadClientsSuccess,
  loadClientsFailure
};

export interface SelectClientPayload { id: number }

export const selectClient = event('[Client] Select', type<SelectClientPayload>());

export const clientEvents = {
  selectClient
};
