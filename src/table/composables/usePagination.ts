import { computed, ref } from "@vue/composition-api";
import { TablePublicProps } from "../types";

export default function usePagenation(props: TablePublicProps) {
  const currentPage = ref(0); // 当前页数
  const pagingArr = computed(() => {
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
  }); // 底部分页按钮

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
  function getCurrentPage(renderData) {
    const { pageToolbar } = props;
    const { pageSize } = pageToolbar;
    return computed(() =>
      renderData.slice(
        currentPage.value * pageSize,
        (currentPage.value + 1) * pageSize
      )
    );
  }

  return {
    currentPage,
    pagingArr,

    toFirst,
    toPrev,
    toPage,
    toAfter,
    toLast,
    getCurrentPage,
  };
}
