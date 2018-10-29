# vue-cli-plugin-boardgame
Adds supports for Boardgame.io

* Syncs game state with Vuex store
* Launch moves with store actions
* Separated folder for game logic
* Plug and play multiplayer server 
* Usable official debug client (written in React)

### Multiplayer

* To launch server use `yarn start` or `yarn start:dev` for autoreload
* Configure `playerID`, `gameID` and `multiplayer` in `store/gameModule.js` with your game needs


### Notes

Game logic and server needs to be written using ESM modules for better browser-node compatibility:
  * Files extension are `.mjs`
  * Node >= 8 is required.
  * Node process uses `--experimental-modules` flag

```sh
vue add boardgame

# or

yarn add --dev vue-cli-plugin-boardgame
vue invoke boardgame
```

#### Example of Boardgame client usage
```js
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('game', ['G', 'ctx']),
  },
  created(){
    // Initialize boardgame client
    this.init() 
  },
  methods: {
    ...mapActions('game', ['move','init']),
    myMove(){
      this.move({ name: 'myMove', args: [arg1,arg2] })
    }
  },
}
```

#### Example game using Immer (immutable helper)
```js
// game/index.mjs
import boardgame from 'boardgame.io/core'
import immer from 'immer'
const { produce } = immer

const game = boardgame.Game({
  setup: () => ({ deck: 5, hand: 0 }),
  moves: {
    drawCard: produce((G, ctx) => {
      G.deck--
      G.hand++
    }),
    playCard: produce((G, ctx) => {
      G.deck++
      G.hand--
    }),
    // Using object spread
    // drawCard: G => ({ ...G, deck: G.deck - 1, hand: G.hand + 1 }),
    // playCard: G => ({ ...G, deck: G.deck + 1, hand: G.hand - 1 }),
  },
})

export default game

