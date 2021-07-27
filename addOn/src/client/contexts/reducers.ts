/* eslint-disable no-param-reassign */
import { Dispatch, Reducer } from 'react'
import { produce } from 'immer'
import { AppState } from '../../types'

export type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload }

export type AppActions =
  | ActionType<'INITIALIZE_APP', { userData: any }>
  | ActionType<'SET_WARNING', { warning: string }>

export type AppDispatch = Dispatch<AppActions>

export const appStateReducer: Reducer<AppState, AppActions> = produce(
  (draft: AppState, action: AppActions) => {
    switch (action.type) {
      case 'INITIALIZE_APP': {
        const {
          userData: { user },
        } = action.payload
        draft.user = user
        break
      }
      case 'SET_WARNING': {
        draft.warning = action.payload.warning
        break
      }
      default:
        throw new Error('Invalid action dispatched in appContext')
    }
  }
)
