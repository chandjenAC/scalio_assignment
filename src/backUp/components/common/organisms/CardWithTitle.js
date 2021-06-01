import React from "react";
import resource from "../../../resources/common.json";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Card, CardContent } from "@material-ui/core";
import { IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import { smallCarouselBreakpoints } from "../../../utils/constants";
// import CustomLeftArrow from "../atoms/CarouselCustomArrows/CustomLeftArrow";
// import CustomRightArrow from "../atoms/CarouselCustomArrows/CustomRightArrow";
import Loader from "../atoms/Loaders/Loader";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    background: "transparent",
    position: "relative",
    margin: "10px 15px",
    borderRadius: "10px",
    backdropFilter: "blur(2px)",
    backgroundColor: "rgba(74, 76, 81, 0.43)",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  cardContentRoot: {
    margin: "20px 8px 0px 8px",
    // padding: 0,
    "&:last-child": {
      paddingBottom: 12,
    },
  },
  titleBox: {
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    background: theme.palette.common.black,
    width: "86%",
    padding: "5px 5px 0px 5px",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cartTitleText: {
    color: theme.palette.grey[400],
    // fontWeight:300
  },
  fullscreenIconButton: {
    position: "absolute",
    top: 6,
    right: 6,
    padding: 0,
    maxHeight: 50,
  },
  fullscreenIcon: {
    color: theme.palette.grey[400],
    fontSize: 26,
  },
}));

const CardWithTitle = ({ cardTitle, isLoading, children, padding }) => {
  const classes = useStyles();

  return (
    <Card className={classes.cardRoot}>
      {isLoading && (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      )}
      <CardContent classes={{ root: classes.cardContentRoot }}>
        <Box className={classes.titleBox}>
          <Typography variant="body2" noWrap className={classes.cartTitleText}>
            {cardTitle}
          </Typography>
        </Box>
        <Tooltip title={getResourceValueByKey(resource, "EXPAND", "Expand")}>
          <IconButton className={classes.fullscreenIconButton}>
            <FullscreenIcon className={classes.fullscreenIcon} />
          </IconButton>
        </Tooltip>
        <Box>
          {children}
          {/* <Carousel
            responsive={smallCarouselBreakpoints}
            renderButtonGroupOutside={true}
            customLeftArrow={<CustomLeftArrow arrowColor={"light"} />}
            customRightArrow={<CustomRightArrow arrowColor={"light"} />}
            showThumbs={false}
          > 
            <TestPie />
           </Carousel>  */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardWithTitle;
