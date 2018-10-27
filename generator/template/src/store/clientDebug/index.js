import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import DebugComponent from './DebugComponent'

export function startDebug(client) {
  const App = DebugComponent({ client })
  ReactDOM.render(<App />, document.getElementById('debug'))
}
