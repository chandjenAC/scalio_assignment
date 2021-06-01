import React, { useState } from "react";
import { TextField, ListItem, Grid } from "@material-ui/core";

const EditableListItem = (props) => {
  const { item, index, onChangePrimary, onChangeSecondary } = props;
  const [primaryText, setPrimaryText] = useState(item.stepName);
  const [secondaryText, setSecondaryText] = useState(item.fnhandler);

  const handlePrimaryChange = (e) => {
    setPrimaryText(e.target.value);
    onChangePrimary(e.target.value, index);
  };

  const handleSecondaryChange = (e) => {
    setSecondaryText(e.target.value);
    onChangeSecondary(e.target.value, index);
  };

  return (
    <ListItem key={index}>
      <Grid container>
        <Grid item style={{ padding: "6px 6px 6px 0px" }}>
          <TextField
            variant="standard"
            label="Step name"
            value={primaryText}
            onChange={handlePrimaryChange}
          />
        </Grid>
        <Grid item style={{ padding: "6px" }}>
          <TextField
            variant="standard"
            label="Fn. handler"
            value={secondaryText}
            onChange={handleSecondaryChange}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default EditableListItem;
