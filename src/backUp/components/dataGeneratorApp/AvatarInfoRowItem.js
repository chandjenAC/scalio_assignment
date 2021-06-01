import React from "react";
import { Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { makeStyles, TextField } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import TableRow from "../common/molecules/TableRow";
import AutoCompleteSelect from "../common/molecules/AutoCompleteSelect";
import currencyOptions from "../../meta/currencies.json";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import AddUsers from "./AddUsers";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  accountInfo: { position: "relative" },
  formControlRoot: { margin: 0 },
  textField: { margin: 0, width: "100%" },
  buttonText: { fontWeight: 400 },
}));

const AvatarInfoRowItem = (props) => {
  const {
    resource,
    index,
    avatar,
    subTypeOptions,
    countryCodeOptions,
    industryTypeOptions,
    timeZoneOptions,
    handleSelectRow,
    handleChangeAvatarInfo,
    handleChangeAddressInfo,
    viewAddUsersDialogBox,
    handleViewAddUsersDialog,
    handleCloseAddUsersDialogBox,
    viewAddUsersDialogActions,
    handleChangeAddUser,
    addMoreUsers,
    checkValidUsers,
    deleteUserByIndex,
    emailIdError,
    handleCloseEmailErrorDialogBox,
    emailErrorDialogActions,
  } = props;

  const classes = useStyles();

  const getEditField = ({ label, onChange, key, userIndex }) => (
    <TextField
      label={getResourceValueByKey(resource, label.key, label.defaultText)}
      placeholder={getResourceValueByKey(
        resource,
        label.key,
        label.defaultText
      )}
      className={classes.textField}
      onChange={(e) => onChange(e, index, key, userIndex)}
    />
  );

  const getSelectEditField = ({ label, options, onChange, key }) => (
    <AutoCompleteSelect
      options={options}
      onChange={(e) => onChange(e, index, key, true)}
      label={getResourceValueByKey(resource, label.key, label.defaultText)}
      placeholder={getResourceValueByKey(
        resource,
        label.key,
        label.defaultText
      )}
    />
  );

  const getColumn1 = () => (
    <Grid
      container
      alignItems="center"
      justify={"flex-start"}
      className={classes.accountInfo}
    >
      <Grid item sm={2} md={2} lg={2}>
        <FormControlLabel
          classes={{ root: classes.formControlRoot }}
          control={
            <Checkbox
              checked={Boolean(avatar.isRowSelected)}
              onChange={(e) => handleSelectRow(e, index)}
              color="primary"
            />
          }
        />
      </Grid>
      <Grid item sm={10} md={10} lg={10}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                {getEditField({
                  label: { key: "NAME", defaultText: "Name" },
                  onChange: handleChangeAvatarInfo,
                  key: "name",
                })}
              </Grid>
              <Grid item>
                {getEditField({
                  label: { key: "EMAIL", defaultText: "Email" },
                  onChange: handleChangeAvatarInfo,
                  key: "email",
                })}
              </Grid>
              <Grid item>
                {getEditField({
                  label: { key: "PHONE", defaultText: "Phone" },
                  onChange: handleChangeAvatarInfo,
                  key: "phoneNumber",
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                {getEditField({
                  label: { key: "STREET_NAME", defaultText: "Street Name" },
                  onChange: handleChangeAddressInfo,
                  key: "streetName",
                })}
              </Grid>
              <Grid item>
                {getEditField({
                  label: { key: "TOWN_NAME", defaultText: "Town Name" },
                  onChange: handleChangeAddressInfo,
                  key: "townName",
                })}
              </Grid>
              <Grid item>
                {getEditField({
                  label: { key: "STATE", defaultText: "State" },
                  onChange: handleChangeAddressInfo,
                  key: "state",
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                {getEditField({
                  label: { key: "POSTAL_CODE", defaultText: "Postal Code" },
                  onChange: handleChangeAddressInfo,
                  key: "postalCode",
                })}
              </Grid>
              <Grid item>
                {getSelectEditField({
                  label: { key: "COUNTRY", defaultText: "Country" },
                  options: countryCodeOptions,
                  onChange: handleChangeAddressInfo,
                  key: "countryCode",
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const getColumn2 = () => (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item>
        {getEditField({
          label: {
            key: "REGISTRATION_NUMBER",
            defaultText: "Registration Number",
          },
          onChange: handleChangeAvatarInfo,
          key: "registrationNumber",
        })}
      </Grid>
      <Grid item>
        {getSelectEditField({
          options: industryTypeOptions,
          label: {
            key: "INDUSTRY_TYPE",
            defaultText: "Industry Type",
          },
          onChange: handleChangeAvatarInfo,
          key: "industryType",
        })}
      </Grid>
      <Grid item>
        {getSelectEditField({
          options: subTypeOptions,
          label: {
            key: "SUB_TYPE",
            defaultText: "Sub Type",
          },
          onChange: handleChangeAvatarInfo,
          key: "subType",
        })}
      </Grid>
    </Grid>
  );

  const getColumn3 = () => {
    const userValidity = checkValidUsers(avatar.users);
    return (
      <Grid container direction="column" alignItems="flex-start">
        <Grid item>
          {getSelectEditField({
            options: currencyOptions,
            label: {
              key: "BASE_CCY",
              defaultText: "Base CCY",
            },
            onChange: handleChangeAvatarInfo,
            key: "baseCcy",
          })}
        </Grid>
        <Grid item>
          {getSelectEditField({
            options: timeZoneOptions,
            label: {
              key: "TIME_ZONE",
              defaultText: "Time Zone",
            },
            onChange: handleChangeAvatarInfo,
            key: "timezone",
          })}
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 8 }}
            classes={{ label: classes.buttonText }}
            onClick={handleViewAddUsersDialog}
          >
            {userValidity.noOfValidUsers > 0
              ? `${getResourceValueByKey(resource, "USERS", "Users")} [${
                  checkValidUsers(avatar.users).noOfValidUsers
                }]`
              : getResourceValueByKey(resource, "ADD_USERS", "Add Users")}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <TableRow
        column1={getColumn1()}
        column2={getColumn2()}
        column3={getColumn3()}
      />
      <DialogBox
        open={viewAddUsersDialogBox}
        handleClose={handleCloseAddUsersDialogBox}
        dialogActions={viewAddUsersDialogActions}
        title={getResourceValueByKey(resource, "ADD_USERS", "Add Users")}
      >
        <AddUsers
          resource={resource}
          index={index}
          avatar={avatar}
          handleChangeAddUser={handleChangeAddUser}
          addMoreUsers={addMoreUsers}
          deleteUserByIndex={deleteUserByIndex}
        />
      </DialogBox>
      <DialogBox
        open={emailIdError}
        handleClose={handleCloseEmailErrorDialogBox}
        dialogActions={emailErrorDialogActions}
        title={getResourceValueByKey(
          resource,
          "INVALID_EMAIL",
          "Invalid Email"
        )}
      >
        {getResourceValueByKey(
          resource,
          "INVALID_EMAIL_ID_ENTERED_FOR_ONE_OF_THE_USER.",
          "Invalid email id entered for one of the User."
        )}
      </DialogBox>
    </>
  );
};

export default AvatarInfoRowItem;
