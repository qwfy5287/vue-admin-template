// 列 标题
<template>
  <div class="col-title">{{ title }}</div>
</template>
<script>
export default {
  name: 'ColTitle',
  components: {},
  props: { title: { type: String, default: 'col-title' }},
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
.col-title {
  font: inherit;
  width: 1190px;
  height: 100px;
  background: url("./../assets/firstTitle.svg") center center no-repeat;
  background-size: 150% 150%;
  margin: 0 auto;
  position: absolute;
  top: -5px;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 100px;
}
</style>

