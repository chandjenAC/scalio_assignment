import React from "react";
import Input from "../common/atoms/Input/Input";
import { Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const OcrTableEditButtons = (props) => {
  const {
    loading,
    goBack,
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
    setDeleteTableRow,
    addRowFn,
    deleteRowFn,
    modifyRow,
    handleChangeRowDetails,
  } = props;

  return (
    <>
      {!addTableColumn &&
        !deleteTableColumn &&
        !addTableRow &&
        !deleteTableRow && (
          <>
            <Button
              disabled={loading}
              background="#2574fb"
              onClick={() => {
                setAddTableColumn(true);
                setDeleteTableColumn(false);
                setAddTableRow(false);
                setDeleteTableRow(false);
              }}
            >
              <i
                style={{ marginRight: "4px", fontSize: "8px" }}
                className="fas fa-plus"
              ></i>
              Column
            </Button>
          </>
        )}
      {!addTableColumn &&
        !deleteTableColumn &&
        !addTableRow &&
        !deleteTableRow && (
          <>
            <Button
              disabled={loading}
              background="#2574fb"
              onClick={() => {
                setDeleteTableColumn(true);
                setAddTableColumn(false);
                setAddTableRow(false);
                setDeleteTableRow(false);
              }}
            >
              <i
                style={{ marginRight: "4px", fontSize: "8px" }}
                className="fas fa-minus"
              ></i>
              Column
            </Button>
          </>
        )}
      {!addTableColumn &&
        !deleteTableColumn &&
        !addTableRow &&
        !deleteTableRow && (
          <Button
            disabled={loading}
            background="#2574fb"
            onClick={() => {
              addRowFn();
              // setAddTableRow(true);
              // setDeleteTableColumn(false);
              // setAddTableColumn(false);
              // setDeleteTableRow(false);
            }}
          >
            <i
              style={{ marginRight: "4px", fontSize: "8px" }}
              className="fas fa-plus"
            ></i>
            Row
          </Button>
        )}
      {!addTableColumn &&
        !deleteTableColumn &&
        !addTableRow &&
        !deleteTableRow && (
          <Button
            disabled={loading}
            background="#2574fb"
            onClick={() => {
              setDeleteTableRow(true);
              setAddTableRow(false);
              setDeleteTableColumn(false);
              setAddTableColumn(false);
            }}
          >
            <i
              style={{ marginRight: "4px", fontSize: "8px" }}
              className="fas fa-minus"
            ></i>
            Row
          </Button>
        )}
      {addTableColumn && (
        <>
          <IconButton
            disabled={loading}
            background="#2574fb"
            onClick={() => goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Input
            margin="2px 0px 2px 4px"
            padding="2px 0px"
            border="1px solid #d0e1ff"
            fontFamily="LatoRegular"
            fontSize="13px"
            borderRadius="3px"
            width="auto"
            placeholder="Enter Column No."
            value={modifyColumn.index}
            onChange={(e) => handleChangeColumnDetails(e, "index")}
          />
          <Input
            margin="2px 0px 2px 4px"
            padding="2px 0px"
            border="1px solid #d0e1ff"
            fontFamily="LatoRegular"
            fontSize="13px"
            borderRadius="3px"
            width="auto"
            placeholder="Enter Column Name"
            value={modifyColumn.columnName}
            onChange={(e) => handleChangeColumnDetails(e, "columnName")}
          />
          <Button
            disabled={loading}
            background="#2574fb"
            onClick={() => addColumnFn()}
          >
            Add
          </Button>
        </>
      )}
      {/* {addTableRow && (
        <>
          <IconButton
            disabled={loading}
            background="#2574fb"
            onClick={() => goBack()}
          >
           <ArrowBackIcon />
          </IconButton>
          <Input
            margin="2px 0px 2px 4px"
            padding="2px 0px"
            border="1px solid #d0e1ff"
            fontFamily="LatoRegular"
            fontSize="13px"
            borderRadius="3px"
            width="auto"
            placeholder="No of Rows"
            value={modifyRow.addRows}
            onChange={(e) => handleChangeRowDetails(e, "addRows")}
          />
          <Button
            disabled={loading}
            background="#2574fb"
            onClick={() => addRowFn()}
          >
            Add
          </Button>
        </>
      )} */}
      {deleteTableColumn && (
        <>
          <IconButton
            disabled={loading}
            background="#2574fb"
            onClick={() => goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Input
            margin="2px 0px 2px 4px"
            padding="2px 0px"
            border="1px solid #d0e1ff"
            fontFamily="LatoRegular"
            fontSize="13px"
            borderRadius="3px"
            width="auto"
            placeholder="Enter Column No."
            value={modifyColumn.index}
            onChange={(e) => handleChangeColumnDetails(e, "index")}
          />
          <Button
            disabled={loading}
            background="#2574fb"
            onClick={() => deleteColumnFn()}
          >
            Delete
          </Button>
        </>
      )}
      {deleteTableRow && (
        <>
          <IconButton
            disabled={loading}
            background="#2574fb"
            onClick={() => goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Input
            margin="2px 0px 2px 4px"
            padding="2px 0px"
            border="1px solid #d0e1ff"
            fontFamily="LatoRegular"
            fontSize="13px"
            borderRadius="3px"
            width="auto"
            placeholder="Enter Row No."
            value={modifyRow.deleteIndex}
            onChange={(e) => handleChangeRowDetails(e, "deleteIndex")}
          />
          <Button
            disabled={loading}
            background="#2574fb"
            onClick={() => deleteRowFn()}
          >
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default OcrTableEditButtons;
