<!--
 * @Author: imu
 * @Description: 排序功能案例
-->

<template>
  <div>
    <TestTable :columns="columns" :data="data" @change="handleChange">
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
    sorter: {
      directions: ["desc", "asc"], // 需要支持的分页方式, 最多三种状态（升序、降序、不排序）
      compare: (rowA, rowB) => rowA.age - rowB.age,
    }, // 本地排序
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
    handleChange(sorter) {
      console.log('sorter', sorter);
    },
  },
};
</script>
