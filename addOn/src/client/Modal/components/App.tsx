import React, { useEffect } from 'react'
import server from '../../server'
import { useApp } from '../hooks/context'

const { fetchUserData } = server.serverFunctions

export default (): React.ReactElement => {
  const {
    state: { user },
    dispatch,
  } = useApp()

  // Initialize app
  useEffect(() => {
    fetchUserData()
      .then((userData: any) => {
        dispatch({
          type: 'INITIALIZE_APP',
          payload: {
            userData,
          },
        })
      })
      .catch((error: any) => {
        console.error('>> App.tsx > useEffect:', error.message)
        return dispatch({
          type: 'SET_WARNING',
          payload: { warning: error.message },
        })
      })
  }, [dispatch])

  return <div>hello user: {user?.userEmail}</div>
}
