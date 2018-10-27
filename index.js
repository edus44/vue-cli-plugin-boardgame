module.exports = (api,opts) => {
  api.chainWebpack(config => {
    config.resolve.extensions.add('.mjs')
    opts.transpileDependencies.push('vue-cli-plugin-boardgame')
  })
}
