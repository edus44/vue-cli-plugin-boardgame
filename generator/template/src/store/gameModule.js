import { Client } from 'boardgame.io/client'
import game from '@/../game/index'

const config = {
  numPlayers: 2,
  /* Multiplayer options */
  // playerID: 'def',
  // gameID: 'def',
  // multiplayer: process.env.NODE_ENV === 'production' ? true : { server: 'localhost:8000' },
}

const client = Client({ game, ...config })

client.connect()

if (process.env.NODE_ENV === 'development') {
  require('./clientDebug').startDebug(client)
  window.client = client
}

const state = {
  G: null,
  ctx: null,
  config,
}

const actions = {
  init({ commit, state }) {
    const sync = () => {
      const { G, ctx } = client.getState()
      commit('SET_STATE', { G, ctx })
    }

    client.subscribe(sync)
    sync()
  },
  move(state, { name, args = [] }) {
    return client.moves[name](...args)
  },
}

const mutations = {
  SET_STATE(state, { G, ctx }) {
    state.G = Object.freeze(G)
    state.ctx = Object.freeze(ctx)
  },
}

const getters = {
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
