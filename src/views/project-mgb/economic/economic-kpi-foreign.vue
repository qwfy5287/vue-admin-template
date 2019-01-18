// 历年外资流动
<template>
  <div class="economic-kpi-foreign">
    <!-- economic-kpi-foreign -->
    <BigArea :list="list"/>
  </div>
</template>
<script>
import BigArea from '@/views/echarts-big/big-area.vue'
import { kpiForeign } from './../api/economic'
export default {
  name: 'EconomicKpiForeign',
  components: { BigArea },
  props: {},
  data() {
    return {
      list: []
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
      const res = await kpiForeign()
      if (res.code === 0) {
        this.list = res.data
        // this.render()
      }
    },
    render() { }
  }
}
</script>
<style lang="scss">
.economic-kpi-foreign {
  font: inherit;
}
</style>

