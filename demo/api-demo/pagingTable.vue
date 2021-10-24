<!--
 * @Author: imu
 * @Description: 具有分页功能的表格
-->
<template>
  <div>
    <TestTable
      :columns="columns"
      :data="data"
      :pagination="{
        disabled: false, // 是否禁止选择页数
        total,
        pagesize: 50, // 当前显示数量
        pagesizeOptions: [20, 50, 100], // 可调整显示数量
      }"
      @change="handleChange"
    >
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

let i = 0;
const data = [];
while (i < 123) {
  data.push({
    id: i,
    name: `People ${i}`,
    sex: i % 2 ? "male" : "female",
    age: Math.round(Math.random() * 100),
  });
  i++;
}

const total = data.length;

export default {
  data() {
    return {
      data,
      columns,
      total
    };
  },
  methods: {
    /**
     * @description: 分页、排序、筛选变化时触发
     * @param {*} pagination
     * @param {*} filters
     * @param {*} sorter
     */
    handleChange(pagination, filters, sorter) {
      console.log("pagination", pagination);
      console.log("filters", filters);
      console.log("sorter", sorter);
    },
  },
};
</script>
