/**
 * Created by wdj on 16/5/30.
 * Config
 */
const config = {
  appMode: process.env.NODE_ENV === 'development' ? 'D' : 'P', // APP 模式. P,T,D
  serverConfigVersion: 1000, // 配置版本
  guideVersionCode: 1, // 引导页版本
  versionCode: 1000, // 版本号,打包时自动配置
  errorImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVQTFRF3Oju////4Ovx4ujs1N/kzMzM7PH0D4bLgwAABDlJREFUeNrsmw1zIyEIhl8F+f8/+fzcTe6SLCJbO73STtLOpPEJICJQUKS4SdAeEbcLNq+O3QiNg/atTVUPtBOhO8I3sMV/vyN+EX4RfiBCj26wHnrGP6pffVHKj1na74Z3NGuhfeK2eH7iLJVj/i2xtDo3AUMEnBI3otsR0NbnsmSTlH+SEISqKu5HaIuXT0yS180rS147JSo/IvHNhmh2zzuAiOryh1BKsT3jTgR04fBSqD5Wr8SMT2DCA5v/FSNQeCvUHcQdoatApHnfX1Z4kkyIyBN6gHb5Eov4w6c/hNG0oVYD9C9C2fkSVCIpuSKcBKwkyAjMvr5Q7JCdQAuQJQcI+CLEmAnCjJB6UygNkXWAMCeUlAxQB+UwK1JtAS8ETmFearD2QShRUQwIQecOagQyIFRTXFJoERIb1RAvqzjKAG0jKGq4XkKphWTyhX50uyAYlaDLYFQvYKsSgjC7IFji0mkJj02Z9wM2IyzYoZyYLlpYsEPghN0ILlqALmV8q4X9CA6b8jtoISItaWG3IcQpNC1EJvJCsG9Kl2Nq9YiAS77ALAveCI+sacEfNQmsCsGesRRv9NECr7iCC4I5OLHmMqNDsKqh1t9cEGKyJS2UoMxONf5oQpCkyOHvdsfiC3t3RDmlNmvBLUAvIcSfghBNNRZnBOtRKW6GMB+VxNsDNGtqbrrouHBGeCEYGVjVLlPXHcXkjHAyBIxqAMOt7lhqh/PJmyjblspCNSLPBgdhnRL0CLUnM+OJzKoKtNoQ9WEicalGUDawtR2D1peZRXDsR4z8TY0Qk/6Nb0KgO1qlUzGylL99+5TTBUhlP8bSNleqobVC7vAFdUmeU7wPIV8MdBXXGR+Lc6/lNilx5QgzDJNawPWxrT4bTAg1TF8wyPREzdyOqN+fTytOHON9CL2Bni7TxdsQWvLyuXks+qEBuxYu+tf3DhUNf+TFovPSpmyZy6UhAG8ExHOK8LJ9zQkPU4e4ITRxuioAogzz9GFAR0NQT95YM9QjnHhm/FJ5oRvjhaortgxFuGXQfb6tjDeS+g4x5prgeK1Nc1cZ4uqXPrepNsMxX2ihPg67fLNu84VMlkpPrOjzIxTdhc75Rk5kbsoId4pzh/xD9A4RGPOV9vUPzxyTwXgOda+1QM/r8+r65yb9kErhdXZWZ5qDnwh3Cpy7/BUCHtan4C1PFG+00PORbH7/9U/vTEfd4Tj5nvZ/ie4S7hSJY279cEo8XZVY7gU4KPjhKMVDCKQvWL9HzuNEH98o1azra5Kzc/IoII3hKZbwpSLgWoNAD5m8MrSzNliAkQxtIBg38PFfJjsI+vWzIqwMkK2ZojZtsDSesGyK3tPGLiW0pjbqqPkuglEcXJqcWpXWstiKIC3N3ucKA8HeivWQdnBvRah51MYNMfxxL0IszpCwE6H6I9NuBGLZigD+I8AAReNrrnG0C48AAAAASUVORK5CYII=',
  // 活动链接
  /**
   * 图片 Url 前缀
   * @returns {String}
   */
  getImageUrlPath: function () {
    let urls = {
      'D': 'http://test.golf.static.i-caiwu.com', // http://192.168.1.130/res/ResReadOlnyServer.ashx
      'T': 'http://test.golf.static.i-caiwu.com',
      'P': 'https://golf.static.i-caiwu.com'
    }
    return urls[this.appMode]
  },
  getRestfulUrl: function (protocol) {
    let urls = {
      D: 'test.api.golf.mp.i-caiwu.com',
      T: 'test.api.golf.mp.i-caiwu.com',
      P: 'https://api.golf.mp.i-caiwu.com'
    }
    let url = urls[this.appMode]
    if (protocol) {
      if (!url.startsWith('http')) {
        url = protocol + '://' + url
      }
    }
    return url
  }
}

export default config
