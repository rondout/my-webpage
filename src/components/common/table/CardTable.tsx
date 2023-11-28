import { Box, Card, Checkbox, CheckboxProps, Pagination } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { BaseData, Id } from "../../../models/base.model";
import { parseIdObject, commonBoxShadow } from "../../../utils";
import { CommonTableProps, TableColumns } from "./CommonTable";
import EmptyData from "./EmptyData";
import TableLoading from "./TableLoading";

export interface MyCardProp<T extends BaseData<string | Id>> {
  showSelect: boolean;
  columns: TableColumns<T>[];
  data: any;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent) => void;
}

export const defaultColumnWidth = 200;

function MyCard<T extends BaseData<string | Id>>(props: MyCardProp<T>) {
  return (
    <Card sx={{ mb: 2, height: 72, p: "2px 8px", boxSizing: "border-box", boxShadow: commonBoxShadow }} className="flex-between">
      {props.showSelect ? <Checkbox color="primary" key="check-box-key" onChange={props.onChange} checked={props.checked} sx={{ mr: 1 }} /> : null}
      {props.columns.map((column) => (
        <div
          key={column.key}
          className="custom-table-item"
          style={{
            minWidth: column.width || defaultColumnWidth,
            width: column.width || defaultColumnWidth,
            flexGrow: column.keepWidth ? 0 : 1,
          }}
        >
          {column.customCell ? column.customCell(props.data) : props.data[column.key]}
        </div>
      ))}
    </Card>
  );
}

export interface CardTableProps<T extends BaseData<string | Id> = BaseData> extends CommonTableProps<T> {
  page?: number;
}

export default function CardTable<T extends BaseData = BaseData>(props: CardTableProps<T>) {
  const [page, setPage] = useState(props.page || 0);
  // 页面变化监听
  const onPageChange = (e, page: number) => {
    if (props.pageChange) {
      props.pageChange(page - 1);
    }
    setPage(page - 1);
  };
  // 如果父组件手动更改page就重置page
  useEffect(() => {
    setPage(props.page || 0);
  }, [props.page]);
  // 展示的数据
  const displayedRows = useMemo(() => props.rows || [], [props.rows]);

  const onCheckChange = (e: React.ChangeEvent<CheckboxProps>, record: T) => {
    if (props.onCheckedChange) {
      props.onCheckedChange(e.target.checked, record);
    }
  };

  const checkBoxWidth = props.showSelect ? 80 : 0;

  const computedColumnWidth =
    props.columns.reduce((prevValue, currentValue) => {
      return prevValue + (currentValue.width || defaultColumnWidth);
    }, 24) + checkBoxWidth;

  return (
    <Box sx={{ height: 1 / 1, position: "relative" }}>
      {props.loading && <TableLoading></TableLoading>}
      <Box sx={{ width: 1 / 1, overflowX: "auto", maxHeight: props.height }}>
        {displayedRows.length > 0 && (
          <Box sx={{ minWidth: props.width || computedColumnWidth, p: "3px" }}>
            {displayedRows?.slice(0, 8).map((item) => (
              <MyCard
                onChange={(e) => onCheckChange(e, item)}
                checked={props.selected?.some((v) => parseIdObject(v) === parseIdObject(item))}
                key={parseIdObject(item)}
                data={item}
                columns={props.columns}
                showSelect={props.showSelect}
              ></MyCard>
            ))}
          </Box>
        )}
        {displayedRows.length <= 0 && <EmptyData></EmptyData>}
      </Box>
      <Box sx={{ p: 1.5, pr: 0 }}>
        {displayedRows?.length > 0 && <Pagination page={page + 1} sx={{ display: "flex", justifyContent: "flex-end" }} count={props.totalPages} color="primary" onChange={onPageChange} />}
      </Box>
    </Box>
  );
}
