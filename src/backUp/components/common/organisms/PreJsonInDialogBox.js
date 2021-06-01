import React from "react";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import ScrollableDialogBox from "../molecules/DialogBox/ScrollableDialogBox";
import resource from "../../../resources/common.json";
import isEmpty from "lodash/isEmpty";

const PreJsonInDialogBox = (props) => {
  const { json, title, errorText, setViewContext } = props;

  const handleClose = (e) => {
    e.stopPropagation();
    setViewContext(false);
  };

  const dialogActions = [
    { text: getResourceValueByKey(resource, "OK", "Ok"), handler: handleClose },
  ];

  let newJson = json || {};

  // try {
  //   newJson = JSON.stringify(JSON.parse(newJson), null, 2);
  // } catch (error) {
  // }

  return (
    <>
      <ScrollableDialogBox
        open={true}
        handleClose={handleClose}
        title={title}
        dialogActions={dialogActions}
      >
        {!isEmpty(newJson) ? (
          <pre>{JSON.stringify(newJson, null, 2)}</pre>
        ) : (
          errorText
        )}
      </ScrollableDialogBox>
    </>
  );
};

export default PreJsonInDialogBox;
