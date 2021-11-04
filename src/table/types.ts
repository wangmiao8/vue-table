/*
 * @Author: imu
 * @Date: 2021-10-21 00:20:26
 * @LastEditTime: 2021-11-04 11:52:26
 * @LastEditors: Please set LastEditors
 * @Description: ts 的一些定义
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PropOptions, PropType } from "vue-types/dist/types";
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never;
}[keyof T];

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>;
type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
  ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
  : T extends ObjectConstructor | { type: ObjectConstructor }
  ? Record<string, any>
  : T extends BooleanConstructor | { type: BooleanConstructor }
  ? boolean
  : T extends Prop<infer V, infer D>
  ? unknown extends V
    ? D
    : V
  : T;

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxPublicPropTypes<O> = O extends object
  ? { [K in PublicRequiredKeys<O>]: InferPropType<O[K]> } & {
      [K in PublicOptionalKeys<O>]?: InferPropType<O[K]>;
    }
  : { [K in string]: any };

// Props 定义在这里
export const tableProps = {
  title: String,
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  total: Number,
  showPageToolbar: {
    type: Boolean,
    default: true,
  },
  pageToolbar: {
    type: Object,
    default: () => ({
      noDataShow: false,
      pageSize: 20,
      showOption: false,
      pageSizeOption: [10, 20, 50],
    }),
  },
};

export interface Col {
  header: string;
  dataIndex: string;
  sortable: boolean;
}

export type TablePublicProps = IxPublicPropTypes<typeof tableProps>;
