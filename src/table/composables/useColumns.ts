import { computed, reactive } from "@vue/composition-api";
import { TablePublicProps } from "../types";

export default function useColumns(props) {
  const dataKey = columnsKeys(props);
  return dataKey;
}

// 根据 columns 匹配 data
function columnsKeys(props: TablePublicProps) {
  const { columns } = props;
  if (!columns || !columns.length) return reactive([]);

  return computed(() => columns.map((i: any) => i.dataIndex));
}
