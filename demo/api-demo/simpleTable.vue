<!--
 * @Author: imu
 * @Description: 

    简单的数据渲染表格组件，适合不分页一次性呈现全部数据
    1. 支持自定表头的渲染
    2. 支持自定义单元格的渲染
    3. 固定表头宽度
    4. 带边框

-->

<template>
  <div>
    <TestTable
      :columns="columns"
      :data="data"
      :bordered="true"
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
    width: 100, // 固定宽度
    slots: { title: "customTitle" }, // 自定义表头内容
    scopedSlots: { customRender: "name" }, // 自定义单元格内容
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
    };
  },
};
</script>
