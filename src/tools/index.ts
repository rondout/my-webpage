import { MatSelectOptionFactory } from "../components/common/material/MatSelect";
import moment from "moment";

export const getLocalStorageItem = (key: string): string => {
  try {
    if (typeof localStorage !== undefined) {
      return localStorage.getItem(key);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof localStorage !== undefined) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {}
  }
};

export function isNull(param: any): boolean {
  return [null, undefined, "", NaN].includes(param);
}

export function handleResponseError(error: any) {
  const msg = error?.data?.errMsg || error?.data;
  msg && console.log({ msg });
}

/**
 *
 * @description 把map数据转换为select的options
 */
export function labelMapToSelectOptions<
  T extends Map<any, any> = Map<any, any>
>(mapData: T) {
  const options: MatSelectOptionFactory[] = [];
  mapData.forEach((label, key) =>
    options.push(new MatSelectOptionFactory(key, label))
  );
  return options;
}

export function timeFormat(
  date: string | Date | number,
  formatter = "YYYY-MM-DD HH:mm:ss"
) {
  try {
    return moment(date).format(formatter);
  } catch (error) {
    return date;
  }
}
