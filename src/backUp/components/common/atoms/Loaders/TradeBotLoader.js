import React from "react";
import { makeStyles, Grid, Fade, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fallBackLoaderRoot: {
    height: "100vh",
  },
  outerCircle: {
    animation: `$antiClockwise 3s ${theme.transitions.easing.easeInOut} infinite`,
    transformOrigin: "center",
  },
  innerCircle: {
    animation: `$clockwise 3s ${theme.transitions.easing.easeInOut} infinite`,
    transformOrigin: "center",
  },
  hexagonTop: {
    animation: `1.5s ease 0s infinite alternate $swingDown`,
  },
  hexagonBottom: {
    animation: `1.5s ease 0s infinite alternate $swingUp`,
  },
  "@keyframes antiClockwise": {
    "0%": {
      transform: "rotateZ(360deg)",
    },
    "100%": {
      transform: "rotateZ(0deg)",
    },
  },
  "@keyframes clockwise": {
    "0%": {
      transform: "rotateZ(0deg)",
    },
    "100%": {
      transform: "rotateZ(360deg)",
    },
  },
  "@keyframes swingDown": {
    "0%": {
      transform: "translate(0%,0%)",
    },
    "100%": {
      transform: "translate(8.8%,23%)",
    },
  },
  "@keyframes swingUp": {
    "0%": {
      transform: "translate(0%,0%)",
    },
    "100%": {
      transform: "translate(-8.8%,-23%)",
    },
  },
}));

const TradeBotLoader = (props) => {
  const { width } = props;
  const classes = useStyles();
  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={0}
        style={{ height: "100%", borderRadius: "25px 0px 0px 0px" }}
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <svg
              width={width ? width : "135"}
              //   height="auto"
              viewBox="0 0 360 201"
            >
              <g id="tbLoader">
                <g id="blocks">
                  <path
                    id="Rectangle"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 70H60V130H0V70Z"
                    fill="#272727"
                  />
                  <path
                    id="Rectangle Copy 2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M300 70H360V130H300V70Z"
                    fill="#272727"
                  />
                </g>
                <path
                  className={classes.outerCircle}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M111.645 57.1715L111.061 58.096C103.415 70.4099 99 84.9394 99 100.5C99 144.959 135.041 181 179.5 181C183.399 181 187.234 180.723 190.985 180.187C193.901 187.291 198.806 193.371 205.005 197.734C196.861 199.866 188.313 201 179.5 201C123.995 201 79 156.005 79 100.5C79 76.4105 87.4755 54.3006 101.607 36.9895C102.969 44.7066 106.54 51.6593 111.645 57.1715ZM179.5 0C235.005 0 280 44.9954 280 100.5C280 119.315 274.83 136.923 265.832 151.979C263.327 144.696 258.777 138.365 252.869 133.669C257.45 123.556 260 112.326 260 100.5C260 56.1209 224.088 20.1295 179.739 20.0003C177.798 12.4536 173.708 5.76735 168.16 0.633748C171.881 0.21476 175.665 0 179.5 0Z"
                  fill="#272727"
                />
                <g className={classes.innerCircle}>
                  <path
                    id="Shape"
                    d="M244 100.5C244 110.173 241.867 119.549 237.812 128.1L237.47 128.81L230.284 125.295C234.028 117.643 236 109.216 236 100.5C236 84.327 229.205 69.7412 218.314 59.4418L223.002 52.8779C235.906 64.6719 244 81.6407 244 100.5ZM216.765 47.8477L212.114 54.3579C210.542 53.2449 208.911 52.2103 207.227 51.2596L210.619 43.99C212.744 45.1625 214.795 46.4512 216.765 47.8477ZM203.387 40.5679L199.998 47.8331C197.953 47.0368 195.851 46.3562 193.699 45.7992L195.959 38.119C198.5 38.7876 200.979 39.6073 203.387 40.5679ZM179.5 36C182.408 36 185.27 36.1924 188.076 36.5651L185.788 44.3459C183.723 44.1174 181.625 44 179.5 44C178.455 44 177.414 44.0283 176.377 44.0848L175.341 44.1506L174.761 36.1716C176.333 36.0574 177.913 36 179.5 36Z"
                    fill="#00DDC0"
                  />
                  <path
                    id="Shape_2"
                    d="M116 98.3104C116 88.6378 118.133 79.2616 122.188 70.7107L122.53 70L129.716 73.5156C125.972 81.1678 124 89.5944 124 98.3104C124 114.483 130.795 129.069 141.686 139.369L136.998 145.933C124.094 134.138 116 117.17 116 98.3104ZM143.235 150.963L147.886 144.453C149.458 145.565 151.089 146.6 152.773 147.551L149.381 154.82C147.256 153.648 145.205 152.359 143.235 150.963ZM156.613 158.242L160.002 150.977C162.047 151.774 164.149 152.454 166.301 153.011L164.041 160.691C161.5 160.023 159.021 159.203 156.613 158.242ZM180.5 162.81C177.592 162.81 174.73 162.618 171.924 162.245L174.212 154.464C176.277 154.693 178.375 154.81 180.5 154.81C181.545 154.81 182.586 154.782 183.623 154.726L184.659 154.66L185.239 162.639C183.667 162.753 182.087 162.81 180.5 162.81Z"
                    fill="#00DDC0"
                  />
                </g>
                <path
                  className={classes.hexagonTop}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M142.751 8.7228L158.38 17.6115C160.005 18.5356 161 20.207 161 22.0116V39.9884C161 41.793 160.005 43.4644 158.38 44.3885L142.751 53.2772C141.056 54.2409 138.944 54.2409 137.249 53.2772L121.62 44.3885C119.995 43.4644 119 41.793 119 39.9884V22.0116C119 20.207 119.995 18.5356 121.62 17.6115L137.249 8.7228C138.944 7.75907 141.056 7.75907 142.751 8.7228Z"
                  fill="#00DDC0"
                />
                <path
                  className={classes.hexagonBottom}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M229.751 143.723L245.38 152.611C247.005 153.536 248 155.207 248 157.012V174.988C248 176.793 247.005 178.464 245.38 179.389L229.751 188.277C228.056 189.241 225.944 189.241 224.249 188.277L208.62 179.389C206.995 178.464 206 176.793 206 174.988V157.012C206 155.207 206.995 153.536 208.62 152.611L224.249 143.723C225.944 142.759 228.056 142.759 229.751 143.723Z"
                  fill="#00DDC0"
                />
              </g>
            </svg>{" "}
          </Grid>
        </Grid>{" "}
      </Paper>
    </Fade>
  );
};

export default TradeBotLoader;
