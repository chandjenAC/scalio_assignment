import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import OcrKeyList from "./OcrKeyList";
import OcrTable from "./OcrTable";
import { Grid, Button, RootRef } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import EditIcon from "@material-ui/icons/EditOutlined";
import UndoIcon from "@material-ui/icons/Undo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  detailsBox: {
    maxHeight: 630,
    width: "100%",
    overflow: "scroll",
  },
  appBar: {
    position: "relative",
    width: "100%",
  },
  tabsRoot: {
    minHeight: 32,
  },
  tabRoot: {
    padding: 0,
    minHeight: 32,
  },
  button: {
    minWidth: 32,
    paddingBottom: "4px",
  },
  icon: {
    fontSize: "15px",
    margin: "6px 0px 0px 6px",
  },
  keyListEditContainer: {
    width: "fit-content",
    position: "absolute",
    bottom: 0,
    right: 8,
  },
}));

export default function OcrTabPanel(props) {
  const classes = useStyles();
  const [scrollKeyList, setScrollKeyList] = useState(false);
  const scrollingDivRef = React.useRef();
  const {
    resource,
    selectedOcrTab,
    setSelectedOcrTab,
    containsKeyList,
    highlightedKeyList,
    refOcrKeyList,
    editKeyList,
    setEditKeyList,
    addOCRkeyList,
    loading,
    onSubmitOcrKeyList,
    containsTableItems,
    refLineItems,
    refColumns,
    highlightedColumns,
    highlightedLineItems,
    editTableItems,
    scrollTableItems,
    setScrollTableItems,
    setEditTableItems,
    addTableColumn,
    setAddTableColumn,
    deleteTableColumn,
    setDeleteTableColumn,
    addColumnFn,
    deleteColumnFn,
    modifyColumn,
    handleChangeColumnDetails,
    addTableRow,
    setAddTableRow,
    deleteTableRow,
    addRowFn,
    deleteRowFn,
    modifyRow,
    handleChangeRowDetails,
    onSubmitOcrTableItems,
    setDeleteTableRow,
    goBack,
  } = props;

  useEffect(() => {
    if (scrollKeyList) {
      let height = scrollingDivRef.current.scrollHeight;
      scrollingDivRef.current.scrollTo(0, height);
      setScrollKeyList(false);
    }
  }, [scrollKeyList]);

  const handleChange = (event, newValue) => {
    setSelectedOcrTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    const classes = useStyles();

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className={classes.appBar}
        {...other}
      >
        {value === index && (
          <RootRef rootRef={scrollingDivRef}>
            <Box p={1} className={classes.detailsBox} id="scrollingDiv">
              {children}
            </Box>
          </RootRef>
        )}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Tabs
          classes={{ root: classes.tabsRoot }}
          value={selectedOcrTab}
          indicatorColor="primary"
          onChange={handleChange}
        >
          <Tab
            classes={{ root: classes.tabRoot }}
            label={
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  {getResourceValueByKey(resource, "KEY_LIST", "Key List")}
                </Grid>
                <Grid item>
                  {editKeyList ? (
                    <UndoIcon
                      className={classes.icon}
                      onClick={() => setEditKeyList(false)}
                    />
                  ) : (
                    <EditIcon
                      className={classes.icon}
                      onClick={() => setEditKeyList(true)}
                    />
                  )}
                </Grid>
              </Grid>
            }
            {...a11yProps(0)}
          />
          <Tab
            classes={{ root: classes.tabRoot }}
            label={
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  {getResourceValueByKey(
                    resource,
                    "TABLE_ITEMS",
                    "Table Items"
                  )}
                </Grid>
                <Grid item>
                  {editTableItems ? (
                    <UndoIcon
                      className={classes.icon}
                      onClick={() => setEditTableItems(false)}
                    />
                  ) : (
                    <EditIcon
                      className={classes.icon}
                      onClick={() => setEditTableItems(true)}
                    />
                  )}
                </Grid>
              </Grid>
            }
            {...a11yProps(1)}
          />
        </Tabs>
        {editKeyList && (
          <Grid
            container
            alignitems="center"
            className={classes.keyListEditContainer}
          >
            <Grid item>
              <Button
                color="primary"
                className={classes.button}
                onClick={() => {
                  addOCRkeyList();
                  setScrollKeyList(true);
                }}
              >
                {getResourceValueByKey(
                  resource,
                  "ADD_ATTRIBUTE",
                  "Add Attribute"
                )}
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                className={classes.button}
                disabled={loading}
                onClick={() => onSubmitOcrKeyList(refOcrKeyList)}
              >
                {getResourceValueByKey(
                  resource,
                  "UPDATE_KEYLIST",
                  "Update Keylist"
                )}
              </Button>
            </Grid>
          </Grid>
        )}
      </AppBar>

      <TabPanel value={selectedOcrTab} index={0}>
        <OcrKeyList
          resource={resource}
          containsKeyList={containsKeyList}
          highlightedKeyList={highlightedKeyList}
          refOcrKeyList={refOcrKeyList}
          editKeyList={editKeyList}
        />
      </TabPanel>

      <TabPanel value={selectedOcrTab} index={1}>
        <OcrTable
          // tableItems={tableItems}
          // refOcrTableItems={refOcrTableItems}
          resource={resource}
          containsTableItems={containsTableItems}
          refLineItems={refLineItems}
          refColumns={refColumns}
          highlightedColumns={highlightedColumns}
          highlightedLineItems={highlightedLineItems}
          editTableItems={editTableItems}
          scrollTableItems={scrollTableItems}
          setScrollTableItems={setScrollTableItems}
          setEditTableItems={setEditTableItems}
          addTableColumn={addTableColumn}
          setAddTableColumn={setAddTableColumn}
          deleteTableColumn={deleteTableColumn}
          setDeleteTableColumn={setDeleteTableColumn}
          addColumnFn={addColumnFn}
          deleteColumnFn={deleteColumnFn}
          modifyColumn={modifyColumn}
          handleChangeColumnDetails={handleChangeColumnDetails}
          addTableRow={addTableRow}
          setAddTableRow={setAddTableRow}
          deleteTableRow={deleteTableRow}
          setDeleteTableRow={setDeleteTableRow}
          addRowFn={addRowFn}
          deleteRowFn={deleteRowFn}
          modifyRow={modifyRow}
          handleChangeRowDetails={handleChangeRowDetails}
          loading={loading}
          onSubmitOcrTableItems={onSubmitOcrTableItems}
          goBack={goBack}
        />
      </TabPanel>
    </div>
  );
}
