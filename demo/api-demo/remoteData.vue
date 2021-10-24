<!--
 * @Author: imu
 * @Description: 远程加载数据案例
-->

<template>
  <div>
    <TestTable
      :columns="columns"
      :data="data"
      :pagination="{
        pagesize: 50, // 当前显示数量
        pagesizeOptions: [20, 50, 100], // 可调整显示数量
      }"
      @change="handleChange"
    >
      <span slot="name" slot-scope="text">{{ text }}</span>
      <span slot="customTitle">这是一个自定义的列表头</span>
    </TestTable>
  </div>
</template>

<script>
const columns = [
  {
    header: "Name",
    dataIndex: "name",
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
      data,
      columns,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    handleChange(pagination) {
      this.fetchData({
        results: pagination.pageSize,
        page: pagination.current, // 当前页数
      });
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
