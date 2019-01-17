// sec title
<template>
  <div :style="{width:width}" class="sec-title">
    <div class="title-img">
      <img src="./../assets/img/left-crum.svg" height="100%" alt>
    </div>
    <div :style="{fontSize:fontsize}" class="title-text">{{ title }}</div>
    <div class="title-img">
      <img src="./../assets/img/right-crumb.svg" height="100%" alt>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SecTitle',
  components: {},
  props: {
    title: { type: String, default: 'sec-title' },
    width: {
      type: String,
      default: '100%'
    },
    fontsize: {
      type: String,
      default: '55px'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { },
    fetchData() { },
    render() { }
  }
}
</script>
<style lang="scss">
.sec-title {
  font: inherit;

  // margin: 0 auto;
  font-size: 55px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  .title-text {
    padding: 0 5px;
    white-space: nowrap;
  }
  .title-img {
    flex-grow: 1;
  }
  &:after {
    content: "";
    width: 100%;
    height: 5px;
    position: absolute;
    bottom: -5px;
    left: 0;
    background: linear-gradient(
      to right,
      RGBA(61, 143, 166, 0.1) 0%,
      #3d8fa6 50%,
      RGBA(61, 143, 166, 0.1) 100%
    );
  }
}
</style>

