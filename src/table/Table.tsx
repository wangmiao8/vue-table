/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent } from "@vue/composition-api";
import { TablePublicProps, tableProps, Col } from "./types";

import "./Table.less";

// 根据 columns 匹配 data
function columnsKeys(props: TablePublicProps) {
  const { columns = [] } = props;
  if (!columns.length) return [];

  return computed(() => columns.map((i: any) => i.dataIndex));
}

export default defineComponent({
  name: "Table",
  props: tableProps,
  setup(props, { slots }) {
    const keys = columnsKeys(props);

    return () => {
      return (
        <div class="card">
          {props.title && <div class="card-header">{props.title}</div>}
          <div class="card-body">
            <table>
              {props.title && (
                <thead class="card-header">
                  <tr>
                    {props.columns.map((i: any) => (
                      <th>{i.header}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {props.data.map((item: any) => (
                  <tr>
                    {keys.value.map((key: any) => (
                      <td>{item[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="card-toolbal"></div>
        </div>
      );
    };
  }
});
