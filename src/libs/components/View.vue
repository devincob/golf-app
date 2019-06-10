<template>
  <view></view>
</template>

<script>
  import Vue from 'vue'
  Vue.component('block', {})
  Vue.component('view', {})
  Vue.component('navigator', {})
  Vue.component('image', {})
  export default {
    name: 'view',
    props: ['class']
  }
</script>

<style scoped>

</style>
