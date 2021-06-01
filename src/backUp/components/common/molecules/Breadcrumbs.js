import React, { useContext } from "react";
import { Button, Grid, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles, Typography, Fade, Paper } from "@material-ui/core";
import { ReactComponent as RightArrowIcon } from "../../../images/common/rightArrow.svg";
import { ReactComponent as CloseIcon } from "../../../images/common/close.svg";
import { ReactComponent as BinocularIcon } from "../../../images/common/binoculars.svg";
import { useNavigate } from "react-router-dom";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import resource from "../../../resources/common.json";
import { BreadcrumbContext } from "../../../contextProviders/BreadcrumbContextProvider";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    background: "transparent",
  },
  mainCont: {
    paddingLeft: 46,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 16,
    },
  },
  homeIconDiv: {
    // marginLeft: 10,
    marginRight: 16,
    "& svg": {
      width: 22,
      height: "auto",
    },
  },
  closeIconDiv: {
    marginRight: 16,
  },
  homeIcon: {
    color: theme.palette.grey[700],
    verticalAlign: "middle",
  },
  closeIcon: {
    color: theme.palette.grey[700],
    verticalAlign: "middle",
  },
  iconButton: {
    padding: 2,
  },
  button: {
    padding: 0,
    minWidth: "fit-content",
    "&.Mui-disabled": {
      pointerEvents: "auto",
    },
  },
  buttonLabel: {
    justifyContent: "flex-start",
  },
  crumb: {
    margin: "0px 16px 0px 0px",
  },
  rightArrowIcon: {
    color: theme.palette.grey[500],
    marginRight: 8,
    verticalAlign: "middle",
  },
  activeBreadcrumbText: {
    color: theme.palette.grey[700],
  },
  breadcrumbText: (isFirst) => ({
    color: isFirst ? theme.palette.grey[700] : theme.palette.grey[500],
    marginTop: isFirst ? 0 : 2,
  }),
}));

const StyledTypo = (props) => {
  const { isFirst, title, ...rest } = props;
  const classes = useStyles(isFirst);

  return (
    <Typography className={classes.breadcrumbText} {...rest} align="left">
      {title}
    </Typography>
  );
};

const ButtonWithTooltip = ({ tooltipText, disabled, onClick, ...other }) => {
  const adjustedButtonProps = {
    disabled: disabled,
    component: disabled ? "div" : undefined,
    onClick: disabled ? undefined : onClick,
  };
  const classes = useStyles();
  return (
    <Tooltip title={tooltipText}>
      <Button
        {...other}
        {...adjustedButtonProps}
        classes={{ root: classes.button, label: classes.buttonLabel }}
      />
    </Tooltip>
  );
};

const Breadcrumbs = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbContext);

  const ifYogiWebbHome = () => {
    return breadcrumbs?.[0].title === "Observatory" ? true : false;
  };

  const ifFirstNode = (index) => {
    return index === 0 ? true : false;
  };

  const ifLastNode = (index) => {
    return breadcrumbs?.length === index + 1 ? true : false;
  };

  const handleBreadcrumbClick = (index, path) => {
    // let oldCrumbs = [...breadcrumbs];
    // let newCrumbs = oldCrumbs.slice(0, index + 1);
    // let goBackBy = breadcrumbs.length - index - 1; //no. of steps to navigate back
    // setBreadcrumbs(newCrumbs);
    // navigate(-goBackBy);
    navigate(path);
  };

  const handleCloseApp = () => {
    navigate("/yogi-webb");
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "OBSERVATORY", "Observatory"),
        path: "/yogi-webb",
        observatory: true,
      },
    ]);
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} className={classes.fadePaper}>
        <Grid container alignItems="center" className={classes.mainCont}>
          <Grid
            item
            className={
              ifYogiWebbHome() ? classes.homeIconDiv : classes.closeIconDiv
            }
          >
            <IconButton
              onClick={handleCloseApp}
              className={classes.iconButton}
              disabled={ifYogiWebbHome()}
            >
              {ifYogiWebbHome() ? (
                <BinocularIcon className={classes.closeIcon} />
              ) : (
                <Tooltip
                  title={getResourceValueByKey(
                    resource,
                    "CLOSE_APP",
                    "Close App"
                  )}
                >
                  <CloseIcon className={classes.closeIcon} />
                </Tooltip>
              )}
            </IconButton>
          </Grid>

          {breadcrumbs.map((crumb, index) => {
            const { title } = crumb;
            const titleLength = title.length;
            const breadcrumbText =
              titleLength > 25
                ? `${title.substring(0, 6)}...${title.substring(
                    titleLength - 6,
                    titleLength
                  )}`
                : title;
            return (
              <Grid item key={index}>
                <Grid container alignItems="center">
                  {!ifFirstNode(index) && (
                    <Grid item>
                      <RightArrowIcon className={classes.rightArrowIcon} />
                    </Grid>
                  )}
                  <Grid item className={classes.crumb}>
                    {titleLength > 25 ? (
                      <ButtonWithTooltip
                        tooltipText={title}
                        disabled={ifLastNode(index)}
                        onClick={() => handleBreadcrumbClick(index, crumb.path)}
                      >
                        <StyledTypo
                          variant={ifFirstNode(index) ? "h6" : "subtitle1"}
                          title={breadcrumbText}
                          isFirst={ifFirstNode(index)}
                        />
                      </ButtonWithTooltip>
                    ) : (
                      <Button
                        classes={{
                          root: classes.button,
                          label: classes.buttonLabel,
                        }}
                        disabled={ifLastNode(index)}
                        onClick={() => handleBreadcrumbClick(index, crumb.path)}
                      >
                        <StyledTypo
                          variant={ifFirstNode(index) ? "h6" : "subtitle1"}
                          title={breadcrumbText}
                          isFirst={ifFirstNode(index)}
                        />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Fade>
  );
};

export default Breadcrumbs;
