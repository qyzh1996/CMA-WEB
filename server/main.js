const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')

//var proxy = require('http-proxy-middleware');
const app = express()

/*var httpProxy = require("http-proxy");
var apiProxy = httpProxy.createProxyServer();*/
// 重写所有路由请求到根目录文件夹
app.use(require('connect-history-api-fallback')())

// 启用gzip压缩
app.use(compress())

// 启用 Webpack HMR Middleware
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))
  
  //使用http-proxy-middleware代理
/*  app.use('/cma/', proxy(
    {target: 'http://119.23.38.100:8080', changeOrigin: true}
    )
  );*/
/*  app.use("/cma/*", function(req, res) {
    req.url = req.baseUrl; // Janky hack...
    apiProxy.web(req, res, {
      target: {
        port: 8080,
        host: "119.23.38.100:8080"
      }
    });
  });*/

  app.use(express.static(project.paths.public()))

} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  app.use(express.static(project.paths.dist()))
}

module.exports = app
