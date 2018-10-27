import React from 'react'
import ReactDOM from 'react-dom'
import DebugComponent from './DebugComponent'

export default function startDebug(client) {
  const App = DebugComponent({ client })
  ReactDOM.render(<App />, document.getElementById('debug'))
}
