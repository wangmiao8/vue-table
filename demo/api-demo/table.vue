<!--
 * @Author: imu
 * @Date: 2021-10-23 17:15:50
 * @LastEditTime: 2021-10-24 18:59:39
 * @LastEditors: imu
 * @Description: 
    分页、宽高、
-->
<template>
  <div>
    <TestTable
      :width="500"
      :height="400"
      :columns="columns"
      :data="data"
      :total="data.length"
      :bordered="true"
    >
    </TestTable>
  </div>
</template>

<script>
const columns = [
  {
    header: "Name",
    dataIndex: "name",
    width: 100,
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

const total = 123;

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>
