<template>
  <div v-if="activeId === 'qb'" class="weui-tab__panel wallet-panel">
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
    <block v-if="articles && articles.length">
      <div class="weui-cells" style="margin-top: 0;">
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
            <x-image :src="article.shareImg" alt=""/>
          </div>
        </a>
      </div>
      <wxc-loadmore :is-end="isEnd" text="已经到底了"></wxc-loadmore>
    </block>
    <wxc-abnor v-else-if="articles" type="DATA" title="没有找到相关报道"></wxc-abnor>
    <wxc-loadmore v-else-if="!articles" icon></wxc-loadmore>
  </div>
</template>

<script>
  import XImage from '../../libs/components/Image'
  export default {
    name: 'wallet',
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
        isEnd: false
      }
    },
    methods: {
      async loadArticleList(){
        try {
          this.$loading.show()
          const res = await this.$$main.articleQueryList({
            pageSize: this.pageSize,
            pageIndex: this.pageIndex
          })
          this.totalCount = res.totalCount
          if (this.pageIndex > 1) {
            this.articles = [...this.articles, ...res.datas]
          } else {
            this.articles = res.datas
          }
          if (res.datas.length < this.pageSize) {
            this.isEnd = true
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.$loading.hide()
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
  .wallet-panel.weui-tab__panel {
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
      padding: 28rpx 30rpx;
    }

    .weui-cell:before {
      left: 44rpx;
      right: 44rpx;
      height: 0;
      border-color: #f4f4f4;
    }
    .x-image {
      width: 214rpx;
      height: 156rpx;
      margin: 0 34rpx;
      display: block
    }
    .article-title {
      font-size: 32rpx;
    }
    .weui-cells__title {
      font-size: 38rpx;
      color: #333333;
      margin: 70rpx 0 0 0;
    }
    .article-swiper {
      width:682rpx;
      height:350rpx;
      background-color:#eee;
      margin:34rpx auto 0;
      overflow:hidden;
      .swiper-item{
        border-radius:10rpx;
        overflow:hidden;
      }
      .slide-image {
        width:682rpx;
        height:350rpx;
      }
    }
  }
</style>
