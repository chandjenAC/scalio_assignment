import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UpdateFavouriteContainer from "../../containers/BillingApp/UpdateFavouriteContainer";
import { formatAmount } from "../../utils";
import { clientCardsBreakpoints } from "../../utils/constants";
import { bilingHomeBreakpoints } from "../../utils/constants";
import CustomLeftArrow from "../common/atoms/CarouselCustomArrows/CustomLeftArrow";
import CustomRightArrow from "../common/atoms/CarouselCustomArrows/CustomRightArrow";
import "./clientCarousel.css";
import CompanyLogo from "./CompanyLogo";
import { ReactComponent as CityIcon } from "../../images/common/city.svg";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import ClientCardTags from "./ClientCardTags";
import { format, parseISO } from "date-fns";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { Box, Button, Divider, Grid } from "@material-ui/core";
import RightArrowIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  rootBox: {
    display: "grid",
    padding: 6,
    minHeight: 100,
    background: (props) => (props.billingHome ? "transparent" : "#fafbfc"),
    // margin: 6,
    borderRadius: 10,
  },
  clientCard: {
    position: "relative",
    margin: "4px 40px 4px 20px",
    height: "100%",
    borderRadius: 15,
    padding: "24px 12px 12px 12px",
    boxShadow: "2px 3px 10px -3px rgb(0 0 0 / 36%)",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.06)",
      background: "linear-gradient(45deg, #86f249, #fffa61)",
      transition: "all 500ms ease-out",
    },
  },
  favIconDiv: {
    position: "absolute",
    width: 24,
    height: "auto",
    color: "#faf600",
    top: 6,
    right: 6,
  },
  paymentReceivedCard: {
    display: "grid",
    placeItems: "center",
    margin: "4px 30px 4px 30px",
    borderRadius: 15,
    padding: "24px 12px 12px 12px",
    boxShadow: "-4px -2px 8px 1px rgba(0,0,0,0.06)",
    background: "linear-gradient(-35deg, #75dbe0, #fcb3ff)",
    height: "98%",
    "&:hover": {
      boxShadow: "4px -2px 12px 1px rgba(0,0,0,0.06)",
      background: "linear-gradient(-35deg, #fcb3ff, #75dbe0)",
      transition: "all 500ms ease-out",
    },
  },
  cityIcon: { width: 60, height: "auto" },
  logItButtonRoot: { padding: "6px 45px", marginTop: 24 },
  clientCardCont: {
    height: "100%",
  },
  clientCardDetails: {
    flex: "1 1 auto",
    display: "grid",
    placeItems: "center",
  },
  infoBox: {
    margin: "4px 0px",
  },
  divider: {
    marginBottom: 6,
  },
}));

