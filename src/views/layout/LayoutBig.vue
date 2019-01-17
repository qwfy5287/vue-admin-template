// 大屏 主框架
<template>
  <div class="layout-big">
    <!-- ayout-big -->
    <AppMainBig/>
  </div>
</template>
<script>
import { AppMainBig } from './components'

export default {
  name: 'LayoutBig',
  components: { AppMainBig },
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
.layout-big {
  font: inherit;

  width: 9600px;
  height: 3240px;
  background: #000010;
  color: white;
  font-size: 45px;

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>

