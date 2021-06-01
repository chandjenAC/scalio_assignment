import React, { createRef, useEffect } from "react";
import MTableCell from "../../../utils/materialTable/MTableCell";
import MTableFilterRow from "../../../utils/materialTable/MTableFilterRow";
import MTableEditField from "../../../utils/materialTable/MTableEditField";
import MTableEditRow from "../../../utils/materialTable/MTableEditRow";
import MTableBodyRow from "../../../utils/materialTable/MTableBodyRow";
import MaterialTable, { MTableToolbar } from "material-table";
import resource from "../../../resources/common.json";
import { Grid, Typography } from "@material-ui/core";
import { tableIcons } from "../../../utils/materialTable/materialTableIcons";
import Loader from "../atoms/Loaders/Loader";
import { getResourceValueByKey } from "../../../utils/resourceHelper";

const Mtable = (props) => {
  const {
    title,
    data,
    columns,
    editable,
    detailPanel,
    actions,
    options,
    style,
    reload,
    components,
    hideRefreshIcon,
    ...rest
  } = props;

  useEffect(() => {
    if (reload !== undefined && reload !== null) {
      tableRef.current && tableRef.current.onQueryChange();
    }
  }, [reload]);

  const tableRef = createRef();

  let defaultOptions = {
    detailPanelColumnAlignment: "left",
    actionsColumnIndex: -1,
    padding: "dense",
    rowStyle: { padding: "0px" },
    headerStyle: {
      padding: "3px 5px",
      fontWeight: "500",
      color: "#9ba2b3",
      background: "#fafbfc",
    },
    debounceInterval: 1000,
    filterCellStyle: {
      height: 30,
      padding: "0px 5px",
    },
    cellStyle: { height: 30, padding: "3px 5px" },
    maxBodyHeight: 685,
  };

  let defaultComponents = {
    Row: (props) => <MTableBodyRow {...props} />,
    FilterRow: (props) => <MTableFilterRow {...props} />,
    Cell: (props) => <MTableCell {...props} />,
    OverlayLoading: () => <Loader />,
    Toolbar: (props) => {
      const propsCopy = { ...props };
      propsCopy.showTitle = false;
      return (
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              style={{ paddingLeft: 6 }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <MTableToolbar {...propsCopy} />
          </Grid>
        </Grid>
      );
    },
  };

  let componentsForEditing = {
    EditField: (props) => <MTableEditField {...props} />,
    EditRow: (props) => <MTableEditRow {...props} />,
  };

  let defaultActions = hideRefreshIcon
    ? []
    : [
        {
          icon: tableIcons.Refresh,
          tooltip: getResourceValueByKey(
            resource,
            "REFRESH_DATA",
            "Refresh data"
          ),
          isFreeAction: true,
          onClick: () => tableRef.current && tableRef.current.onQueryChange(),
        },
      ];

  if (options) {
    defaultOptions = { ...defaultOptions, ...options };
  }

  if (editable) {
    defaultComponents = { ...defaultComponents, ...componentsForEditing };
  }

  if (actions) {
    defaultActions = [...defaultActions, ...actions];
  }

  if (components) {
    defaultComponents = { ...defaultComponents, ...components };
  }

  return (
    <MaterialTable
      {...rest}
      tableRef={tableRef}
      style={style}
      icons={tableIcons}
      columns={columns}
      data={data}
      components={defaultComponents}
      editable={editable}
      detailPanel={detailPanel}
      actions={defaultActions}
      options={defaultOptions}
    />
  );
};

export default Mtable;
