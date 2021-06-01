import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import AvatarInfoRowItem from "../../components/dataGeneratorApp/AvatarInfoRowItem";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import { renderSnackbar } from "../../utils";
import { getCountryCodes, onboardAvatar } from "../../utils/getData";
import { getIndustryTypes, getTimeZones } from "../../utils/getData";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import cloneDeep from "lodash/cloneDeep";
import TitleWithEditActions from "../../components/common/molecules/TitleWithEditActions";
import Loader from "../../components/common/atoms/Loaders/Loader";
import TableTitle from "../../components/common/molecules/TableTitle";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";

const useStyles = makeStyles((theme) => ({
  title: { width: "100%" },
  logsContainer: { padding: "16px 30px", position: "relative" },
  noWrap: { flexWrap: "noWrap" },
  tableItem: {
    display: "grid",
    placeItems: "center",
    border: "1px solid lightgrey",
    minHeight: 75,
    borderRadius: 5,
    margin: "8px 0px 4px 0px",
    padding: "8px 0px 10px 0px",
  },
}));

const OnboardAvatarContainer = (props) => {
  const { resource } = props;

  const subTypeOptions = [
    {
      label: getResourceValueByKey(resource, "ANCHOR", "Anchor"),
      value: "Anchor",
    },
    {
      label: getResourceValueByKey(resource, "CORPORATE", "Corporate"),
      value: "Corporate",
    },
    {
      label: getResourceValueByKey(resource, "FUNDER", "Funder"),
      value: "Funder",
    },
  ];

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const [avatars, setAvatars] = useState([]);
  const [countryCodeOptions, setCountryCodeOptions] = useState([]);
  const [industryTypeOptions, setIndustryTypeOptions] = useState([]);
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);

  const [viewAddUsersDialogBox, setViewAddUsersDialogBox] = useState(false);
  const [emailIdError, setEmailIdError] = useState(false);

  const [onboardAvatarMutation, mutationStatus] = useMutation(onboardAvatar, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      setAvatars([]);
    },
  });

  useQuery(
    [
      "dmsSearch_countryCodes",
      getFilterSortPaginate(
        [],
        [
          {
            fieldName: "country",
            sortOrder: "ASC",
          },
        ],
        {
          pageSize: 150,
          currentPage: 1,
        }
      ),
    ],
    getCountryCodes,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let options = data.data.map((item) => ({
          label: item.country,
          value: item.countryCode,
        }));
        setCountryCodeOptions(options);
      },
    }
  );

  useQuery(
    [
      "dmsSearch_industryTypes",
      getFilterSortPaginate([], [], {
        pageSize: 150,
        currentPage: 1,
      }),
    ],
    getIndustryTypes,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let options = data.data.map((item) => ({
          label: item.name,
          value: item.name,
        }));
        setIndustryTypeOptions(options);
      },
    }
  );

  useQuery(
    [
      "dmsSearch_timeZones",
      getFilterSortPaginate(
        [],
        [
          {
            fieldName: "timeZoneOffset",
            sortOrder: "ASC",
          },
        ],
        {
          pageSize: 750,
          currentPage: 1,
        }
      ),
    ],
    getTimeZones,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let options = data.data.map((item) => ({
          label: `${item.timeZone} ${item.timeZoneOffset}`,
          value: item.timeZone,
        }));
        setTimeZoneOptions(options);
      },
    }
  );

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(
          resource,
          "DATA_GENERATOR",
          "Data Generator"
        ),
        path: "/yogi-webb/dataGenerator",
      },
      {
        title: getResourceValueByKey(resource, "ONBOARD", "Onboard"),
        path: "",
      },
    ]);
  }, []);

  const onAddIconClick = () => {
    if (avatars.length === 0 || checkAvatarValuesValidity(avatars)) {
      let newRow = {
        name: "",
        postalAddress: {
          state: "",
          townName: "",
          streetName: "",
          postalCode: "",
          countryCode: "",
        },
        phoneNumber: "",
        email: "",
        registrationNumber: "",
        users: [
          {
            fullName: "",
            emailId: "",
            emailErrorText: "",
          },
        ],
        baseCcy: "",
        timezone: "",
        industryType: "",
        subType: "",
      };
      setAvatars((prevState) => [...prevState, newRow]);
    }
  };

  const handleSelectRow = (e, index) => {
    let avatarsClone = cloneDeep(avatars);
    avatarsClone[index].isRowSelected = e.target.checked;
    setAvatars(avatarsClone);
  };

  const handleDeleteRow = () => {
    let avatarsClone = cloneDeep(avatars);
    let newRows = avatarsClone.filter((x) => !x.isRowSelected);
    setAvatars(newRows);
  };

  const handleApply = () => {
    let avatarsClone = cloneDeep(avatars);
    let emailError = false;
    avatarsClone.forEach((avatar) => {
      // not required in payload.. used just for rendering in UI
      delete avatar.isRowSelected;
      avatar.users.forEach((user) => {
        if (user.emailErrorText) {
          setEmailIdError(true);
          emailError = true;
          return;
        }
        // not required in payload.. used just for rendering in UI
        delete user.emailErrorText;
      });
    });
    if (!emailError) {
      let payload = { avatars: avatarsClone };
      onboardAvatarMutation(payload);
    }
  };

  const handleChangeAvatarInfo = (e, index, key, selectField) => {
    let avatarsClone = cloneDeep(avatars);
    avatarsClone[index][key] = selectField ? e?.value : e.target.value;
    setAvatars(avatarsClone);
  };

  const handleChangeAddressInfo = (e, index, key, selectField) => {
    let avatarsClone = cloneDeep(avatars);
    avatarsClone[index]["postalAddress"][key] = selectField
      ? e?.value
      : e.target.value;
    setAvatars(avatarsClone);
  };

  const checkValidUsers = (users) => {
    let valid = true;
    let noOfValidUsers = 0;
    users.forEach((user) => {
      if (
        !user.fullName ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.emailId)
      ) {
        valid = false;
      } else {
        noOfValidUsers++;
      }
    });
    return { valid: valid, noOfValidUsers: noOfValidUsers };
  };

  const handleChangeAddUser = (e, index, key, userIndex) => {
    let avatarsClone = cloneDeep(avatars);
    avatarsClone[index]["users"][userIndex][key] = e.target.value;
    if (key === "emailId") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
        avatarsClone[index]["users"][userIndex][
          "emailErrorText"
        ] = getResourceValueByKey(
          resource,
          "NOT_A_VALID_EMAIL_ID",
          "Not a valid email id."
        );
      } else {
        avatarsClone[index]["users"][userIndex]["emailErrorText"] = "";
      }
    }
    setAvatars(avatarsClone);
  };

  const addMoreUsers = (index) => {
    let avatarsClone = cloneDeep(avatars);
    let usersValidity = checkValidUsers(avatars[index].users);
    if (usersValidity.valid) {
      avatarsClone[index].users.push({
        fullName: "",
        emailId: "",
      });
    } else {
      return;
    }
    setAvatars(avatarsClone);
  };

  const deleteUserByIndex = (avatarIndex, userIndex) => {
    let avatarsClone = cloneDeep(avatars);
    avatarsClone[avatarIndex].users.splice(userIndex, 1);
    setAvatars(avatarsClone);
  };

  const checkAvatarValuesValidity = (avatars) => {
    let valid = true;
    avatars.forEach((avatar) => {
      if (
        !avatar.name ||
        !avatar.postalAddress.state ||
        !avatar.postalAddress.townName ||
        !avatar.postalAddress.streetName ||
        !avatar.postalAddress.postalCode ||
        !avatar.postalAddress.countryCode ||
        !avatar.phoneNumber ||
        !avatar.email ||
        !avatar.registrationNumber ||
        !avatar.baseCcy ||
        !avatar.timezone ||
        !avatar.industryType ||
        !avatar.subType
      ) {
        valid = false;
      }
    });
    return valid;
  };

  const getApplyButtonDisable = () => {
    let disable = false;
    if (avatars.length === 0) {
      disable = true;
    } else {
      let valid = checkAvatarValuesValidity(avatars);
      if (!valid) {
        disable = true;
      }
    }
    return disable;
  };

  const handleViewAddUsersDialog = () => {
    setViewAddUsersDialogBox(true);
  };

  const handleCloseAddUsersDialogBox = () => {
    setViewAddUsersDialogBox(false);
  };

  const handleCloseEmailErrorDialogBox = () => {
    setEmailIdError(false);
  };

  const viewAddUsersDialogActions = [
    {
      text: getResourceValueByKey(resource, "OK", "Ok"),
      handler: handleCloseAddUsersDialogBox,
    },
  ];

  const emailErrorDialogActions = [
    {
      text: getResourceValueByKey(resource, "OK", "Ok"),
      handler: handleCloseEmailErrorDialogBox,
    },
  ];

  const getHeader = () => {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.title}
        align="left"
      >
        {getResourceValueByKey(resource, "ONBOARD_AVATAR", "Onboard Avatar")}
      </Typography>
    );
  };

  const getMainSection = () => {
    return (
      <>
        <TitleWithEditActions
          title={getResourceValueByKey(
            resource,
            "ENTER_DETAILS_TO_START_ONBOARDING",
            "Enter details to start onboarding"
          )}
          onAddIconClick={onAddIconClick}
          onDelete={handleDeleteRow}
          onApply={handleApply}
          getApplyButtonDisable={getApplyButtonDisable}
        />
        {avatars.length > 0 && (
          <div className={classes.logsContainer}>
            {mutationStatus.isLoading && (
              <div className={classes.centerDiv}>
                <Loader />
              </div>
            )}
            <TableTitle
              columnTitle1={getResourceValueByKey(
                resource,
                "CUSTOMER",
                "Customer"
              )}
              columnTitle2={getResourceValueByKey(
                resource,
                "REGISTRATION",
                "Registration"
              )}
              columnTitle3={getResourceValueByKey(
                resource,
                "MORE_INFO",
                "More Info"
              )}
            />
            <Grid container direction="column" className={classes.noWrap}>
              {avatars.map((avatar, index) => {
                return (
                  <Grid item key={index}>
                    <div className={classes.tableItem}>
                      <AvatarInfoRowItem
                        index={index}
                        resource={resource}
                        avatar={avatar}
                        subTypeOptions={subTypeOptions}
                        countryCodeOptions={countryCodeOptions}
                        industryTypeOptions={industryTypeOptions}
                        timeZoneOptions={timeZoneOptions}
                        handleSelectRow={handleSelectRow}
                        handleChangeAvatarInfo={handleChangeAvatarInfo}
                        handleChangeAddressInfo={handleChangeAddressInfo}
                        viewAddUsersDialogBox={viewAddUsersDialogBox}
                        handleViewAddUsersDialog={handleViewAddUsersDialog}
                        handleCloseAddUsersDialogBox={
                          handleCloseAddUsersDialogBox
                        }
                        viewAddUsersDialogActions={viewAddUsersDialogActions}
                        handleChangeAddUser={handleChangeAddUser}
                        addMoreUsers={addMoreUsers}
                        checkValidUsers={checkValidUsers}
                        deleteUserByIndex={deleteUserByIndex}
                        emailIdError={emailIdError}
                        handleCloseEmailErrorDialogBox={
                          handleCloseEmailErrorDialogBox
                        }
                        emailErrorDialogActions={emailErrorDialogActions}
                      />
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default OnboardAvatarContainer;
