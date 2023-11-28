import { Box, Button, ButtonGroup, Typography, Grid, IconButton } from "@mui/material";
import { t } from "i18next";
import { forwardRef, Fragment, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { deviceController } from "../../../controllers/device.controller";
import { BaseData, TreeData } from "../../../models/base.model";
import { DeviceGroupInfo, DeviceInfo } from "../../../models/device.model";
import { selectAllColors } from "../../../store/selectors";
import MatSearchInput from "../material/MatSearchInput";
import EmptyData from "../table/EmptyData";
import Iconfont from "../tools/Iconfont";
import MatChip from "../material/MatChip";
import { StyledTreeItem, StyledTreeView } from "../../regist-template/RegTempGroups";
import CommonTable, { TableColumns, TableOperationColumns } from "../table/CommonTable";
import { PageLink } from "../../../models/request.model";
import { CommonSort } from "../tools/CommonContentHeader";
import useDeviceList from "../../../hooks/useDeviceList";
import CommonLoading from "./CommonLoading";

export enum TargetType {
  DEVICE,
  GROUP,
}

export interface SelectedItems {
  id: string;
  name: string;
  type: TargetType;
}

const pageSize = 8;

export interface GroupAndDeviceSelectRef {
  getSelected(): SelectedItems[];
  getDevicesAndGroupIds(): { deviceIdList: string[]; deviceGroupIdList: string[] };
}

const GroupAndDeviceSelect = forwardRef((props: { selected?: SelectedItems[]; onChange?(): void }, ref: Ref<GroupAndDeviceSelectRef>) => {
  const colors = useSelector(selectAllColors);
  const [treeData, setTreeData] = useState<TreeData[]>([]);
  const [selected, setSelected] = useState<SelectedItems[]>(props.selected || []);
  // eslint-disable-next-line
  const [groupList, setGroupList] = useState<DeviceGroupInfo[]>([]);
  const [currentType, setCurrentType] = useState<TargetType>(TargetType.GROUP);
  const [textSearch, setTextSearch] = useState<string>("");
  const [fetchDevicePageLink, setDevicePageLink] = useState<PageLink>(new PageLink(0, pageSize, null, CommonSort.BY_CREATED_TIME));
  const { deviceData, fetchDeviceLoading } = useDeviceList(fetchDevicePageLink);
  const [defaultExpanded, setDefaultExpanded] = useState("");

  useEffect(() => {
    setSelected(props.selected || []);
  }, [props.selected]);

  const onSelectChange = useCallback(() => {
    Promise.resolve().then(() => {
      props.onChange && props.onChange();
    });
  }, [props]);

  const getAllGroups = useCallback(() => {
    deviceController.getAllGroupTree().then((res) => {
      if (res.success) {
        setTreeData(res.nodeList);
      }
      setDefaultExpanded(res.nodeList[0].id);
    });
  }, []);

  const onDevicePageChange = (page: number) => {
    setDevicePageLink({ ...fetchDevicePageLink, page });
  };

  const getAllGroupsAsList = useCallback(() => {
    deviceController.getAllGroups().then((res) => setGroupList(res));
  }, []);

  useEffect(() => {
    getAllGroupsAsList();
  }, [getAllGroupsAsList]);

  useImperativeHandle(ref, () => {
    return {
      getSelected() {
        return selected;
      },
      getDevicesAndGroupIds() {
        const deviceIdList = [];
        const deviceGroupIdList = [];
        selected?.forEach((item) => {
          if (item.type === TargetType.DEVICE) {
            deviceIdList.push(item.id);
          } else {
            deviceGroupIdList.push(item.id);
          }
        });
        return { deviceIdList, deviceGroupIdList };
      },
    };
  });

  // 搜索组
  useEffect(() => {
    if (textSearch) {
      deviceController.searchGroups({ textSearch }).then((res) => {
        setTreeData(res);
      });
    } else {
      getAllGroups();
    }
  }, [textSearch, getAllGroups]);
  // 搜索
  const onGroupSearchChange = (textSearch: string) => {
    setTextSearch(textSearch);
  };
  // 设备搜索
  const onDevieSearchChange = (textSearch: string) => {
    setDevicePageLink({ ...fetchDevicePageLink, textSearch, page: 0 });
  };
  // 当前是否是设备选择
  const isDeviceSelection = currentType === TargetType.DEVICE;

  const changeTargetType = (type: TargetType) => {
    setCurrentType(type);
  };

  const checkSelected: (id: string) => boolean = useCallback(
    (id: string) => {
      return selected.some((data) => data.id === id);
    },
    [selected]
  );

  const onOperationClick = useCallback(
    (data: BaseData) => {
      if (checkSelected(data.id)) {
        setSelected(selected.filter((item) => item.id !== data.id));
      } else {
        setSelected([...selected, { name: data.name || data.friendlyName, id: data.id, type: currentType }]);
      }
      onSelectChange();
    },
    [checkSelected, onSelectChange, selected, currentType]
  );

  const onRemoveGroup = (id: string) => {
    onSelectChange();
    setSelected(selected.filter((data) => data.id !== id));
  };

  const removeAll = () => {
    onSelectChange();
    setSelected([]);
  };

  const createOperationComponent = useCallback(
    (data: BaseData) => {
      let icon = "ic_add2";
      let color: string = null;
      let title = "common.add";

      if (checkSelected(data.id)) {
        icon = "ic_failed";
        color = "red";
        title = "common.remove";
      }
      return (
        <Box onClick={() => onOperationClick(data)} key={0} className="flex-start pointer" sx={{ flexWrap: "nowrap" }}>
          <Iconfont primary color={color} icon={icon}></Iconfont>
          <Typography sx={{ whiteSpace: "nowrap" }}>{t(title)}</Typography>
        </Box>
      );
    },
    [checkSelected, onOperationClick]
  );

  const renderTrees = useCallback(
    (data: TreeData) => {
      const index = data.level % 6;
      const avatarColor = colors[index];

      return (
        <StyledTreeItem ContentProps={{ avatarColor, showAddButton: false, operationComponents: [createOperationComponent(data)] }} key={data.id} nodeId={data.id} label={data.name}>
          {data.child?.map((child) => renderTrees(child))}
        </StyledTreeItem>
      );
    },
    [colors, createOperationComponent]
  );

  const buildTreeItems = (groups: TreeData[]) => {
    return groups.map((group) => renderTrees(group));
  };

  const deviceColumns = useMemo(() => {
    return [
      new TableColumns("friendlyName", "file.deviceName"),
      new TableColumns("groupName", "file.linkedGroup"),
      new TableOperationColumns<DeviceInfo>("operation", null, "right", 130, (data) => createOperationComponent(data)),
    ];
  }, [createOperationComponent]);

  return (
    <Fragment>
      <Box sx={{ py: 1, pt: 3, alignItems: "flex-start", width: 1140 }} className="flex">
        <Box sx={{ width: 560 }}>
          <Box className="flex-between" sx={{ pl: 6 }}>
            <Box>
              <MatSearchInput
                fullWidth
                sx={{ display: isDeviceSelection ? "block" : "none" }}
                value={fetchDevicePageLink.textSearch}
                placeholder="device.searchDevice"
                onChange={onDevieSearchChange}
              ></MatSearchInput>
              <MatSearchInput fullWidth sx={{ display: !isDeviceSelection ? "block" : "none" }} value={textSearch} placeholder="device.searchGroup" onChange={onGroupSearchChange}></MatSearchInput>
            </Box>
            <ButtonGroup sx={{ ml: 2 }} variant="contained" aria-label="outlined primary button group">
              <Button variant={!isDeviceSelection ? "contained" : "text"} onClick={() => changeTargetType(TargetType.GROUP)}>
                {t("device.deviceGroup")}
              </Button>
              <Button variant={isDeviceSelection ? "contained" : "text"} onClick={() => changeTargetType(TargetType.DEVICE)}>
                {t("file.device")}
              </Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ px: 2, mt: 2, height: 480, overflow: "auto", borderRight: "1px solid #eee" }}>
            {defaultExpanded && (
              <StyledTreeView
                defaultExpanded={[defaultExpanded]}
                defaultCollapseIcon={<Iconfont icon="ic_arrow_down" />}
                defaultExpandIcon={<Iconfont icon="ic_arrow_right" />}
                sx={{ flexGrow: 1, overflowY: "auto", display: !isDeviceSelection ? "" : "none" }}
              >
                {treeData && buildTreeItems(treeData)}
                {!treeData.length && <EmptyData></EmptyData>}
              </StyledTreeView>
            )}
            {!defaultExpanded && <CommonLoading size="small" title={null} />}
            <Box sx={{ display: isDeviceSelection ? "" : "none", height: 1 / 1 }}>
              <CommonTable<DeviceInfo>
                hideBoxShadow
                loading={fetchDeviceLoading}
                rows={deviceData?.data}
                totalPages={deviceData?.totalPages}
                columns={deviceColumns}
                pageSize={pageSize}
                page={fetchDevicePageLink.page}
                pageChange={onDevicePageChange}
              ></CommonTable>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1, px: 6, width: 520 }}>
          <Box className="flex-between">
            <Typography>{t("file.selectedDevicesOrGroup")}</Typography>
            <Button onClick={removeAll} variant="text">
              {t("file.removeAll")}
            </Button>
          </Box>
          <Box sx={{ pt: 4, height: 460, overflowY: "auto" }}>
            <Grid rowSpacing={2} container>
              {selected.map((data) => (
                <Grid item key={data.id} xs={6}>
                  <MatChip
                    sx={{ mr: 2, maxWidth: 210 }}
                    deleteIcon={
                      <IconButton sx={{ ml: 1, mr: "0 !important" }}>
                        <Iconfont mr={0} pointer fontSize={12} icon="ic_dialog_close" />
                      </IconButton>
                    }
                    onDelete={() => onRemoveGroup(data.id)}
                    label={data.name}
                  ></MatChip>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
});
export default GroupAndDeviceSelect;
