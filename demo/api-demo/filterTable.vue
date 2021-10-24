<!--
 * @Author: imu
 * @Description: 筛选案例
-->

<template>
  <div>
    <TestTable :columns="columns" :data="data" @change="handleChange">
      <div slot="filterPanel" slot-scope="{ column }">
        <input
          type="text"
          :value="searchValue"
          @change="(e) => (searchValue = e.target.value)"
        />
        <div @click="() => handleSearch(column)">查询</div>
      </div>
      <span slot="filterIcon" slot-scope="filtered">{{
        filtered ? "筛选中" : ""
      }}</span>
    </TestTable>
  </div>
</template>

<script>
const columns = [
  {
    header: "Name",
    dataIndex: "name",
    scopeSlots: {
      filterPanel: "filterPanel",
      filterIcon: "filterIcon",
    },
    filter: {
      /**
       * @description: 自定义筛选面板的显示隐藏事件
       * @param {*} visible
       */
      onFilterPanelShow(visible) {
        console.log('visible', visible);
      },
    },
  },
  {
    header: "Sex",
    dataIndex: "sex",
  },
  {
    header: "Age",
    dataIndex: "age",
  },
];

export default {
  data() {
    return {
      data: [],
      columns,
      searchValue: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    /**
     * @description: 触发筛选
     * @param {*} sorter
     */
    handleSearch(column) {
      console.log(searchValue, this.searchValue);
      console.log("正在搜索的 column：", column);
    },
    /**
     * @description: 请求函数
     * @param {*} param
     */
    fetchData(param = {}) {
      fetch("/demo/mockdata", {
        body: JSON.stringify(param),
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.data = res.data;
        });
    },
  },
};
</script>
