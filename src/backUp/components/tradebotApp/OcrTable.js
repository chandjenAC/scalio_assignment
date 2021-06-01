import React, { useEffect } from "react";
import Table from "../common/atoms/Table/Table";
import EditableLabelValue from "../common/molecules/EditableLabelValue";
import HighlightedLabelValue from "../common/molecules/HighlightedLabelValue";
import Loader from "../common/atoms/Loaders/Loader";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ocrTableRoot: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    minHeight: 32,
  },
}));

const OcrTable = (props) => {
  const {
    loading,
    highlightedColumns,
    highlightedLineItems,
    refLineItems,
    refColumns,
    editTableItems,
    scrollTableItems,
    setScrollTableItems,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    let tableItemsDiv = document.getElementById("tableItemsDiv");
    if (scrollTableItems) {
      tableItemsDiv.scrollTo(0, tableItemsDiv.scrollHeight);
      setScrollTableItems(false);
    }
  }, [scrollTableItems]);

  return (
    highlightedColumns && (
      <Box className={classes.ocrTableRoot} id="tableItemsDiv">
        {loading && (
          <div className={classes.centerDiv}>
            <Loader />
          </div>
        )}
        <Table width="auto">
          <thead>
            <tr>
              {highlightedColumns.map((th, index) => {
                return (
                  <th key={index}>
                    {editTableItems ? (
                      <EditableLabelValue
                        label={null}
                        values={th}
                        updateAttrIndices={[index]}
                        updateAttrRef={refColumns}
                        ocrTableCtxt={true}
                        isColumnHeading={true}
                      />
                    ) : (
                      <HighlightedLabelValue label={null} value={th} />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {highlightedLineItems.map((rowData, index) => {
              return (
                <tr key={index}>
                  {highlightedColumns.map((item, i) => {
                    let key =
                      typeof item === "object"
                        ? item.newvalue && item.newvalue !== ""
                          ? item.newvalue
                          : item.oldvalue
                        : item;
                    let disableEdit =
                      typeof item === "object" && item.newvalue === ""
                        ? true
                        : false;
                    return (
                      <td key={i} style={{ padding: "6px 6px 6px 0px" }}>
                        {editTableItems ? (
                          <EditableLabelValue
                            label={null}
                            values={rowData[key]}
                            updateAttrIndices={[index, key]}
                            updateAttrRef={refLineItems}
                            ocrTableCtxt={true}
                            disableEdit={disableEdit}
                          />
                        ) : (
                          <HighlightedLabelValue
                            label={null}
                            value={rowData[key]}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
    )
  );
};

export default OcrTable;

// <PositionAbsolute top="25px" right="20px">
// <FlexContainer>
//   <Button
//     background={editTableItems ? "#ff192c" : "#2574fb"}
//     onClick={() => {
//       setEditTableItems(!editTableItems);
//       setDeleteTableColumn(false);
//       setAddTableColumn(false);
//       setAddTableRow(false);
//       setDeleteTableRow(false);
//     }}
//   >
//     {editTableItems ? "Undo" : "Edit"}
//   </Button>
//   {editTableItems && (
//     <>
//       <OcrTableEditButtons
//         loading={loading}
//         goBack={goBack}
//         addTableColumn={addTableColumn}
//         setAddTableColumn={setAddTableColumn}
//         deleteTableColumn={deleteTableColumn}
//         setDeleteTableColumn={setDeleteTableColumn}
//         addColumnFn={addColumnFn}
//         deleteColumnFn={deleteColumnFn}
//         modifyColumn={modifyColumn}
//         handleChangeColumnDetails={handleChangeColumnDetails}
//         addTableRow={addTableRow}
//         setAddTableRow={setAddTableRow}
//         deleteTableRow={deleteTableRow}
//         setDeleteTableRow={setDeleteTableRow}
//         addRowFn={addRowFn}
//         deleteRowFn={deleteRowFn}
//         modifyRow={modifyRow}
//         handleChangeRowDetails={handleChangeRowDetails}
//       />
//       <Button
//         disabled={loading}
//         background="#18cc0e"
//         onClick={() =>
//           onSubmitOcrTableItems(refColumns, refLineItems)
//         }
//       >
//         Update Table
//       </Button>
//     </>
//   )}
// </FlexContainer>
// </PositionAbsolute>
