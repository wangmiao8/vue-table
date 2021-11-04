/*
 * @Author: imu
 * @Description: 表格组件
 */

import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { tableProps } from "./types";
import useColumns from "./composables/useColumns";
import useSort from "./composables/useSort";
import usePagenation from "./composables/usePagination";

// import "./Table.less";

export default defineComponent({
  name: "Table",
  props: tableProps,
  setup(props, { slots }) {
    let data = toRefs(props.data); // 保留源数据，用于取消排序复原
    let renderData = reactive([...data]); // 源数据的副本，用于排序和渲染

    const dataKeys = useColumns(props); // 列的对应数据的 keys
    const { sortData, showSortArrow } = useSort(props, dataKeys, data); // 排序相关方法
    const {
      currentPage,
      pagingArr,
      toFirst,
      toPrev,
      toPage,
      toAfter,
      toLast,
      getCurrentPage,
    } = usePagenation(props);

    return () => {
      return (
        <div class="card">
          {props.title && <div class="card-header">{props.title}</div>}
          <div class="card-body">
            <table>
              <thead>
                <tr>
                  {props.columns.map((i: any, index) => (
                    <th
                      key={index}
                      onClick={() => (renderData = sortData(index))}
                    >
                      {i?.slots?.title ? (
                        slots[i.slots.title] && slots[i.slots.title]()
                      ) : (
                        <span>{i.header}</span>
                      )}
                      {showSortArrow(index)}
                    </th>
                  ))}
                </tr>
              </thead>
              {data?.length > 0 && (
                <tbody>
                  {getCurrentPage(renderData).value.map((item: any) => (
                    <tr key={item.id}>
                      {dataKeys.value.map((key: string, index: number) => (
                        <td key={index}>
                          {props.columns[index]?.slots?.tabelCell
                            ? slots[props.columns[index].slots.tabelCell] &&
                              slots[props.columns[index].slots.tabelCell](
                                item[key]
                              )
                            : item[key]}
                        </td>
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
                <li class="toFirst" onClick={() => toFirst()}>
                  &lt;&lt;
                </li>
                <li class="toPrev" onClick={() => toPrev()}>
                  &lt;
                </li>
                {pagingArr.value.map((i: number) => (
                  <li
                    class={
                      "toPage " +
                      (currentPage.value === i - 1
                        ? "page-selected"
                        : "page-unselect")
                    }
                    key={i}
                    onClick={() => toPage(i - 1)}
                  >
                    {i}
                  </li>
                ))}
                <li class="toAfter" onClick={() => toAfter()}>
                  &gt;
                </li>
                <li class="toLast" onClick={() => toLast()}>
                  &gt;&gt;
                </li>
              </ul>
            </div>
          )}
        </div>
      );
    };
  },
});
