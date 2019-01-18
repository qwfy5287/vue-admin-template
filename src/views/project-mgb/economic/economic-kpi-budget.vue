// 预算总收入
<template>
  <div class="economic-kpi-budget">
    <!-- economic-kpi-budget -->
    <BigBar/>
  </div>
</template>
<script>
import BigBar from '@/views/echarts-big/big-bar.vue'
export default {
  name: 'EconomicKpiBudget',
  components: { BigBar },
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
.economic-kpi-budget {
  font: inherit;
}
</style>

