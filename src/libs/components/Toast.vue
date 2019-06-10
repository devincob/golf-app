<template>
  <transition name="fade">
    <div v-show="show" :class="cssClass" :style="'left:'+left+'px'">
      <slot><span v-html="cMessage"></span></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    type: {
      type: String,
      'default': 'default'
    },
    message: {
      type: String,
      default: 'text'
    },
    autoClose: {
      type: Number,
      default: 1500
    }
  },
  watch: {
    show(val, old) {
      if (val) {
        if (val === old) return
        let toast = this.toastQueue.shift()
        this.type = toast.type
        this.message = toast.message
        this.autoClose = toast.autoClose
        this.showTop = toast.showTop
        setTimeout(() => {
          this.show = false
          setTimeout(this.checkShow, 200)
        }, this.autoClose)
      }
    },
    message() {
      this.$nextTick(() => {
        this.left = (document.body.offsetWidth - this.$el.clientWidth) / 2
      })
    }
  },
  data() {
    return {
      left: 0,
      toastQueue: [],
      show: false,
      showTop: false
    }
  },
  computed: {
    cssClass() {
      let css = ['toast', 'toast-' + this.type]
      if (this.show) css.push('show')
      if (this.showTop) css.push('toast-position-top')
      return css.join(' ')
    },
    cMessage() {
      return String(this.message).replace(/\n/g, '<br>')
    }
  },
  methods: {
    push(options) {
      this.toastQueue.push(options)
      this.show = true
    },
    checkShow() {
      if (this.toastQueue.length) {
        this.show = true
      }
    },
    resize() {
      this.left = (document.body.offsetWidth - this.$el.clientWidth) / 2
    }
  },
  mounted() {
    window.addEventListener && window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.addEventListener && window.removeEventListener('resize', this.resize)
  }
}
</script>
