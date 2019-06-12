<template>
  <div v-if="activeId === 'qb'" class="weui-tab__panel event-article-panel">
    <swiper class="article-swiper" :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration">
      <block v-for="item in imgUrls" :key="item">
        <swiper-item class="swiper-item">
          <image :src="item" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="weui-cells__title">报道</div>
    <wxc-abnor v-if="errorMessage"
               type="REQUEST_ERROR"
               @abnortap="$wx.startPullDownRefresh()"
               :title="errorMessage"></wxc-abnor>
    <block v-else-if="articles">
      <div v-if="articles.length" class="weui-cells" style="margin-top: 0;">
        <a v-for="article in articles" :key="article.articleId" class="weui-cell weui-cell_access article-item" :href="'/pages/article-details/main?articleId='+article.articleId">
          <div class="weui-cell__hd"></div>
          <div class="weui-cell__bd" style="display: flex;flex-direction: column;justify-content:space-between;height: 172rpx;">
            <h3 class="article-title"><wxc-elip line="2">{{article.articleTitle}}</wxc-elip></h3>
            <div style="display: flex;justify-content: space-between;font-size: 22rpx;color: rgba(0,0,0,.6)">
              <div>
                <img src="/static/images/article_view_icon.jpg" style="width: 32rpx;height: 18rpx;" alt="">
                <span style="margin-left:10rpx;">{{article.viewTimes || 0}}</span>
              </div>
              <div>
                {{article.createDate || ''}}
              </div>
            </div>
          </div>
          <div class="weui-cell__ft">
            <x-image :src="article.shareImg" img-class="article-img" lazy-load mode="aspectFill" :alt="article.articleTitle"/>
          </div>
        </a>
      </div>
      <wxc-abnor v-else type="DATA" title="没有找到相关报道"></wxc-abnor>
    </block>
    <wxc-loadmore v-if="isEnd" is-end text="已经到底了"></wxc-loadmore>
    <wxc-loadmore v-else-if="!articles || articles.length" icon></wxc-loadmore><!--loading-->
  </div>
</template>

<script>
  import XImage from '../../libs/components/Image'
  export default {
    name: 'EventArticle',
    components: {XImage},
    props: {
      activeId: String
    },
    data() {
      return {
        imgUrls: [
          'http://test.golf.static.i-caiwu.com/images/20190606/d278acd5b61b401f9ddc16eed5a4f832.png',
          'http://test.golf.static.i-caiwu.com/images/20190606/d278acd5b61b401f9ddc16eed5a4f832.png',
          'http://test.golf.static.i-caiwu.com/images/20190606/d278acd5b61b401f9ddc16eed5a4f832.png'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,

        pageSize: 5,
        pageIndex: 1,
        totalCount: 0,
        articles: null,
        isEnd: false,
        errorMessage: null
      }
    },
    methods: {
      async loadArticleList(){
        try {
          const res = await this.$$main.articleQueryList({
            pageSize: this.pageSize,
            pageIndex: this.pageIndex
          })
          this.totalCount = res.totalCount
          let datas = res.datas
          if (this.pageIndex > 1) {
            if (datas.length) {
              this.articles = [...this.articles, ...datas]
            }
            this.isEnd = datas.length < this.pageSize
          } else {
            this.articles = datas
            this.isEnd = datas.length && datas.length < this.pageSize
          }
          this.errorMessage = null
        } catch (e) {
          if (e && e.message) {
            this.errorMessage = e.message
          }
        }
      },
      onTabPanelActivated(t){
        this.$wx.setNavigationBarColor({
          backgroundColor: '#ffffff',
          frontColor: '#000000'
        })
        if (!this.articles) {
          this.loadArticleList()
        }
      },
      onPullDownRefresh(){
        this.pageIndex = 1
        this.isEnd = false
        this.articles = []
        this.loadArticleList().then(this.$wx.stopPullDownRefresh).catch(this.$wx.stopPullDownRefresh)
        return false
      },
      onReachBottom(){
        if (!this.isEnd) {
          this.pageIndex++
          this.loadArticleList()
        }
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .event-article-panel.weui-tab__panel {
    color: #333333;
    background-color: #FFFFFF;
    padding: 0 0 58px 0;
    .weui-cell {
      align-items: start;
    }
    .weui-cells:before {
      border-top: none;
    }

    .weui-cells:after {
      border-bottom: none;
    }
    .weui-cell{
      padding: 14px 15px;
    }

    .weui-cell:before {
      left: 22px;
      right: 22px;
      height: 0;
      border-color: #f4f4f4;
    }
    .x-image {
      width: 107px;
      height: 78px;
      margin: 0 17px;
      display: block
    }
    .article-title {
      font-size: 16px;
    }
    .weui-cells__title {
      font-size: 19px;
      color: #333333;
      margin: 35px 0 0 0;
      font-weight: bold;
    }
    .article-swiper {
      width:341px;
      height:175px;
      background-color:#eee;
      margin:17px auto 0;
      overflow: auto;
      border-radius: 5px;
      .swiper-item{
      }
      .slide-image {
        width:341px;
        height:175px;
      }
    }
    .article-img {
      border-radius: 4px;
    }
  }
</style>
