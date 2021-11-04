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
  return data;
})();

export default {
  title: "测试表格",
  columns: [
    {
      header: "Name",
      dataIndex: "name",
      sortable: true,
      slots: {
        title: "slotA",
      },
    },
    {
      header: "Sex",
      dataIndex: "sex",
      sortable: true,
      slots: {
        title: "slotB",
        tabelCell: "tabelCellA",
      },
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
