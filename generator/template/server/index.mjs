import boardgame from 'boardgame.io/server'
import game from '../game'
import KoaStatic from 'koa-static'
import path from 'path'

const server = boardgame.Server({ games: [game] })
server.app.use(KoaStatic(path.resolve('dist')))
server.run(8000)

console.log('listening 8000') // eslint-disable-line