import { t } from "i18next";
import { OperationMenu } from "../../../models/base.model";
import MatDropdown, { MatDropdownProps } from "../material/MatDropdown";
import TextButton from "../material/TextButton";
// import { CommonSort } from "./CommonContentHeader";
import Iconfont from "./Iconfont";

enum CommonSort {
  BY_TITLE = "name",
  BY_CREATED_TIME = "createdTime",
}

interface StatusFilterProps<T> extends MatDropdownProps<T> {
  title?: string;
  icon?: string;
}

export const defaultSortMenus: OperationMenu<CommonSort>[] = [
  new OperationMenu(CommonSort.BY_TITLE, "regTemp.sortBy.name"),
  new OperationMenu(CommonSort.BY_CREATED_TIME, "regTemp.sortBy.createdTime"),
];

export default function StatusFilter<T>(props: StatusFilterProps<T>) {
  const { icon = "ic_sequence", sx = {} } = props;
  return (
    <MatDropdown<T>
      sx={{ pl: 0, ...sx }}
      selected={props.selected}
      dividerKeys={props.dividerKeys}
      menus={props.menus}
      onMenuClick={props.onMenuClick}
      trigger={
        <TextButton sx={{ color: (theme) => theme.palette.action.active, height: 36 }}>
          <Iconfont fontSize={20} mr={1.3} icon={icon}></Iconfont>
          {t(props.title)}
        </TextButton>
      }
    ></MatDropdown>
  );
}
