import React from 'react'
import ReactDOM from 'react-dom'

// import Modal from './components'
import App from './components/App'
import { AppStateProvider } from '../contexts/context'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

const ModalView = () => (
  <AppStateProvider>
    <App />
  </AppStateProvider>
)

ReactDOM.render(<ModalView />, document.getElementById('index'))
