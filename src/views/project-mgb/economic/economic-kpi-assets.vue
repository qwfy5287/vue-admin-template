// 社会总资产
<template>
  <div class="economic-kpi-assets">
    <!-- economic-kpi-assets -->
    <ul class="list-ul">
      <li>
        <h2>
          {{ item.societyInvestment }}
          <span class="unit">亿</span>
        </h2>
        <p>全社会
          <br>固定资产投资
        </p>
      </li>
      <li>
        <h2>
          {{ item.industrialInvestment }}
          <span class="unit">亿</span>
        </h2>
        <p>工业
          <br>固定资产投资
        </p>
      </li>
      <li>
        <h2>
          {{ item.goodsSales }}
          <span class="unit">亿</span>
        </h2>
        <p>工业
          <br>固定资产投资
        </p>
      </li>
      <li>
        <h2>
          {{ item.urbanIncome }}
          <span class="unit">元</span>
        </h2>
        <p>城镇居民
          <br>人均可支配收入
        </p>
      </li>
      <li>
        <h2>
          {{ item.residentsIncome }}
          <span class="unit">元</span>
        </h2>
        <p>农村居民
          <br>人均可支配收入
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'EconomicKpiAssets',
  components: {},
  props: {},
  data() {
    return {
      item: {
        goodsSales: 178.21,
        industrialInvestment: 60.23,
        residentsIncome: 19925,
        societyInvestment: 286.98,
        urbanIncome: 38406
      }
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
.economic-kpi-assets {
  font: inherit;

  .list-ul {
    text-align: center;
    & > li {
      display: inline-block;

      width: 395px;
      height: 300px;
      background: url("./../assets/img/capital.svg") center center no-repeat;
      background-size: 100% 100%;
      h2 {
        display: inline-block;
        height: 90px;
        font-size: 82px;
        font-family: Helvetica;
        color: #2bd5fd;
        line-height: 90px;
        vertical-align: middle;
        margin: 0;
        margin-top: 40px;
        margin-bottom: 20px;
        .unit {
          display: inline-block;
          height: 72px;
          font-size: 45px;
          font-family: MicrosoftYaHei;
          color: #b3e7f2;
          margin-left: 20px;
          line-height: 72px;
          vertical-align: middle;
        }
      }
      p {
        height: 50px;
        font-size: 45px;
        font-family: Helvetica;
        color: #a5d9e7;
        line-height: 50px;
        text-align: center;
        vertical-align: middle;
        letter-spacing: 8px;
        margin: 0;
      }
    }
  }
}
</style>

