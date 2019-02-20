// 科创投入统计
<template>
  <div class="economic-technology-revexp">
    <!-- economic-technology-revexp -->
    <NumBar />
    <BigColumnSmall :list="list" unit="万元"/>
  </div>
</template>
<script>
import BigColumnSmall from '@/views/echarts-big/big-column-small.vue'
import { technologyInvestment } from './../api/economic'
import NumBar from './../components/num-bar.vue'

export default {
  name: 'EconomicTechnologyRevexp',
  components: { NumBar, BigColumnSmall },
  props: {},
  data() {
    return {
      list: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.fetchData()
    },
    async fetchData() {
      const res = await technologyInvestment()
      if (res.code === 0) {
        this.list = res.data.data
        // this.render()
      }
    },
    render() { }
  }
}
</script>
<style lang="scss">
.economic-technology-revexp {
  font: inherit;

  height: 315px;
}
</style>

