// 暂无数据 图表
<template>
  <div class="not-data-chart">
    <!-- {{ title }} -->
  </div>
</template>
<script>
export default {
  name: 'NotDataChart',
  components: {},
  props: { title: { type: String, default: 'not-data-chart' }},
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
.not-data-chart {
  font: inherit;
  min-width: 100px;
  min-height: 50px;

  width: 100%;
  height: 100%;
  background-image: url("./../../../assets/img/no-data.svg");
  background-size: 100% 100%;

  // width: 1190px;
  // height: 100px;
  // background: url("./../assets/firstTitle.svg") center center no-repeat;
  // background-size: 150% 150%;
  // margin: 0 auto;
  // position: absolute;
  // top: -5px;
  // left: 0;
  // right: 0;
  // text-align: center;
  // line-height: 100px;
}
</style>

