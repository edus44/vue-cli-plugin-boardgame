const fs = require('fs')

module.exports = api => {
  api.extendPackage({
    scripts: {
      start: 'node --experimental-modules server',
      'start:dev': 'nodemon -w game -w server --exec yarn start ',
    },
    dependencies: {
      'boardgame.io': '^0.26.3',
      'koa-static': '^5.0.0',
    },
    devDependencies: {
      nodemon: '^1.18.5',
    }
  })

  api.render('./template')

  //Vuex store
  api.injectImports(api.entryFile, `import store from './store'`)
  api.injectRootOptions(api.entryFile, `store`)
  api.extendPackage({
    dependencies: {
      vuex: '^3.0.1'
    }
  })
  
  api.exitLog('Visit https://github.com/edus44/vue-cli-plugin-boardgame for usage info','info')

}
