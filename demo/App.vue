<!--
 * @Author: imu
 * @Description: 
-->
<template>
  <div>
    <TestTable
      :title="mock.title"
      :columns="mock.columns"
      :data="mock.data"
      :total="mock.total"
    >
      <span v->fdsjnfkdsn</span>
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
    return { mock };
  },
});
</script>