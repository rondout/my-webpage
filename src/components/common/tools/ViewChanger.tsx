import { Button, ButtonGroup, Tooltip, alpha, styled, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import Iconfont from "./Iconfont";

const StyledBtn = styled(Button)(({ theme }) => {
  return {
    height: 36,
    borderColor: theme.palette.action.disabled,
    "&:hover": {
      borderColor: theme.palette.action.disabled,
    },
    "&.checked": {
      backgroundColor: alpha(theme.palette.primary.main, 0.32),
    },
    "&.checked:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.32),
    },
  };
});

export enum ViewMode {
  LIST,
  CARD,
}

interface ViewChangeItem<T> {
  icon: string;
  value: T;
  label: string;
}

interface ViewChangerProps<T> {
  mode: T;
  items: ViewChangeItem<T>[];
  onChange(mode: T): void;
  sx?: SxProps;
}

export const defaultViewChangerItems: ViewChangeItem<ViewMode>[] = [
  { icon: "ic_viewmodule", value: ViewMode.CARD, label: "common.cardView" },
  { icon: "ic_viewheadline", value: ViewMode.LIST, label: "common.listView" },
];

export default function ViewChanger<T = ViewMode>(props: ViewChangerProps<T>) {
  const { mode, onChange, items = [], sx = {} } = props;
  const { t } = useTranslation();

  const changeView = (viewMode: T) => {
    if (viewMode !== mode) {
      onChange(viewMode);
    }
  };

  return (
    <ButtonGroup sx={{ mr: 2, ...sx }}>
      {items.map((item) => (
        <Tooltip key={item.label} title={t(item.label)}>
          <StyledBtn size="small" onClick={() => changeView(item.value)} className={mode === item.value ? "checked" : ""} sx={{ px: 1 }}>
            <Iconfont color="rgba(0, 0, 0, 0.54)" mr={0} icon={item.icon}></Iconfont>
          </StyledBtn>
        </Tooltip>
      ))}
      {/* <Tooltip title={t("common.listView")}>
        <StyledBtn size="small" onClick={() => changeView(ViewMode.LIST)} className={mode === ViewMode.LIST ? "checked" : ""} sx={{ px: 1 }}>
          <Iconfont color="rgba(0, 0, 0, 0.54)" mr={0} icon="ic_viewheadline"></Iconfont>
        </StyledBtn>
      </Tooltip> */}
    </ButtonGroup>
  );
}
