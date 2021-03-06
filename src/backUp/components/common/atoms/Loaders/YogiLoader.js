import React from "react";
import { makeStyles, Grid, Fade, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  yogiLoaderRoot: {
    height: "100vh",
  },
  // yogiWebb: {
  //   animation: `1.5s ${theme.transitions.easing.easeIn} 0s infinite alternate $scaleUp`,
  // },
  // "@keyframes scaleUp": {
  //   "0%": {
  //     opacity: "0.9",
  //   },
  //   "100%": {
  //     fill: theme.palette.action.active,
  //     opacity: "0.2",
  //   },
  // },

  pulseDiv: {
    position: "relative",
    "&::after": {
      content: "''",
      position: "absolute",
      borderRadius: "50%",
      top: -12,
      left: 20,
      height: 50,
      width: 50,
      background: "#2574fb",
      zIndex: 1,
      animation: `$pulse 1500ms infinite`,
    },
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(0.95)",
      opacity: "0.5",
    },
    "100%": {
      transform: "scale(1.35)",
      opacity: "0",
    },
  },
}));

const YogiLoader = () => {
  const classes = useStyles();
  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0}>
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.yogiLoaderRoot}
        >
          <Grid item className={classes.pulseDiv}>
            <svg width="90" viewBox="0 0 226 285">
              <g className={classes.yogiWebb}>
                <g>
                  <path
                    id="Path"
                    d="M39.7499 211.75V244.875H33.1249V278L33.1207 278.238C33.0011 281.63 30.3298 284.374 26.9681 284.609L26.7325 284.621L26.4999 284.625H6.62498L6.3873 284.621C2.99518 284.501 0.251115 281.83 0.0162953 278.468L0.00400719 278.233L0 278V268.891L0.0248505 268.091C0.95508 241.936 12.717 237.609 13.2314 218.373C13.2605 217.302 13.528 216.288 13.9837 215.391L14.126 215.126L14.2723 214.879C15.3534 213.138 17.1843 211.934 19.3345 211.769L19.6049 211.754L19.8418 211.75H39.7499Z"
                    fill="#2574FB"
                  />
                  <path
                    id="Path_2"
                    d="M86.1579 211.75L86.4201 211.755C88.6763 211.844 90.606 213.073 91.7279 214.879L91.8586 215.099L92.0161 215.391C92.4718 216.288 92.7392 217.302 92.7684 218.373C93.2776 237.416 104.811 241.848 105.944 267.313L105.975 268.091L106 268.891V278L105.996 278.238C105.876 281.63 103.205 284.374 99.8429 284.609L99.6073 284.621L99.3747 284.625H79.4998L79.2621 284.621C75.87 284.501 73.1259 281.83 72.8911 278.468L72.8788 278.233L72.8748 278V244.875H66.2498V211.75H86.1579Z"
                    fill="#2574FB"
                  />
                  <path
                    id="Path_3"
                    d="M59.6248 211.75V244.875H46.3749V211.75H59.6248Z"
                    fill="#2574FB"
                  />
                  <path
                    id="Path_4"
                    d="M82.8123 191.875L83.0003 191.88C84.6184 191.971 85.9255 193.221 86.104 194.814L86.1195 195L86.1248 195.188V205.125H66.2498V195.188L66.2551 195C66.3455 193.382 67.596 192.074 69.189 191.896L69.3743 191.88L69.5623 191.875H82.8123Z"
                    fill="#2574FB"
                  />
                  <path
                    id="Path_5"
                    d="M36.4374 191.875L36.6254 191.88C38.2435 191.971 39.5506 193.221 39.7291 194.814L39.7446 195L39.7499 195.188V205.125H19.8749V195.188L19.8802 195C19.9706 193.382 21.2212 192.074 22.8141 191.896L22.9994 191.88L23.1874 191.875H36.4374Z"
                    fill="#2574FB"
                  />
                </g>
                <g>
                  <path
                    id="Path_6"
                    d="M220.837 224.675V261.309C220.83 270.623 213.282 278.171 203.968 278.178H115.997L116 278V268.757L115.972 267.831C115.664 258.612 114.305 251.68 111.637 244.416L187.125 244.416V224.675C196.583 233.618 211.379 233.618 220.837 224.675Z"
                    fill="#2574FB"
                  />
                  <path
                    id="Path_7"
                    d="M203.744 181.561C212.386 181.556 220.179 186.758 223.49 194.74C226.801 202.723 224.976 211.914 218.867 218.026C212.758 224.139 203.568 225.969 195.584 222.663C187.599 219.357 182.393 211.566 182.393 202.924C182.393 191.13 191.95 181.568 203.744 181.561Z"
                    fill="#2574FB"
                  />
                </g>
                <path
                  d="M27.6819 86.0455L118.963 144.764L182.992 87.8652C187.495 83.8638 193.791 82.5689 199.508 84.4681C205.225 86.3673 209.494 91.1722 210.708 97.0728C211.922 102.973 209.895 109.073 205.392 113.075L98.8705 207.727C98.1741 206.889 97.398 206.121 96.5531 205.434L96.125 205.097L96.1248 195.188L96.1212 194.878C95.959 187.773 90.2314 182.043 83.1266 181.879L82.8123 181.875L77.2329 181.875L92.78 168.063L9.81004 114.66C4.65093 111.44 1.62484 105.691 1.88997 99.6155C2.15509 93.5395 5.67038 88.0766 11.0904 85.3177C16.3749 82.6277 22.6723 82.9144 27.6819 86.0455Z"
                  fill="#2574FB"
                />
                <path
                  d="M114.893 0.000754556C133.734 0.255107 148.825 15.6912 148.654 34.5331C148.482 53.375 133.113 68.5341 114.271 68.4478C95.4282 68.3577 80.2014 53.0553 80.2065 34.2126C80.344 15.1896 95.8698 -0.123808 114.893 0.000754556Z"
                  fill="#2574FB"
                />
              </g>
            </svg>
          </Grid>
        </Grid>{" "}
      </Paper>
    </Fade>
  );
};

export default YogiLoader;
