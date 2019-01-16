<template>
  <div class="section-panel">
    <!-- section-panel -->
    <div class="panel">
      <div class="panel-head" @click="isShow=!isShow">
        <slot name="head">
          <i class="sec-icon"/>
          {{ title }}
        </slot>
        <el-button class="float-right btn-coll" type="text">
          <i v-if="isShow" class="iconfont icon-down"/>
          <i v-else class="iconfont icon-up"/>
        </el-button>
      </div>
      <div v-show="isShow" class="panel-body">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SectionPanel',
  components: {},
  props: { title: { type: String, default: '标题' }},
  data() {
    return { isShow: true }
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
.section-panel {
  .panel {
    margin: 10px;
    background-color: #ffffff;
    box-shadow: 8px 0px 8px 0px rgba(233, 227, 241, 0.56);
    .panel-head {
      padding: 10px;
      // font-weight: bold;
      // background: #f6f6f6;
      color: #000;
      font-size: 14px;
      cursor: pointer;
      line-height: 24px;
      user-select: none;
    }
    .sec-icon {
      display: inline-block;
      width: 3px;
      background: #666e7a;
      height: 14px;
      margin-right: 5px;
      position: relative;
      top: 3px;
    }

    .panel-body {
      padding: 10px;
    }

    .btn-coll {
      float: none;
      padding: 0;
      margin: 0;
      .iconfont {
        position: relative;
        top: 6px;
        right: 5px;
      }
    }

    .float-right {
      float: right;
    }
  }
}
</style>

