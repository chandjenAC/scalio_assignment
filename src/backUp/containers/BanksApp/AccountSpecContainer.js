import React, { useState } from "react";
import { useQuery } from "react-query";
import { getBankAccountSpec } from "../../utils/getData";
import AccountSpecDetails from "../../components/banksApp/AccountSpecDetails";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typo: {
    cursor: "pointer",
  },
}));

const AccountSpecContainer = (props) => {
  const { resource, specName } = props;
  const classes = useStyles();
  const [viewSpecDetails, setViewSpecDetails] = useState(false);

  const { data, isLoading } = useQuery(
    [
      "globalDataService_searchAccountSpec",
      {
        filters: [
          {
            fieldName: "specName",
            operator: "eq",
            values: [specName],
          },
        ],
        sort: [
          {
            fieldName: "bankName",
            sortOrder: "asc",
          },
        ],
        paging: {
          pageSize: 10,
          currentPage: 1,
        },
      },
    ],
    getBankAccountSpec,
    {
      enabled: viewSpecDetails,
      refetchOnWindowFocus: false,
    }
  );

  const handleClickSpecName = () => {
    if (specName !== "unavailable") {
      setViewSpecDetails(true);
    }
  };

  return (
    <>
      <Typography
        className={classes.typo}
        variant="body2"
        color={specName !== "unavailable" ? "primary" : "textSecondary"}
        onClick={handleClickSpecName}
      >
        {specName}
      </Typography>
      {viewSpecDetails && (
        <AccountSpecDetails
          isLoading={isLoading}
          resource={resource}
          data={data?.data[0]}
          setViewSpecDetails={setViewSpecDetails}
        />
      )}
    </>
  );
};

export default AccountSpecContainer;
