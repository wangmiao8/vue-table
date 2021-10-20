export default {
  title: "测试表格",
  columns: [
    {
      header: "Name",
      dataIndex: "name",
      sortable: false
    },
    {
      header: "Sex",
      dataIndex: "sex",
      sortable: false
    },
    {
      header: "Age",
      dataIndex: "age",
      sortable: true
    }
  ],
  data: [
    {
      id: 0,
      name: "People A",
      sex: "male",
      age: 22
    },
    {
      id: 1,
      name: "People B",
      sex: "female",
      age: 28
    },
    {
      id: 2,
      name: "People C",
      sex: "male",
      age: 24
    }
  ],
  total: 10,
  showPageToolbar: true
};
