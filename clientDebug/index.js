import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import DebugComponent from './DebugComponent'

export function start(client) {
  const App = DebugComponent({ client })
  const debugMount = document.createElement('div')
  debugMount.id = 'debug'
  document.body.appendChild(debugMount)
  ReactDOM.render(<App />, debugMount)
}
