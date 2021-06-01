import React, { useEffect, useState } from "react";
import Loader from "./atoms/Loaders/Loader";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Grid, Box, Tooltip } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import resource from "../../resources/common.json";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  pdfViewerRoot: {
    height: "100%",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paginationDiv: {
    height: "auto",
  },
  button: {
    minWidth: 32,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  canvasContainer: {
    maxWidth: 1100,
    // width: "100%",
    // flexGrow: "1",
  },
  pdfContainer: {
    padding: "12px",
    maxHeight: "630px",
    overflow: "scroll",
  },
}));

const PDFviewer = (props) => {
  const { pdfDoc } = props;
  const classes = useStyles();
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.3);

  let pageIsRendering = false;
  let pageNumIsPending = null;

  const renderPage = (num) => {
    pageIsRendering = true;
    //get page
    pdfDoc.getPage(num).then((page) => {
      //set scale
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = { canvasContext: context, viewport };
      page.render(renderContext).promise.then(() => {
        pageIsRendering = false;
        if (pageNumIsPending !== null) {
          renderPage(pageNumIsPending);
          pageNumIsPending = null;
        }
      });
      //output current page
      setPageNumber(num);
    });
  };

  useEffect(() => {
    let canvas = document.getElementById("canvas");
    setCanvas(canvas);
    let context = canvas.getContext("2d");
    setContext(context);

    if (pdfDoc) {
      renderPage(pageNumber);
      setNumPages(pdfDoc.numPages);
    }
  }, [scale, pdfDoc]);

  const zoomIn = () => {
    setScale(scale + 0.2);
  };

  const zoomOut = () => {
    setScale(scale - 0.2);
  };

  //check for pages rendering
  const queueRenderPage = (num) => {
    if (pageIsRendering) {
      pageNumIsPending = num;
    } else {
      renderPage(num);
    }
  };

  const handleNextPageClick = () => {
    if (pageNumber < pdfDoc.numPages) {
      let newPageNum = pageNumber + 1;
      setPageNumber(newPageNum);
      queueRenderPage(newPageNum);
    }
  };

  const handlePrevPageClick = () => {
    if (pageNumber > 1) {
      let newPageNum = pageNumber - 1;
      setPageNumber(newPageNum);
      queueRenderPage(newPageNum);
    }
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.pdfViewerRoot}
      alignItems="center"
      justify="center"
    >
      {!pdfDoc && (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      )}
      <Grid item className={classes.paginationDiv}>
        <Grid container alignItems="center" justify="center">
          <Tooltip
            title={getResourceValueByKey(resource, "PREV_PAGE", "Prev. page")}
          >
            <IconButton
              className={classes.button}
              disabled={pageNumber <= 1}
              onClick={() => handlePrevPageClick()}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={getResourceValueByKey(resource, "NEXT_PAGE", "Next page")}
          >
            <IconButton
              className={classes.button}
              disabled={pageNumber >= numPages}
              onClick={() => handleNextPageClick()}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={getResourceValueByKey(resource, "ZOOM_IN", "Zoom in")}
          >
            <IconButton className={classes.button} onClick={() => zoomIn()}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={getResourceValueByKey(resource, "ZOOM_OUT", "Zoom out")}
          >
            <IconButton className={classes.button} onClick={() => zoomOut()}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      {/* <span>
        Page <span>{pageNumber}</span>of<span>{numPages}</span>
      </span> */}
      {/* <button>
        <i onClick={() => zoomIn()} className="fas fa-plus"></i>
      </button>
      <button>
        <i onClick={() => zoomOut()} className="fas fa-minus"></i>
      </button> */}
      {/* <div style={{ width: "100%", height: "600px", overflow: "scroll" }}> */}
      <Grid item className={classes.canvasContainer}>
        <Box className={classes.pdfContainer}>
          <canvas id="canvas"></canvas>
        </Box>
      </Grid>

      {/* </div> */}
    </Grid>
  );
};

export default PDFviewer;
