module.exports = function (source) {
  // if (source.indexOf('<wxc-loading') === -1) {
  //   source = source.replace(/<div[\s]+class="page(.*?)>/, `<div class="page$1><wxc-loading class="J_loading" type="mall"></wxc-loading>`)
  // }
  // if (source.indexOf('<wxc-toast') === -1) {
  //   source = source.replace(/<div[\s]+class="page(.*?)>/, `<div class="page$1><wxc-toast class="J_toast" text="Hello"></wxc-toast>`)
  // }
  return source
}
