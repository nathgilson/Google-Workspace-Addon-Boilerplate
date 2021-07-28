/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useApp } from '../hooks/context'

export default (): React.ReactElement => {
  const {
    state: { warning },
  } = useApp()

  // PERMISSION WARNING \\
  if (
    warning?.toUpperCase().includes('PERMISSION') || // `We're sorry, a server error occurred while reading from storage. Error code PERMISSION_DENIED.` // `You do not have permission to access the requested document.`
    warning?.toUpperCase().includes('AUTHORIZATION') || // `Authorization is required to perform that action.`
    warning?.toUpperCase().includes('AUTHORISATION') || // `Authorisation is required to perform that action.`
    warning?.includes('autorisations') || // "Vous devez disposer des autorisations requises pour pouvoir effectuer cette action."
    warning?.includes('autorización') // "Se requiere autorización para realizar esa acción."
  ) {
    return (
      <div>
        <div>
          <td>
            <p>
              <h4>⚠️ AppName could not sign you in</h4>
            </p>
            <p>
              Are you using multiple accounts? If so,{' '}
              <a target='_blank' rel='noopener' href='https://appname.com'>
                use a dedicated Google Chrome profile
              </a>
              .
            </p>
            <p>
              At the top right corner of your browser:
              <ol>
                <li>Click on your profile icon. Then click on “+ Add“.</li>
                <li>Create one account for each of your email address.</li>
                <li>Select the right profile, then try again.</li>
              </ol>
            </p>
            <p>
              If it doesn’t work or you are not using Google Chrome, try to sign in using an
              incognito window.
            </p>
          </td>
        </div>
      </div>
    )
  }

  // UNKNOWN ERROR \\
  return (
    <div>
      <td>
        <p>
          <h4>⚠️ UNKNOWN ERROR</h4>
        </p>
        <p>Error message:</p>
        <p>{warning}</p>
      </td>
    </div>
  )
}
