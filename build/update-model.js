const http = require('http')
const fs = require('fs')
const path = require('path')
var save = path.join(__dirname, '../src/model/MainModel.js')

if (process.argv.length >= 3) {
  if(process.argv[2] === 'down') {
    downloadModelFile(process.argv[3] || false)
  }
}

function downloadModelFile(mockrc = false) {
  console.log('开始下载model文件...')
  var req = http.request({
    host: 'test.golf.admin.i-caiwu.com',
    path: '/doc/RRCW.Golf.API.MP.js',
  }, function (res) {
    // res.setEncoding('utf8')
    var fp = fs.openSync(save, 'w')
    res.on('data', function (chunk) {
      fs.write(fp, chunk, function () {})
    })
    res.on('end', function () {
      fs.close(fp, function(){})
      mockrc && createMockrc()
    })
  })
  req.end();
}

function createMockrc() {
  console.log('生成.mockrc文件...')
  var s = fs.readFileSync(save, {encoding: 'utf8'})
  var a = new RegExp('\\/\\*\\*([\\s\\S]+?)\\*\\/', 'g')
  var b = new RegExp('路由：([\\s\\S\\/]+?)\\n[\\s\\S]+\\*Response:([\\s\\S]+?)\\n\\*\\/')

  var t = []
  s.match(a).forEach(function (comment) {
    var c = comment.match(b)
    t.push('\'POST ' + String(c[1]).trim().replace(',', '') + '.json\': (req, res) => {\n\treturn ' + parseParams(String(c[2]).trim()) + '\n}')
  })

  var mockFile = '.mockrc.js'
  if (fs.existsSync(mockFile)) {
    fs.writeFileSync(mockFile, `
export default {
  ${t.join(',\n').replace(/\n/g, '\n  ')}
}
`)
  }
}

function parseParams(s) {
  if (s.indexOf('{') !== -1) {
    s = s.substr(s.indexOf('{'))
    var xx = []
    s.replace(/"([\s\S]+?)":([\s\S]+?)\n/g, function (source, field, type) {
      type = type.trim()
      var x
      switch (type) {
        case 'bool':
          x = `'${field}|1': [true, false]`
          break
        case 'string':
          x = `${field}: '@string'`
          break
        case 'int':
          x = `${field}: '@integer'`
          break
        case 'decimal':
          x = `${field}: '@decimal'`
          break
        default:
          if (type.endsWith('[]')) {
            x = `'${field}|10': []`
          } else {
            x = `${field}: '${type}'`
          }
      }
      xx.push(x)
      return x + ',\n'
    })
    return '{' + xx.join(',\n') + '}'
  } else {
    var x
    switch (s.trim()) {
      case 'bool':
        x = `true`
        break
      case 'string':
        x = `'@string'`
        break
      case 'int':
        x = `'@integer'`
        break
      case 'decimal':
        x = `'@decimal'`
        break
      default:
        x = ''
    }
    return x
  }
}
