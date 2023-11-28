import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { isMobile } from "../../../store/selectors";
import MatSearchInput from "../material/MatSearchInput";
import StatusFilter, { defaultSortMenus } from "./StatusFilter";
import { t } from "i18next";
import ViewChanger, { ViewMode, defaultViewChangerItems } from "./ViewChanger";
import TextButton from "../material/TextButton";
import { selectPrimaryColor } from "../../../utils/selectors";
import { useGeneralSelector, useObSelector } from "../../../hooks/useAuth";
import { Fragment } from "react";

export enum CommonSort {
  BY_TITLE = "name",
  BY_CREATED_TIME = "createdTime",
}

interface CommonContentHeaderProps<T> {
  // 排序字段
  sortProp: T;
  // 排序字段变化调用
  onSortChange: (sort: T) => void;
  // 搜索值
  textSearch: string;
  // 搜索变化调用
  onSearchChange: (e: string) => void;
  // 添加按钮标题
  addTitle: string;
  // 点击新增触发
  onAdd(): void;
  // 表格或者卡片查看模式
  viewMode?: ViewMode;
  // 删除按钮标题
  deleteTitle?: string;
  // 点击删除触发
  // 删除按钮禁用
  deleteDisabled?: boolean;
  onDelete?(): void;
  //
  selectedCount?: number;
  // selectMode
  selectMode?: boolean;
  // 选择按钮的title
  selectTitle?: string;
  // 当查看模式变化时调用
  // setSelectMode
  setSelectMode?(mode: boolean): void;
  selectAll?(isSelect: boolean): void;
  onViewModeChange?(mode: ViewMode): void;
  authControl?: "GENERAL" | "OBSERVE";
  // 是否展示选择按钮
  showSelectBtn?: boolean;
  [propName: string]: any;
}

export default function CommonContentHeader<F = CommonSort>(props: CommonContentHeaderProps<F>) {
  const { sortProp, onSortChange, textSearch, onSearchChange, deleteDisabled, deleteTitle, addTitle, selectTitle, showSelectBtn = false, selectMode = false, authControl = "GENERAL" } = props;

  const menus = props.menus || defaultSortMenus;
  const isOb = useObSelector();
  const isGeneral = useGeneralSelector();

  const actionAble = authControl === "GENERAL" ? isGeneral : !isOb;

  const isMobilePage = useSelector(isMobile);

  const toggleSelectedMode = (mode?: boolean) => {
    if (mode !== undefined) {
      props.setSelectMode(mode);
    } else {
      props.setSelectMode(!selectMode);
    }
  };

  const selectAll = () => {
    if (props.selectAll) {
      props.selectAll(true);
    }
  };

  const exitSelectMode = () => {
    props.selectAll(false);
    props.setSelectMode(false);
  };

  const btnShowingControl = {
    add: !showSelectBtn || !selectMode,
    delete: (!showSelectBtn || selectMode) && props.onDelete,
    select: showSelectBtn && !selectMode,
    selectAll: showSelectBtn && selectMode && props.viewMode === ViewMode.CARD,
    cancel: showSelectBtn && selectMode,
  };

  return (
    <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", height: 36 }}>
      {selectMode && (
        <Box className="flex-start">
          <Typography fontSize={16} color={selectPrimaryColor}>
            {props.selectedCount}
          </Typography>
          <Typography sx={{ ml: 1 }}>{t("common.selected")}</Typography>
        </Box>
      )}
      {!selectMode && (
        <Box className="flex-start">
          {props.viewMode !== undefined && <ViewChanger items={defaultViewChangerItems} mode={props.viewMode} onChange={props.onViewModeChange}></ViewChanger>}
          {isMobilePage ? null : <StatusFilter<F> title={"regTemp.sortBy." + sortProp} selected={sortProp} menus={menus} onMenuClick={onSortChange}></StatusFilter>}
          <MatSearchInput sx={{ ml: isMobilePage ? 0 : 2, bgcolor: "#fff" }} value={textSearch} onChange={onSearchChange}></MatSearchInput>
        </Box>
      )}
      {actionAble && (
        <Fragment>
          {!isMobilePage ? (
            <Box>
              {/* 添加按钮 */}
              {btnShowingControl.add && (
                <Button onClick={props.onAdd} variant="contained">
                  {t(addTitle)}
                </Button>
              )}
              {/* 取消按钮 */}
              {btnShowingControl.cancel && (
                <Button onClick={exitSelectMode} variant="outlined">
                  {t("common.cancel")}
                </Button>
              )}
              {/* 全选按钮 */}
              {btnShowingControl.selectAll && (
                <TextButton sx={{ ml: 2 }} onClick={selectAll}>
                  {t("common.selectAll")}
                </TextButton>
              )}
              {/* 选择按钮 */}
              {btnShowingControl.select && (
                <TextButton sx={{ ml: 2 }} onClick={() => toggleSelectedMode()}>
                  {t(selectTitle)}
                </TextButton>
              )}
              {/* 没有选择模式或者当前selectedMode为true才展示 */}
              {btnShowingControl.delete && (
                <Button onClick={props.onDelete} disabled={deleteDisabled} sx={{ ml: 2 }} variant={props.viewMode !== undefined ? "contained" : "outlined"}>
                  {t(deleteTitle)}
                </Button>
              )}
            </Box>
          ) : (
            <Box>
              <IconButton onClick={props.onAdd} size="medium" edge="start" color="primary" aria-label="open drawer" sx={{ mr: 1 }}>
                <AddCircleIcon />
              </IconButton>
              <IconButton
                onClick={props.onDelete}
                disabled={deleteDisabled}
                size="medium"
                edge="start"
                color="error"
                aria-label="open drawer"
                // sx={{ mr: 2 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Fragment>
      )}
    </Box>
  );
}
