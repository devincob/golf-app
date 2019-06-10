<template>
  <view-box class="x-page" :class="'x-page-'+pageName" :bodyPaddingTop="bodyPaddingTop" :bodyPaddingBottom="bodyPaddingBottom">
    <slot name="content">
      <slot></slot>
    </slot>
  </view-box>
</template>

<script>
import {ViewBox} from 'vux'
import {tagLog} from '@/libs/extends'

export default {
  components: {ViewBox},
  props: ['bodyPaddingTop', 'bodyPaddingBottom', 'title', 'name', 'debug'],
  name: 'x-page',
  data() {
    return {
      pageName: this.name
    }
  },
  watch: {
    title(val) {
      document.title = val
    },
    name(val) {
      this.pageName = val
    },
    $route(to, from) {
      if (to.path === from.path) {
        this.$emit('query-change', {to, from})
        if ('onPageQueryChange' in this['$parent']) this['$parent'].onPageQueryChange({to, from})
      }
    }
  },
  methods: {
    setPageName() {
      this.pageName = this.name
      if (!this.pageName) {
        this.pageName = this.$route.name
      }
      try {
        document.body.parentElement.setAttribute('id', 'x-page-' + this.pageName)
        document.body.setAttribute('id', `x-page-${this.pageName}-body`)
      } catch (e) {
      }
    }
  },
  mounted() {
    this.setPageName()
    this.$emit('page-create')
    if ('onPageCreate' in this.$parent) this.$parent.onPageCreate()
    this.debug && tagLog(`x-page:${this.pageName}`, 'on-page-create')
    // fixWeChatOverScroll(this.$find('.vux-fix-safari-overflow-scrolling')[0])
  },
  beforeDestroy() {
    this.$emit('page-destroy')
    if ('onPageDestroy' in this.$parent) this.$parent.onPageDestroy()
    this.debug && tagLog(`x-page:${this.pageName}`, 'on-page-destroy', '#1AAD19', 'red')
  },
  activated() {
    this.setPageName()
    try {
      if (this.title) document.title = this.title || this.pageName || '无标题'
    } catch (e) {
    }
    this.$emit('page-show')
    if ('onPageShow' in this.$parent) this.$parent.onPageShow()
    this.debug && tagLog(`x-page:${this.pageName}`, 'on-page-show', '#1AAD19', '#1b89ff')
  },
  deactivated() {
    this.$emit('page-hide')
    if ('onPageHide' in this.$parent) this.$parent.onPageHide()
    this.debug && tagLog(`x-page:${this.pageName}`, 'on-page-hide', '#1AAD19', '#888')
  }
}
</script>
