import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { carouselBreakpoints } from "../../utils/constants";
import CustomLeftArrow from "../../components/common/atoms/CarouselCustomArrows/CustomLeftArrow";
import CustomRightArrow from "../../components/common/atoms/CarouselCustomArrows/CustomRightArrow";
import CustomButtonGroupAsArrows from "../../components/common/atoms/CarouselCustomArrows/CustomButtonGroupAsArrows";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { makeStyles, Typography } from "@material-ui/core";
import UsersByActivityContainer from "./UsersByActivityContainer";
import TopActivitiesContainer from "./TopActivitiesContainer";
import PeakActivityPeriodContainer from "./PeakActivityPeriodContainer";
import ActiveSessionsContainer from "./ActiveSessionsContainer";

const useStyles = makeStyles((theme) => ({
  seperationTextdivider: {
    position: "absolute",
    top: "45%",
    left: 72,
    borderColor: theme.palette.common.white,
    borderBottom: "1px solid white",
    height: 5,
    width: 100,
    [theme.breakpoints.down("lg")]: {
      top: "39%",
    },
  },
  seperationText: {
    position: "absolute",
    color: theme.palette.common.white,
    top: "43%",
    left: 20,
  },
}));

const KpisAndTrendsContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();

  const filterOptions = [
    {
      label: getResourceValueByKey(resource, "LAST_HOUR", "Last Hour"),
      value: "now-1h",
    },
    {
      label: getResourceValueByKey(resource, "LAST_DAY", "Last Day"),
      value: "now-1d/d",
    },
    {
      label: getResourceValueByKey(resource, "LAST_WEEK", "Last Week"),
      value: "now-1w/w",
    },
    {
      label: getResourceValueByKey(resource, "LAST_MONTH", "Last Month"),
      value: "now-1M/M",
    },
  ];

  //queries to get kpis data

  const getTrendsSeperatorText = () => {
    return (
      <>
        <Typography
          variant="body2"
          align="left"
          className={classes.seperationText}
        >
          {getResourceValueByKey(resource, "TRENDS", "Trends")}
        </Typography>
        <div className={classes.seperationTextdivider} />
      </>
    );
  };

  return (
    <Carousel
      responsive={carouselBreakpoints}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      renderButtonGroupOutside={true}
      renderDotsOutside
      showDots={true}
      arrows={false}
      customButtonGroup={<CustomButtonGroupAsArrows />}
    >
      <UsersByActivityContainer
        resource={resource}
        filterOptions={filterOptions}
        getTrendsSeperatorText={getTrendsSeperatorText}
      />

      <TopActivitiesContainer
        resource={resource}
        filterOptions={filterOptions}
        getTrendsSeperatorText={getTrendsSeperatorText}
      />
      <PeakActivityPeriodContainer
        resource={resource}
        filterOptions={filterOptions}
        getTrendsSeperatorText={getTrendsSeperatorText}
      />
      <ActiveSessionsContainer resource={resource} />
    </Carousel>
  );
};

export default KpisAndTrendsContainer;
