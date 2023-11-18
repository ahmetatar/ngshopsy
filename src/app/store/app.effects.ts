import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {filter, tap} from 'rxjs';
import {ActionWithMessageMetadata, hasUiMessageActionMetadata} from './app.state';
import {MessageType, UiMessagesService} from '@shared/modules/ui-messages';

@Injectable()
export class AppEffects {
  displayUiMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        filter((action) => hasUiMessageActionMetadata(action)),
        tap((action) =>
          this.messageService.pushMessage(
            action.messageMetadata.title,
            action.messageMetadata.text,
            action.messageMetadata.messageType as MessageType,
          ),
        ),
      ),
    {dispatch: false},
  );

  constructor(
    private actions$: Actions<ActionWithMessageMetadata>,
    private messageService: UiMessagesService,
  ) {}
}
