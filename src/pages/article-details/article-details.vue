<template>
  <div class="page page-article-details">
    <block v-if="article && article.articleContent">
      <div class="title">{{article.articleTitle || '文章标题'}}</div>
      <div class="text-center text-alpha-inverse">
        发布时间: {{article.createDate}}
      </div>
      <div class="hr"></div>
      <rich-text :nodes="article.articleContent"></rich-text>
    </block>
    <wxc-abnor v-else-if="article" type="ORDER" title="赛事详情未找到"></wxc-abnor>
    <wxc-loadmore v-else></wxc-loadmore>
  </div>
</template>

<script>
  export default {
    name: 'article-details',
    data(){
      return {
        articleId: 0,
        article: null
      }
    },
    methods: {
      async loadArticle(){
        try {
          const res = await this.$$main.articleGet({
            articleId: this.articleId
          })
          this.article = {
            ...res,
            articleContent: this.parsePreviewContent(res.articleContent)
          }
        } catch (e) {
          console.log(e)
        }
      },
      parsePreviewContent(content){
        return content.replace(/<table/g, '<table style="width: 100%;margin:auto;max-width: 100%;border-collapse: collapse; border-spacing: 0;"')
          .replace(/<th.*?>/g, function (a) {
            return a === '<thead>' ? '<thead>' : (
              a.indexOf('style') !== -1 ? a.replace('style="', 'style="background-color: #f9f9f9;border: 1px solid #ccc;') : '<th style="background-color: #f9f9f9;border: 1px solid #ccc;">'
            )
          })
          .replace(/<td.*?>/g, function (a) {
            return a.indexOf('style') !== -1 ? a.replace('style="', 'style="background-color: #fff;border: 1px solid #ccc;') : '<td style="background-color: #fff;border: 1px solid #ccc;">'
          })
          .replace(/<blockquote/g, '<blockquote style="border-left: 6px solid #ddd;padding: 5px 0 5px 10px;margin: 10px 0 10px 10px;"')
          .replace(/<hr.*?>/g, '<div style="border-bottom: 1px #dddddd solid;height: 5px;margin-bottom: 5px;"></div>')
          .replace(/<img/g, '<img style="width: 100%;margin:auto;max-width: 100%;"')
          .replace(/<img(.*?)height=".*?"/g, '<img$1').replace(/<img(.*?)width=".*?"/g, '<img$1')
      }
    },
    onLoad(options){
      this.article = null
      if (options.articleId) {
        this.articleId = Number(options.articleId)
        this.loadArticle()
      }
    },
    mounted() {
      this.$wx.setNavigationBarColor({
        backgroundColor: '#ffffff',
        frontColor: '#000000'
      })
    }
  }
</script>

<style lang="less">
  .page-article-details {
    background-color: #ffffff;
    padding: 20rpx;
    .title {
      font-size: 22px;
      font-weight: bold;
    }
    .hr {
      border-bottom: 1rpx #f4f4f4 solid;
      height: 10rpx;
      margin-bottom: 10rpx;
    }
  }
</style>
