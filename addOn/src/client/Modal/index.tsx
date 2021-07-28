import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { AppStateProvider } from './hooks/context'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

const ModalView = () => (
  <AppStateProvider>
    <App />
  </AppStateProvider>
)

ReactDOM.render(<ModalView />, document.getElementById('index'))
