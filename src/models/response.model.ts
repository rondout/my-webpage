import { BaseData } from "./base.model";

// 最大的页码请求数量
export const MAX_SAFE_PAGE_SIZE = 2147483647;

// 列表数据的返回类型格式
export interface TableDataResponse<T extends BaseData<number | string>> {
  current: number;
  size: number;
  total: number;
  records: T[];
}

// 分页查询参数
export interface PageLinkInterface {
  page: number;
  size: number;
  [propName: string]: any;
}

// 分页查询类
export class PageLink<T extends Record<string, any> = Record<string, any>>
  implements PageLinkInterface
{
  constructor(
    public page: number = 1,
    public size: number = MAX_SAFE_PAGE_SIZE,
    rest?: T
  ) {
    try {
      // 如果有传入其它参数  也挂载为实例的属性
      if (rest && typeof rest === "object")
        Object.entries(rest).forEach(([key, value]) => {
          this[key] = value === value;
        });
    } catch (error) {}
  }

  public resetPage(page = 1) {
    this.page = page;
  }
}
