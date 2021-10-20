/*
 * @Author: imu
 * @Date: 2021-10-21 00:20:26
 * @LastEditTime: 2021-10-21 03:38:14
 * @LastEditors: imu
 * @Description: mock
 */
const data = (() => {
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
  console.log(
    "%cHi Noko Cat ->%c data",
    "color:#fb7299",
    "color:#01affd",
    data
  );

  return data;
})();

export default {
  title: "测试表格",
  columns: [
    {
      header: "Name",
      dataIndex: "name",
      sortable: true,
    },
    {
      header: "Sex",
      dataIndex: "sex",
      sortable: true,
    },
    {
      header: "Age",
      dataIndex: "age",
      sortable: true,
    },
  ],
  data: data,
  total: data.length,
  showPageToolbar: true,
};
