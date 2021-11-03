import { ref } from "@vue/composition-api";
import { sortBy } from "../utils";

export default function useSort(props, dataKeys, data) {
  const sortStatus = ref(0); // 0 不排序，1 升序，2 降序
  const sortCol = ref(NaN); // 需要排序的列

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
    return sortBy(sortStatus.value, dataKeys.value[colIndex], data);
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

  return {
    sortData,
    showSortArrow,
  };
}
