const fs = require('fs')

module.exports = api => {
  api.extendPackage({
    scripts: {
      start: 'node --experimental-modules server',
      'start:dev': 'nodemon -w game -w server --exec yarn start ',
    },
    dependencies: {
      'boardgame.io': '^0.26.3',
    },
    devDependencies: {
      nodemon: '^1.18.5',
    },
    engines: {
      node: '>=8',
    },
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

  // Debug mount point
  api.onCreateComplete(() => {
    addDebugMount(api)
  })
}

function addDebugMount(api) {
  updateFile(api, './public/index.html', lines => {
    const root = lines.findIndex(line => line.match(/id="app"/))
    lines.splice(root + 1, 0, `    <div id="debug"></div>`)
    return lines
  })
}

function updateFile(api, file, callback) {
  file = api.resolve(file)
  let content = fs.existsSync(file) ? fs.readFileSync(file, { encoding: 'utf8' }) : ''

  content = callback(content.split(/\r?\n/g)).join('\n')
  fs.writeFileSync(file, content, { encoding: 'utf8' })
}
