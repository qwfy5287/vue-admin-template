// 财政指标
<template>
  <div class="economic-technology-main">
    <!-- economic-technology-main -->
    <SecTitle width="800px" title="科创投入统计"/>
    <div class="sec-body">
      <EconomicTechnologyRevexp />
    </div>
  </div>
</template>
<script>
import SecTitle from './../components/sec-title.vue'

import EconomicTechnologyRevexp from './economic-technology-revexp.vue'
export default {
  name: 'EconomicTechnologyMain',
  components: { SecTitle, EconomicTechnologyRevexp },
  props: {},
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
.economic-technology-main {
  font: inherit;

  .sec-body {
    padding: 50px;
  }
}
</style>

