// 页面 布局模板
<template>
  <div class="page-slot">page-slot
    <el-row>
      <el-col :span="6" :style="{width:colOneWidth+'px'}" class="col col-one">
        <slot name="one">col-one</slot>
      </el-col>
      <el-col :span="6" :style="{width:colTwoWidth+'px'}" class="col col-two">
        <slot name="two">col-two</slot>
      </el-col>
      <el-col :span="6" :style="{width:colThreeWidth+'px'}" class="col col-three">
        <slot name="three">col-three</slot>
      </el-col>
      <el-col :span="6" :style="{width:colFourWidth+'px'}" class="col col-four">
        <slot name="four">col-four</slot>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'PageSlot',
  components: {},
  props: {},
  data() {
    return {
      colOneWidth: 2258,
      colTwoWidth: 3018,
      colThreeWidth: 2258,
      colFourWidth: 1868
    }
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
.page-slot {
  font: inherit;

  .col {
    position: relative;
    height: 3059px;
  }

  .col-one {
  }
  .col-two {
  }
  .col-three {
  }
  .col-four {
  }
}
</style>