const ClientCarousel = (props) => {
  const {
    resource,
    billingHome,
    projectSummary,
    onSelectCard,
    activeView,
    refetchProjectSummary,
    onClickLogIt,
  } = props;
  const classes = useStyles(props);

  const renderLabelValue = ({ label, value }) => {
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.flexWrap}
      >
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            {value}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const getCardContentByActiveView = (item) => {
    if (activeView === "Activity Home") {
      return (
        <Typography variant="caption">
          {`${item.currentBalanceAmount.ccy} ${formatAmount(
            item.currentBalanceAmount.value
          )}`}
        </Typography>
      );
    } else if (activeView === "Statements Home") {
      return (
        <>
          {item.lastStatementDetails && (
            <Box className={classes.infoBox}>
              <Typography variant="overline">
                {getResourceValueByKey(
                  resource,
                  "LAST_STATEMENT",
                  "Last Statement"
                )}
              </Typography>
              <Typography variant="subtitle2">
                {`${item.lastStatementDetails.ccy} ${formatAmount(
                  item.lastStatementDetails.value
                )}`}
              </Typography>
              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    {getResourceValueByKey(resource, "DUE:", "Due:")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color="textSecondary">
                    {format(
                      new Date(parseISO(item.lastStatementDetails.dueOn)),
                      "MM/dd/yyyy"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          <Box className={classes.infoBox}>
            <Typography variant="overline">
              {getResourceValueByKey(
                resource,
                "CURRENT_BALANCE",
                "Current Balance"
              )}
            </Typography>
            <Typography variant="subtitle2">
              {`${item.currentBalanceAmount.ccy} ${formatAmount(
                item.currentBalanceAmount.value
              )}`}
            </Typography>
          </Box>
        </>
      );
    } else if (
      activeView === "Statements Past Due" ||
      activeView === "Statements Pending Approval"
    ) {
      return (
        item.lastStatementDetails && (
          <Box className={classes.infoBox}>
            <Typography variant="body2">
              {`${item.lastStatementDetails.ccy} ${formatAmount(
                item.lastStatementDetails.value
              )}`}
            </Typography>
          </Box>
        )
      );
    } else if (activeView === "Billing Home") {
      return (
        <>
          {item.lastStatementDetails && (
            <Box className={classes.infoBox}>
              <Typography variant="overline">
                {getResourceValueByKey(
                  resource,
                  "LAST_STATEMENT",
                  "Last Statement"
                )}
              </Typography>

              <Typography variant="subtitle2">
                {`${item.lastStatementDetails.ccy} ${formatAmount(
                  item.lastStatementDetails.value
                )}`}
              </Typography>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  {renderLabelValue({
                    label: getResourceValueByKey(
                      resource,
                      "BILLED:",
                      "Billed:"
                    ),
                    value: format(
                      new Date(
                        parseISO(item.lastStatementDetails.statementDate)
                      ),
                      "MM/dd"
                    ),
                  })}
                </Grid>
                <Grid item>
                  <RightArrowIcon className={classes.rightArrowIcon} />
                </Grid>
                <Grid item>
                  {renderLabelValue({
                    label: getResourceValueByKey(resource, "DUE:", "Due:"),
                    value: format(
                      new Date(parseISO(item.lastStatementDetails.dueOn)),
                      "MM/dd/yyyy"
                    ),
                  })}
                </Grid>
              </Grid>
            </Box>
          )}
          <Box className={classes.infoBox}>
            <Typography variant="overline">
              {getResourceValueByKey(
                resource,
                "CURRENT_BALANCE",
                "Current Balance"
              )}
            </Typography>
            <Typography variant="subtitle2">
              {`${item.currentBalanceAmount.ccy} ${formatAmount(
                item.currentBalanceAmount.value
              )}`}
            </Typography>
          </Box>
        </>
      );
    }
  };

  return (
    <Box className={classes.rootBox}>
      <Carousel
        containerClass={"padding8"}
        responsive={
          billingHome ? bilingHomeBreakpoints : clientCardsBreakpoints
        }
        customLeftArrow={<CustomLeftArrow arrowColor={"gradient"} />}
        customRightArrow={<CustomRightArrow arrowColor={"gradient"} />}
      >
        {activeView === "Statements Home" && (
          <Paper className={classes.paymentReceivedCard}>
            <Typography
              variant="subtitle1"
              className={classes.paymentReceivedTxt}
            >
              {getResourceValueByKey(
                resource,
                "PAYMENT_RECEIVED",
                "Payment Received"
              )}
            </Typography>
            <CityIcon className={classes.cityIcon} />
            <Button
              variant="outlined"
              className={classes.logItButtonRoot}
              onClick={onClickLogIt}
            >
              {getResourceValueByKey(resource, "LOG_IT!", "Log it!")}
            </Button>
          </Paper>
        )}
        {projectSummary?.data?.map((item, index) => {
          return (
            <Paper
              key={index}
              className={classes.clientCard}
              onClick={() => onSelectCard && onSelectCard(item)}
            >
              {activeView !== "Activity Home" && (
                <ClientCardTags
                  resource={resource}
                  lastStatementDetails={item.lastStatementDetails}
                  priceBookDetails={item.priceBookDetails}
                />
              )}
              <div className={classes.favIconDiv}>
                <UpdateFavouriteContainer
                  resource={resource}
                  favourite={item.markedAsFavourite}
                  projectId={item.id}
                  refetchProjectSummary={refetchProjectSummary}
                />
              </div>
              <Grid
                container
                direction="column"
                className={classes.clientCardCont}
              >
                <Grid item>
                  <CompanyLogo logoId={item.logoId} />
                  <Typography variant="subtitle1">
                    {item.customerName}
                  </Typography>
                  <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item className={classes.clientCardDetails}>
                  {getCardContentByActiveView(item)}
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default ClientCarousel;
