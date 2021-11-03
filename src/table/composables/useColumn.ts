/*
 * @Author: imu
 * @Description:
 */
import { toRefs } from "@vue/composition-api";

export function useColumn(props: any) {
  const columns = toRefs(props.columns);
  console.log("%cHi Noko Cat ->%c columns", "color:#fb7299", "color:#01affd", columns);

  return {};
}
