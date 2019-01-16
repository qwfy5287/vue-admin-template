<template>
  <div class="search-main">
    <!-- search-main -->
    <SectionPanel title="检索条件">
      <SearchForm/>
    </SectionPanel>
    <SectionPanel title="结果列表">
      <SearchTable/>
    </SectionPanel>
  </div>
</template>

<script>
import SearchForm from './search-form.vue'
import SearchTable from './search-table.vue'

import SectionPanel from '@/components/section-panel.vue'

export default {
  name: 'SearchMain',
  components: { SectionPanel, SearchForm, SearchTable },
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
    init() {
      this.render()
    },
    render() { },
    fetchData() { }
  }
}
</script>

<style lang="scss">
.search-main {
  font: inherit;
}
</style>

