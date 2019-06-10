var path = require('path')
var fs = require('fs')
var babel = require('babel-core')
var bodyParser = require('body-parser');

module.exports = function (app) {

  app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
  app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
  }));

  var mockFile = path.resolve('.mockrc.js')
  if (fs.existsSync(mockFile)) {

    var Mock = require('mock2js')

    function proxySend(res, data){
      if (typeof data !== 'object') {
        res.send({isSuccess: true, body: data ? Mock.mock(data) : data})
      } else {
        data = Mock.mock(data)
        res.send('isSuccess' in data ? data : {isSuccess: true, body: data})
      }
    }

    var proxyFn = function (handle, delay) {
      var type = typeof handle

      return function (req, res) {
        setTimeout(function () {
          try {
            switch (type) {
              case 'function':
                if (req.body && (req.body.header || req.body.body)) {
                  Object.assign(req.headers, req.body.header)
                  req.body = Object.assign({}, req.body.body)
                }
                var rt = handle(req, {
                  send: function (data) {
                    proxySend(res, data)
                  },
                  end: function (data) {
                    res.end(data)
                  }
                })
                if(rt){
                  proxySend(res, rt)
                }
                break
              default:
                proxySend(res, handle)
            }
          } catch (e) {
            res.status(500).send({isSuccess: false, message: '系统繁忙！请稍后再试~', code: 'G110'})
            console.error('Error path:', req.path)
            console.error(e)
          }
        }, delay || 0)
      }
    }

    var routes = {}
    app.use(function (req, res, next) {
      var method = req.method.toUpperCase()
      if(routes[method] && routes[method][req.path]){
        routes[method][req.path](req, res)
      }else{
        next()
      }
    })

    function updateRouter () {
      var mocks = babel.transformFileSync(mockFile, {
        presets: ['stage-2', 'es2015'],
        comments: false
      })
      mocks = mocks.code.replace('export default', 'module.exports = ')
      var matchs = mocks.match(/require\('(.*?)'\)/g)
      if(matchs && matchs.length){
        matchs.forEach((item) => {
          var file = item.replace(/require\('(.*?)'\)/, '$1')
          if(file.substr(0, 2) === './'){
            var js = path.resolve(file + '.js')
            if(require.cache[js]){
              delete require.cache[js]
            }
          }
        })
      }
      var tmp = path.resolve('__mock.tmp.js')
      fs.writeFileSync(tmp, mocks)
      delete require.cache[tmp]
      mocks = require(tmp)
      fs.unlinkSync(tmp)
      if(mocks.default)mocks = mocks.default
      var rules = mocks.rules || mocks || {}
      console.log('模拟接口列表:\n' + Object.keys(rules).join('\n') + '')
      Object.keys(rules).forEach(route => {
        setRoute(route, rules[route])
      })
    }
    function setRoute (route, handle) {
      if (route.indexOf(' ') === -1) {
        route = 'GET ' + route
      }
      var routePath = route.split(' ')
      var delay = 0
      if (routePath.length > 2 && routePath[2].indexOf('delay:') !== -1) {
        delay = routePath[2].substr(6)
      }
      var fn = handle ? proxyFn(handle, Number(delay) || 0) : function(req, res){res.send(404)}
      var method = routePath[0],
        path = routePath[1]
      if(!routes[method])routes[method] = {}
      routes[method][path] = fn
    }
    updateRouter()
    fs.watchFile(mockFile, {
      interval: 800
    }, function() {
      try {
        updateRouter()
        console.log('路由已更新', new Date())
      } catch (e) {
        console.error(e)
        console.error('路由更新失败！请检查语法。')
      }
    });

  }
}
