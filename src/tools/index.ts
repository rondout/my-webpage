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
  const msg = error?.data?.errMsg;
  msg && console.log({ msg });
}
