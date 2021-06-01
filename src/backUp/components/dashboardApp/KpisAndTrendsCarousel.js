import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomLeftArrow from "../common/atoms/CarouselCustomArrows/CustomLeftArrow";
import CustomRightArrow from "../common/atoms/CarouselCustomArrows/CustomRightArrow";
import { smallCarouselBreakpoints } from "../../utils/constants";
import { carouselBreakpoints } from "../../utils/constants";
import { Box, IconButton, makeStyles } from "@material-ui/core";
import { Tooltip, Typography } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
// import { ReactComponent as YogiIcon } from "../../images/Yogi_bot.svg";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import CustomButtonGroupAsArrows from "../common/atoms/CarouselCustomArrows/CustomButtonGroupAsArrows";

const useStyles = makeStyles((theme) => ({
  carouselRootBox: {
    paddingBottom: "16px",
    position: "relative",
    paddingRight: 20,
    paddingLeft: 20,
  },
  cardRoot: {
    background: "transparent",
    margin: "10px 15px",
    borderRadius: "10px",
    backdropFilter: "blur(2px)",
    backgroundColor: "rgba(74, 76, 81, 0.43)",
  },
  cardContentRoot: {
    margin: "20px 8px 0px 8px",
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
  kpiBoxCont: {
    paddingTop: 10,
    // [theme.breakpoints.down("lg")]: {
    //   paddingTop: 10,
    // },
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
  seperationText: {
    position: "absolute",
    top: "40%",
    left: 26,
    color: theme.palette.common.white,
    [theme.breakpoints.down("lg")]: {
      top: "37%",
    },
  },
  seperationTextdivider: {
    position: "absolute",
    top: "42%",
    left: 82,
    borderColor: theme.palette.common.white,
    borderBottom: "1px solid white",
    height: 5,
    width: 100,
    [theme.breakpoints.down("lg")]: {
      top: "39%",
    },
  },
}));

const KpisAndTrendsCarousel = (props) => {
  const {
    resource,
    ideas,
    // handleYogiButtonClick,
    getKpiChart,
    getTrendChart,
  } = props;
  const classes = useStyles();

  return (
    <Box className={classes.carouselRootBox}>
      <Carousel
        responsive={carouselBreakpoints}
        customLeftArrow={<CustomLeftArrow size="default" />}
        customRightArrow={<CustomRightArrow size="default" />}
        renderButtonGroupOutside={true}
        renderDotsOutside
        showDots={true}
        // arrows={false}
        // customButtonGroup={<CustomButtonGroupAsArrows />}
        // centerMode={true}
        // showThumbs={true}
      >
        {ideas.map((idea) => {
          return (
            <Card key={idea.id} className={classes.cardRoot}>
              {/* Here we can provide each individual idea title from idea.displayName  */}
              <CardContent classes={{ root: classes.cardContentRoot }}>
                <Box className={classes.titleBox}>
                  <Typography
                    variant="body2"
                    noWrap
                    className={classes.cartTitleText}
                  >
                    {idea.displayName}
                  </Typography>
                </Box>
                <Tooltip
                  title={getResourceValueByKey(resource, "EXPAND", "Expand")}
                >
                  <IconButton className={classes.fullscreenIconButton}>
                    <FullscreenIcon className={classes.fullscreenIcon} />
                  </IconButton>
                </Tooltip>
                <Box className={classes.kpiBoxCont}>
                  <Carousel
                    responsive={smallCarouselBreakpoints}
                    renderButtonGroupOutside={true}
                    customLeftArrow={
                      <CustomLeftArrow arrowColor={"light"} size={"small"} />
                    }
                    customRightArrow={
                      <CustomRightArrow arrowColor={"light"} size={"small"} />
                    }
                    showThumbs={false}
                  >
                    {idea.ideaData.kpis.map((kpi) => {
                      return getKpiChart(kpi);
                    })}
                  </Carousel>{" "}
                </Box>
                <Typography
                  className={classes.seperationText}
                  variant="body2"
                  align="left"
                >
                  {getResourceValueByKey(resource, "TRENDS", "Trends")}
                </Typography>
                <div className={classes.seperationTextdivider} />
                <Carousel
                  responsive={smallCarouselBreakpoints}
                  renderButtonGroupOutside={true}
                  customLeftArrow={
                    <CustomLeftArrow arrowColor={"light"} size={"small"} />
                  }
                  customRightArrow={
                    <CustomRightArrow arrowColor={"light"} size={"small"} />
                  }
                  showThumbs={false}
                >
                  {idea.ideaData.trends.map((trend, index) => {
                    return getTrendChart(trend, index);
                  })}
                </Carousel>
              </CardContent>
            </Card>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default KpisAndTrendsCarousel;

// import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import CustomLeftArrow from "../common/atoms/CarouselCustomArrows/CustomLeftArrow";
// import CustomRightArrow from "../common/atoms/CarouselCustomArrows/CustomRightArrow";
// import { smallCarouselBreakpoints } from "../../utils/constants";
// import { carouselBreakpoints } from "../../utils/constants";
// import { Box, IconButton, makeStyles } from "@material-ui/core";
// import { Tooltip, Typography } from "@material-ui/core";
// import { Card, CardContent } from "@material-ui/core";
// import { getResourceValueByKey } from "../../utils/resourceHelper";
// // import { ReactComponent as YogiIcon } from "../../images/Yogi_bot.svg";
// import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import LeftArrow from "@material-ui/icons/ArrowBackIos";
// import RightArrow from "@material-ui/icons/ArrowForwardIos";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const useStyles = makeStyles((theme) => ({
//   carouselRootBox: {
//     paddingBottom: "16px",
//     position: "relative",
//     paddingRight: 20,
//     paddingLeft: 20,
//   },
//   cardRoot: {
//     background: "transparent",
//     margin: "10px 15px",
//     borderRadius: "10px",
//     backdropFilter: "blur(2px)",
//     backgroundColor: "rgba(74, 76, 81, 0.43)",
//   },
//   cardContentRoot: {
//     margin: "20px 8px 0px 8px",
//     "&:last-child": {
//       paddingBottom: 12,
//     },
//   },
//   titleBox: {
//     position: "absolute",
//     top: "0%",
//     left: "50%",
//     transform: "translate(-50%, 0%)",
//     background: theme.palette.common.black,
//     width: "86%",
//     padding: "5px 5px 0px 5px",
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   cartTitleText: {
//     color: theme.palette.grey[400],
//     // fontWeight:300
//   },
//   kpiBoxCont: {
//     paddingTop: 20,
//     [theme.breakpoints.down("lg")]: {
//       paddingTop: 10,
//     },
//   },
//   fullscreenIconButton: {
//     position: "absolute",
//     top: 6,
//     right: 6,
//     padding: 0,
//     maxHeight: 50,
//   },
//   fullscreenIcon: {
//     color: theme.palette.grey[400],
//     fontSize: 26,
//   },
//   mainPrevButton: {
//     textAlign: "center",
//     position: "absolute",
//     top: "50%",
//     left: "0%",
//     transform: "translate(0%, -50%)",
//   },
//   mainNextButton: {
//     textAlign: "center",
//     position: "absolute",
//     top: "50%",
//     right: "0%",
//     transform: "translate(0%, -50%)",
//   },
//   seperationText: {
//     position: "absolute",
//     top: "40%",
//     left: 26,
//     color: theme.palette.common.white,
//     [theme.breakpoints.down("lg")]: {
//       top: "37%",
//     },
//   },
//   seperationTextdivider: {
//     position: "absolute",
//     top: "42%",
//     left: 82,
//     borderColor: theme.palette.common.white,
//     borderBottom: "1px solid white",
//     height: 5,
//     width: 100,
//     [theme.breakpoints.down("lg")]: {
//       top: "39%",
//     },
//   },
// }));

// const responsiveSettings = {
//   dots: true,
//   infinite: false,
//   speed: 500,
//   adaptiveHeight: false,
//   draggable: false,
//   slidesToShow: 3,
//   slidesToScroll: 3,
//   initialSlide: 0,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         initialSlide: 2,
//       },
//     },
//   ],
// };

// const singleSlideSettings = {
//   dots: false,
//   infinite: false,
//   draggable: false,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   adaptiveHeight: false,
// };

// const KpisAndTrendsCarousel = (props) => {
//   const {
//     resource,
//     ideas,
//     // handleYogiButtonClick,
//     getKpiChart,
//     getTrendChart,
//   } = props;
//   const classes = useStyles();

//   const CustomButtonGroupAsArrows = ({ next, previous }) => {
//     return (
//       <>
//         <IconButton
//           onClick={previous}
//           className={classes.mainPrevButton}
//           color="primary"
//         >
//           <LeftArrow className={classes.icon} fontSize="small" />
//         </IconButton>
//         <IconButton
//           onClick={next}
//           className={classes.mainNextButton}
//           color="primary"
//         >
//           <RightArrow className={classes.icon} fontSize="small" />
//         </IconButton>
//       </>
//     );
//   };

//   return (
//     <Box className={classes.carouselRootBox}>
//       <Slider {...responsiveSettings}>
//         {ideas.map((idea) => {
//           return (
//             <div style={{ outline: "none", border: "none" }}>
//               <Card key={idea.id} className={classes.cardRoot}>
//                 {/* Here we can provide each individual idea title from idea.displayName  */}
//                 <CardContent classes={{ root: classes.cardContentRoot }}>
//                   <Box className={classes.titleBox}>
//                     <Typography
//                       variant="body2"
//                       noWrap
//                       className={classes.cartTitleText}
//                     >
//                       {idea.displayName}
//                     </Typography>
//                   </Box>
//                   <Tooltip
//                     title={getResourceValueByKey(resource, "EXPAND", "Expand")}
//                   >
//                     <IconButton className={classes.fullscreenIconButton}>
//                       <FullscreenIcon className={classes.fullscreenIcon} />
//                     </IconButton>
//                   </Tooltip>
//                   <Box className={classes.kpiBoxCont}>
//                     <Slider {...singleSlideSettings}>
//                       {idea.ideaData.kpis.map((kpi) => {
//                         return getKpiChart(kpi);
//                       })}
//                     </Slider>{" "}
//                   </Box>
//                   <Typography
//                     className={classes.seperationText}
//                     variant="body2"
//                     align="left"
//                   >
//                     {getResourceValueByKey(resource, "TRENDS", "Trends")}
//                   </Typography>
//                   <div className={classes.seperationTextdivider} />
//                   <Slider {...singleSlideSettings}>
//                     {idea.ideaData.trends.map((trend, index) => {
//                       return getTrendChart(trend, index);
//                     })}
//                   </Slider>
//                 </CardContent>
//               </Card>
//             </div>
//           );
//         })}
//       </Slider>
//     </Box>
//   );
// };

// export default React.memo(KpisAndTrendsCarousel);
