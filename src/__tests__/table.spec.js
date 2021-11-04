// 这个测试用例仅用来学习 jest，覆盖率虽高但参考意义不大
import { mount } from "@vue/test-utils";
import { TestTable } from "../table";

import mockdata from "../../demo/datamock";

describe("Table", () => {
  const TableMount = (options) => mount(TestTable, options);

  test("render", () => {
    const wrapper = TableMount({
      title: "Test",
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
      data: [
        {
          id: 0,
          name: `People 0`,
          sex: "male",
          age: 11,
        },
      ],
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => {
      wrapper.vm.$forceUpdate();
      wrapper.vm.$destroy();
    }).not.toThrow();
  });

  test("props ", () => {
    const wrapper = TableMount({
      propsData: {
        title: "Test",
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
        data: [
          {
            id: 0,
            name: `People 0`,
            sex: "male",
            age: 11,
          },
        ],
        total: 1,
        showPageToolbar: true,
      },
    });

    expect(wrapper.find(".card-header").exists()).toBeTruthy();
    expect(wrapper.find("th").exists()).toBeTruthy();
    expect(wrapper.find("td").exists()).toBeTruthy();
    expect(wrapper.find(".card-toolbal").exists()).toBeTruthy();
  });

  test("noData", () => {
    const wrapper = TableMount({
      propsData: {
        columns: [],
        data: [],
        showPageToolbar: false,
      },
    });

    expect(wrapper.find(".card-header").exists()).toBeFalsy();
    expect(wrapper.find("th").exists()).toBeFalsy();
    expect(wrapper.find("td").exists()).toBeFalsy();
    expect(wrapper.find(".pagination").exists()).toBeFalsy();
  });

  test("pagination click", async () => {
    const wrapper = TableMount({
      propsData: mockdata,
    });

    await wrapper.find(".toFirst").trigger("click");
    await wrapper.find(".toPrev").trigger("click");
    await wrapper.find(".toAfter").trigger("click");
    await wrapper.find(".toPrev").trigger("click");
    await wrapper.find(".toLast").trigger("click");
    await wrapper.find(".toAfter").trigger("click");
    await wrapper.find(".toPage").trigger("click");
  });

  test("sort click", async () => {
    const wrapper = TableMount({
      propsData: mockdata,
    });

    await wrapper.find("th").trigger("click");
    await wrapper.find("th").trigger("click");
    await wrapper.find("th").trigger("click");
  });

  test("no data sort click", async () => {
    const wrapper = TableMount({
      propsData: {
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
        data: [],
        showPageToolbar: false,
      },
    });

    await wrapper.find("th").trigger("click");
  });
});
