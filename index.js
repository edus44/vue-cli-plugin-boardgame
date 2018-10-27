module.exports = api => {
  api.chainWebpack(config => {
    config.resolve.extensions.add('.mjs')
  })
}
