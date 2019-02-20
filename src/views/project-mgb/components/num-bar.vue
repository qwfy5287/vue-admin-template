// 划分千分位的数字条
<template>
  <div class="num-bar">
    <!-- num-bar -->

    <div class="totl">
      <div class="totLeft">总计</div>
      <div v-if="total" class="totRight">
        <div
          v-for="(item,index) in qf(total).toString().split('')"
          :key="index"
        >
          <p>{{ item || 0 }}</p>
        </div>
      </div>
      <span>万元</span>
    </div>

  </div>
</template>
<script>
export default {
  name: 'NumBar',
  components: {},
  props: {},
  data() {
    return {
      total: 1000000
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { },
    async fetchData() { },
    render() { },
    // 划分千分位

    qf(tempnum) {
      if (tempnum) {
        const figureNum = 3
        const newtempnum = (tempnum || 0).toString()
        let result = ''
        const newnum = newtempnum.split('.')
        let num = newnum[0]
        while (num.length > figureNum) {
          result = `,${num.slice(-figureNum)}${result}`// 这个逗号
          num = num.slice(0, num.length - figureNum)
        }
        if (num) {
          result = num + result
        }

        if (newnum.length > 1) {
          result += `.${newnum[1]}`
        }
        return result
      } else {
        return 0
      }
    }
  }
}
</script>
<style lang="scss">
.num-bar {
  font: inherit;

  .totl {
    width: 88%;
    height: 100px;
    margin: 0 auto;
    // margin-top: 20px;
    // background: red;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .totLeft {
      width: 175px;
      height: 84px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      line-height: 84px;
      color: #fff;
      border: 3px solid #6ac5d7;
    }
    .totRight {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      div {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: flex-start;
        p {
          list-style: none;
          width: 54px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 72px;
          line-height: 100px;
          background-color: rgba(44, 90, 135, 0.8);
          margin-left: 10px;
        }
      }
      div:nth-last-child(4n) p {
        background-color: transparent;
        width: 34px;
      }
    }
    span {
      font-size: 40px;
      color: #a5d9e7;
      display: flex;
      justify-content: flex-end;
      margin-left: 10px;
    }
  }
}
</style>

