// 模板文件
<template>
  <div class="big-bg big-main">big-main
    <el-row>
      <el-col :span="6" class="col-one">
        <div class="box1">
          <BigBar/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BigBar from './big-bar'
export default {
  name: 'BigMian',
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
.big-main {
  font: inherit;

  width: 9600px;
  height: 3240px;

  .col-one {
    width: 1806px;
  }
  .col-two {
    font: inherit;
  }
  .col-three {
    font: inherit;
  }
  .col-four {
    font: inherit;
  }

  .box1 {
    // width: 1806px;
    height: 413px;
  }
}
</style>

