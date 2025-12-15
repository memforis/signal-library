import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { withMessageEffects } from '@library/stores/message/message.effects';
import { effect } from '@angular/core';

export interface MessageState {
  message: string | null;
}

const initialMessageState: MessageState = {
  message: null
};

export const MessageStore = signalStore(
  { providedIn: 'root' },
  withState<MessageState>(initialMessageState),
  withDevtools('message'),
  withMessageEffects(),
  withMethods((store) => {
    let timeoutId: number | null = null;

    effect(() => {
      const message = store.message();

      if (!message) {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        return;
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        patchState(store, { message: null });
      }, 3000);
    });

    return {
      show: (message: string) => {
        patchState(store, { message });
      },

      clear() {
        patchState(store, { message: null });
      }
    };
  })
);
