<template>
  <div>
    <TestTable
      :title="mock.title"
      :columns="mock.columns"
      :data="mock.data"
      :total="mock.total"
    >
      <div slot="slotA" style="color: blue">Name</div>
      <span slot="slotB" style="color: red">Sex</span>
      <template v-slot:tabelCellA="content">
        <div @click="handleClick" style="cursor: pointer">
          单元格自定义渲染：{{ content }}
        </div>
      </template>
    </TestTable>
  </div>
</template>

<script lang="ts">
import { TestTable } from "../src/table";
import { defineComponent, reactive } from "@vue/composition-api";

import mockdata from "./datamock";

export default defineComponent({
  name: "App",
  components: {
    TestTable,
  },
  setup() {
    const mock = reactive(mockdata);
    return { mock, handleClick: () => alert("没做东西，别点啦") };
  },
});
</script>
