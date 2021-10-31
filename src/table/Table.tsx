/*
 * @Author: imu
 * @Date: 2021-10-21 00:20:26
 * @LastEditTime: 2021-10-30 17:53:24
 * @LastEditors: Please set LastEditors
 * @Description: 表格组件
 */

import {
  computed,
  defineComponent,
  reactive,
  Ref,
  ref,
  toRef,
  toRefs,
} from "@vue/composition-api";
import { TablePublicProps, tableProps } from "./types";
import { useColumn } from "./composables/useColumn";

import "./Table.less";

// 根据 columns 匹配 data
function columnsKeys(props: TablePublicProps) {
  const { columns = [] } = props;
  if (!columns.length) return [];

  return computed(() => columns.map((i: any) => i.dataIndex));
}

// 获取底部分页页数
function getPaging(props: TablePublicProps) {
  return computed(() => {
    const { pageToolbar, total } = props;
    const { pageSize } = pageToolbar;
    const paging = Math.ceil(total / pageSize);
    const pagingArr = [];
    let i = 1;

    while (i <= paging) {
      pagingArr.push(i);
      i++;
    }
    return pagingArr;
  });
}

export default defineComponent({
  name: "Table",
  props: tableProps,
  setup(props, { slots }) {
    let data = toRefs(props.data); // 保留源数据，用于取消排序复原
    let renderData = reactive([...data]); // 源数据的副本，用于排序和渲染
    const currentPage: Ref = ref(0); // 当前页数
    const sortCol: Ref = ref(undefined); // 需要排序的列
    const sortStatus: Ref = ref(0); // 0 不排序，1 升序，2 降序
    const keys = columnsKeys(props); // 列的 keys
    const pagingArr = getPaging(props); // 底部分页按钮

    console.log(
      "%cHi Noko Cat ->%c slot",
      "color:#fb7299",
      "color:#01affd",
      slots
    );
    useColumn(props);

    // 列表排序，暂时只能互斥，还不能取交集
    function sortData(colIndex: number) {
      if (colIndex === sortCol.value) {
        sortStatus.value += 1;
        if (sortStatus.value > 2) {
          sortStatus.value = 0;
        }
      } else {
        sortCol.value = colIndex;
        sortStatus.value = 1;
      }
      renderData = sortBy(sortStatus.value, keys.value[colIndex], data);
    }

    // 排序的箭头显示规则
    function showSortArrow(colIndex: number) {
      if (!props.columns[colIndex].sortable) return "";
      if (sortCol.value === colIndex) {
        switch (sortStatus.value) {
          case 1: {
            return " ↑";
          }
          case 2: {
            return " ↓";
          }
          default: {
            return "";
          }
        }
      }
      return "";
    }

    // 跳第一页
    function toFirst() {
      currentPage.value = 0;
    }

    // 跳前一页
    function toPrev() {
      if (currentPage.value <= 0) return;
      currentPage.value = currentPage.value - 1;
    }

    // 跳指定页
    function toPage(num: number) {
      currentPage.value = num;
      console.log();
    }

    // 跳后一页
    function toAfter() {
      const last = pagingArr.value[pagingArr.value.length - 1] - 1;
      if (currentPage.value >= last) return;
      currentPage.value = currentPage.value + 1;
    }

    // 跳第最后一页
    function toLast() {
      currentPage.value = pagingArr.value[pagingArr.value.length - 1] - 1;
    }

    // 当前页面需要渲染的列表
    function getCurrentPage() {
      const { pageToolbar } = props;
      const { pageSize } = pageToolbar;
      return computed(() =>
        renderData.slice(
          currentPage.value * pageSize,
          (currentPage.value + 1) * pageSize
        )
      );
    }

    console.log(
      "%cHi Noko Cat ->%c props",
      "color:#fb7299",
      "color:#01affd",
      props
    );

    return () => {
      return (
        <div class="card">
          {props.title && <div class="card-header">{props.title}</div>}
          <div class="card-body">
            <table>
              {props.title && (
                <thead>
                  <tr>
                    {props.columns.map((i: any, index) => (
                      <th key={index} onClick={() => sortData(index)}>{`${
                        i.header
                      }${showSortArrow(index)}`}</th>
                    ))}
                    <tr>{slots.default()}</tr>
                  </tr>
                </thead>  
              )}
              {data?.length > 0 && (
                <tbody>
                  {getCurrentPage().value.map((item: any) => (
                    <tr key={item.id}>
                      {keys.value.map((key: string, index: number) => (
                        <td key={index}>{item[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          {props.showPageToolbar && (
            <div class="card-toolbal">
              <ul class="pagination">
                <li onClick={() => toFirst()}>&lt;&lt;</li>
                <li onClick={() => toPrev()}>&lt;</li>
                {pagingArr.value.map((i: number) => (
                  <li
                    class={
                      currentPage.value === i - 1
                        ? "page-selected"
                        : "page-unselect"
                    }
                    key={i}
                    onClick={() => toPage(i - 1)}
                  >
                    {i}
                  </li>
                ))}
                <li onClick={() => toAfter()}>&gt;</li>
                <li onClick={() => toLast()}>&gt;&gt;</li>
              </ul>
            </div>
          )}
        </div>
      );
    };
  },
});

/* 一些不是那么通用的工具函数 */

// 对 data 进行排序，只能排序只有一层的对象数组，仅支持字符和数值排序
// 1 升序，2 降序，其他不排序
function sortBy(type: number, sortKey: string, data: []) {
  if ((!type && type !== 0) || !sortKey || data.length <= 0)
    throw new Error("参数不可缺失，并且数组长度不为0");
  const isString = typeof data[0][sortKey] === "string";
  const isNumber = typeof data[0][sortKey] === "number";

  const strAsc = (a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return -1;
    }
    if (a[sortKey] > b[sortKey]) {
      return 1;
    }
    return 0;
  };

  const strDesc = (a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return -1;
    }
    return 0;
  };

  const asc = () => {
    const arr = [...data];
    isString && arr.sort(strAsc);
    isNumber && arr.sort((a, b) => a[sortKey] - b[sortKey]);
    return arr;
  };

  const desc = () => {
    const arr = [...data];
    isString && arr.sort(strDesc);
    isNumber && arr.sort((a, b) => b[sortKey] - a[sortKey]);
    return arr;
  };

  if (type === 1) {
    return asc();
  } else if (type === 2) {
    return desc();
  } else {
    return data;
  }
}
