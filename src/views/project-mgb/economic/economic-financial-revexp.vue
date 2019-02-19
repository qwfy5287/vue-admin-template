// 预算总收入
<template>
  <div class="economic-kpi-budget">
    <!-- economic-kpi-budget -->
    <BigColumn/>
  </div>
</template>
<script>
import BigColumn from '@/views/echarts-big/big-column.vue'
export default {
  name: 'EconomicKpiBudget',
  components: { BigColumn },
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

  height: 620px;
}
</style>

