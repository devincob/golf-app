<template>
  <img :src="imgSrc"
       class="x-image"
       :style="imgStyle"
       :class="imgClass"
       :data-src="getUploadImageUrl(src, '')"
       @error="onError"
       @click="(e)=>$emit('click', e)"
       @load="(e)=>$emit('load', e)"/>
</template>
<script>
  export default {
    name: 'x-image',
    props: {
      src: String,
      style: [String, Object],
      imgStyle: [String, Object],
      imgClass: [String, Object],
      dataSrc: String,
      placeholder: String,
      size: {
        type: [String],
        'default': 'small'
      }
    },
    data() {
      return {
        img: this.src || this.dataSrc
      }
    },
    computed: {
      imgSrc() {
        return this.img ? this.realSrc(this.img) : this.placeholder || this.$config.errorImage
      }
    },
    methods: {
      onError(e) {
        this.img = this.placeholder || this.$config.errorImage
      },
      realSrc(src) {
        if (src && src.substr(0, 4) !== 'http' && src[0] === '/') {
          return this.getUploadImageUrl(src, this.size)
        }
        return src || this.$config.errorImage
      }
    },
    mounted() {
      // if(!this.img && this.dataSrc){
      //     this.$el.src = this.placeholder || this.$config.errorImage;
      //     let img = new Image();
      //     img.onload = ()=>{
      //         this.img = this.$el.src = img.src;
      //         img = null;
      //     };
      //     img.onerror = ()=>{
      //         this.$el.src = this.placeholder || this.$config.errorImage;
      //         img = null;
      //     };
      //     img.src = this.realSrc(this.dataSrc);
      // }
    }
  }
</script>
