// 对 data 进行排序，只能排序只有一层的对象数组，仅支持字符和数值排序
// 1 升序，2 降序，其他不排序
export function sortBy(type: number, sortKey: string, data: []) {
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
