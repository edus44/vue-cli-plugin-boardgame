import { Client } from 'boardgame.io/client'
import game from '@/../game/index'

let client
function initClient(config) {
  client = Client({ game, ...config })

  client.connect()

  if (process.env.NODE_ENV === 'development') {
    require('vue-cli-plugin-boardgame/clientDebug').start(client)
    window.client = client
  }
}

const state = {
  G: null,
  ctx: null,
  config: {
    numPlayers: 3,
    /* Multiplayer options */
    // playerID: 'def',
    // gameID: 'def',
    // multiplayer: { server: process.env.NODE_ENV === 'production' ? '' : 'localhost:8000' },
  },
}

const actions = {
  init({ commit, state }) {
    const sync = () => {
      const { G, ctx } = client.getState()
      commit('SET_STATE', { G, ctx })
    }

    initClient(state.config)
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

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
