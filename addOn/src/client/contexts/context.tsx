import React, { createContext, useContext, useReducer } from 'react'
import { logEvent, logPageview } from '../analytics'
import { AppDispatch, appStateReducer } from './reducers'
import { AppState, GAEvent } from '../../types'

interface AppContext {
  state: AppState
  dispatch: AppDispatch
  analytics: {
    pageview: (page: string) => void
    event: (event: GAEvent) => void
  }
}

const initialAppState: AppState = {
  user: {
    userEmail: '',
  },
  spreadsheetId: null,
  warning: null,
}

export const appContext = createContext<AppContext | null>(null)

// Context provider
export const AppStateProvider = ({
  children,
}: {
  children: React.ReactElement
}): React.ReactElement => {
  const [state, dispatch] = useReducer(appStateReducer, initialAppState)

  const userEmail = state.user?.userEmail
  const analytics = {
    pageview: (page: string) => logPageview(userEmail, page),
    event: (event: GAEvent) => logEvent(userEmail, event),
  }

  return (
    <appContext.Provider value={{ state, dispatch, analytics }}>{children}</appContext.Provider>
  )
}

// Custom hook to access state and dispatch
export function useApp(): AppContext {
  const context = useContext(appContext)
  if (!context) {
    throw new Error('appContext was not initialized')
  }
  return context
}
