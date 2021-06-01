import React from "react";
import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DeleteIcon from "@material-ui/icons/Delete";

const AddUsers = (props) => {
  const {
    resource,
    index,
    avatar,
    handleChangeAddUser,
    addMoreUsers,
    deleteUserByIndex,
  } = props;
  return (
    <>
      {avatar.users.map((user, userIndex) => {
        return (
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label={getResourceValueByKey(
                  resource,
                  "FULL_NAME",
                  "Full Name"
                )}
                value={user.fullName}
                placeholder={getResourceValueByKey(
                  resource,
                  "FULL_NAME",
                  "Full Name"
                )}
                onChange={(e) =>
                  handleChangeAddUser(e, index, "fullName", userIndex)
                }
              />
            </Grid>
            <Grid item>
              <TextField
                label={getResourceValueByKey(resource, "EMAIL_ID", "Email ID")}
                value={user.emailId}
                placeholder={getResourceValueByKey(
                  resource,
                  "EMAIL_ID",
                  "Email ID"
                )}
                error={user.emailErrorText}
                helperText={user.emailErrorText}
                onChange={(e) =>
                  handleChangeAddUser(e, index, "emailId", userIndex)
                }
              />
            </Grid>
            <Grid item>
              <IconButton onClick={() => deleteUserByIndex(index, userIndex)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <Button
        onClick={() => addMoreUsers(index)}
        variant="outlined"
        style={{ marginTop: 8 }}
      >
        {getResourceValueByKey(resource, "ADD_MORE", "Add More")}
      </Button>
    </>
  );
};

export default AddUsers;
