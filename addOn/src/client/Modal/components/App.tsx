import React, { useEffect } from 'react'
import server from '../../server'
import { useApp } from '../../contexts/context'

const { fetchUserData, syncTrackingEvents } = server.serverFunctions

export default (): React.ReactElement => {
  const {
    state: { user },
    dispatch,
  } = useApp()

  // Initialize app
  useEffect(() => {
    // Fetch both database and sheet data
    const userDataPromise = fetchUserData()

    // Update tracking columns in sheet
    syncTrackingEvents()

    Promise.all([userDataPromise])
      .then(([userData]) => {
        dispatch({
          type: 'INITIALIZE_APP',
          payload: {
            userData,
          },
        })
      })
      .catch((error) => {
        console.error('>> App.tsx > useEffect:', error.message)
        return dispatch({
          type: 'SET_WARNING',
          payload: { warning: error.message },
        })
      })
  }, [dispatch])

  return (
    <div>
      hello
      {/* user: {user?.userEmail} */}
    </div>
  )
}
