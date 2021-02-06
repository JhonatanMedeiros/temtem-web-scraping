async function asyncForEach(array: any[], startIndex: number = 0, callback: (value: any, index: number, array: any[]) => void): Promise<any> {
  for (let index: number = startIndex; index < array.length; index = index + 1) {
    await callback(array[index], index, array);
  }
}

export default asyncForEach;
