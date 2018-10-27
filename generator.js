module.exports = api => {
  api.extendPackage({
    scripts:{
      "start": "node --experimental-modules server",
      "start:dev": "nodemon -w game -w server --exec yarn start "
    },
    dependencies: {
      'boardgame.io': '^0.26.3',
      react: '^16.6.0',
      'react-dom': '^16.6.0',
    },
    devDependencies: {
      '@babel/preset-react': '^7.0.0',
    },
    engines: {
      node: '>=8',
    },
  })
}
