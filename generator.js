module.exports = api => {
  api.extendPackage({
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
