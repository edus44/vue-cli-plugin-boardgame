/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react'
import { Debug } from 'boardgame.io/react'

/**
 * Client
 *
 * boardgame.io React client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} board - The React component for the game.
 * @param {...object} multiplayer - Set to true or { server: '<host>:<port>' }
 *                                  to make a multiplayer client. The second
 *                                  syntax specifies a non-default socket server.
 * @param {...object} debug - Enables the Debug UI.
 * @param {...object} enhancer - Optional enhancer to send to the Redux store
 *
 * Returns:
 *   A React component that wraps board and provides an
 *   API through props for it to interact with the framework
 *   and dispatch actions such as MAKE_MOVE, GAME_EVENT, RESET,
 *   UNDO and REDO.
 */
export default function Client({ client }) {
  /*
   * WrappedBoard
   *
   * The main React component that wraps the passed in
   * board component and adds the API to its props.
   */
  return class WrappedBoard extends React.Component {
    state = {
      gameStateOverride: null,
    }

    constructor(props) {
      super(props)

      this.client = client

      this.gameID = this.client.gameID || 'default'
      this.playerID = this.client.playerID || null
      this.credentials = this.client.credentials || null

      // Subscribe and patch original subscribe because
      // subscribe only allow one callback
      let subFn
      this.client.subscribe(state => {
        this.forceUpdate()
        subFn && subFn(state)
      })

      this.client.subscribe = fn => {
        subFn = fn
      }
    }

    updateGameID = gameID => {
      this.client.updateGameID(gameID)
      this.gameID = gameID
      this.forceUpdate()
    }

    updatePlayerID = playerID => {
      this.client.updatePlayerID(playerID)
      this.playerID = playerID
      this.forceUpdate()
    }

    updateCredentials = credentials => {
      this.client.updateCredentials(credentials)
      this.credentials = credentials
      this.forceUpdate()
    }

    overrideGameState = state => {
      this.setState({ gameStateOverride: state }) // TODO: override real state
    }

    render() {
      let state = this.client.getState()

      if (this.state.gameStateOverride) {
        state = { ...state, ...this.state.gameStateOverride }
      }

      const _debug = React.createElement(Debug, {
        gamestate: state,
        reducer: this.client.reducer,
        store: this.client.store,
        isMultiplayer: this.client.multiplayer !== undefined,
        moves: this.client.moves,
        events: this.client.events,
        gameID: this.gameID,
        playerID: this.playerID,
        credentials: this.credentials,
        step: this.client.step,
        reset: this.client.reset,
        undo: this.client.undo,
        redo: this.client.redo,
        visualizeAI: () => {},
        overrideGameState: this.overrideGameState,
        updateGameID: this.updateGameID,
        updatePlayerID: this.updatePlayerID,
        updateCredentials: this.updateCredentials,
      })

      return (
        <div className="client">
          <span>{_debug}</span>
        </div>
      )
    }
  }
}
