module.exports = function (source) {
  if (source.indexOf(`const app = new Vue(App)\napp.$mount()`) !== -1 && source.indexOf('^pages/index/main') === -1) {
    source = injectWXCComponent(source, ['wxc-toast', 'wxc-loading'])
  }
  if (source.indexOf('usingComponents') !== -1) {
    return source.replace(/'@(wxc-|minui\/wxc-)([a-zA-Z0-9_\-\/]+?)'/g, function ($1, $2, $3) {
      var s = String($3), e = 'index';
      if (s && s.indexOf('/') !== -1) {
        [s, ...e] = s.split('/')
        e = e.join('/')
      }
      let str = '../../../static/components/@minui/wxc-' + s + '/dist'
      str += '/' + e
      return '\'' + str + '\''
    })
  }
  return source
}

function injectWXCComponent(source, components) {
  if (typeof components === 'string') {
    components = [components]
  }
  for (var i = 0; i < components.length; i++) {
    source = addWXCComponent(source, components[i])
  }
  return source
}

function addWXCComponent(source, name) {
  if (!source) {
    return source
  }
  if (source.indexOf(name) === -1) {
    if (source.indexOf('export default') === -1){
      source += `\nexport default { config: { usingComponents: {'${name}': '@${name}'} } }\n`
      return source
    }
    if (source.indexOf('usingComponents') === -1) {
      if (source.indexOf('config:') === -1) {
        if(source.indexOf('pages:') === -1 && source.indexOf('window:') === -1){
          source = source.replace(/export[\s]+?default[\s]+?{/, `export default { config: { usingComponents: {'${name}': '@${name}'} } `)
        }
      } else {
        source = source.replace(/config:[\s]+?{/, `config: { usingComponents: {'${name}': '@${name}'},`)
      }
    } else {
      source = source.replace(/usingComponents:[\s]+?{/, `usingComponents: {\n'${name}': '@${name}',`)
    }
  }
  return source
}
