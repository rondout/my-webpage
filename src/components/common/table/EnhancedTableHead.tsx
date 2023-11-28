import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { styled } from "@mui/styles";
import { visuallyHidden } from "@mui/utils";
import { t } from "i18next";
import { BaseData, Id } from "../../../models/base.model";
import { getColumnStickyStatus, TableColumns } from "./CommonTable";

export type Order = "asc" | "desc";

/**
 *
 *
 * @export
 * @interface EnhancedTableProps
 * @template T 用户将table内容定义的数据结构T传递给TableColumns
 */
export interface EnhancedTableProps<T extends BaseData<string | Id>> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headerCells: TableColumns<T>[];
  orderAble?: boolean;
  showSelect?: boolean;
}

const StyledTableHead = styled(TableHead)(() => {
  return {
    "& .sticky-cell": {
      zIndex: 4,
    },
  };
});

export function EnhancedTableHead<T extends BaseData<string | Id>>(props: EnhancedTableProps<T>) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, showSelect } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <StyledTableHead>
      <TableRow sx={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}>
        {showSelect ? (
          <TableCell sx={{ zIndex: 4 }} className="sticky-cell" padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        ) : null}
        {props.headerCells?.map((headCell) => (
          <TableCell
            className={getColumnStickyStatus<T>(headCell, props.showSelect)}
            sx={{ color: "#0000008c", zIndex: 3 }}
            key={headCell.key}
            align="left"
            padding={"normal"}
            sortDirection={orderBy === headCell.sortKey ? order : false}
          >
            {headCell.sortAble ? (
              <TableSortLabel active={orderBy === headCell.sortKey} direction={orderBy === headCell.sortKey ? order : "desc"} onClick={createSortHandler(headCell.sortKey)}>
                {t(headCell.title)}
                {orderBy === headCell.sortKey ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              t(headCell.title) || <div></div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );
}
