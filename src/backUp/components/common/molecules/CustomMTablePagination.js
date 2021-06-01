import React from 'react'
import PrevIcon from "@material-ui/icons/ArrowBackIos";
import NextIcon from "@material-ui/icons/ArrowForwardIos";
import { Grid, IconButton, Typography } from '@material-ui/core';

const CustomMTablePagination = (props) => {
    const { page, rowsPerPage, count, onChangePage } = props;
    let from = rowsPerPage * page + 1;
    let to = rowsPerPage * (page + 1);
    if (to > count) {
      to = count;
    }
    return (
      <td>
        <Grid
          container
          alignItems="center"
          justify="flex-end"
          style={{ paddingTop: 8 }}
        >
          <Grid item>
            <IconButton
              disabled={page === 0}
              onClick={(e) => onChangePage(e, page - 1)}
            >
              <PrevIcon
                fontSize="small"
                color={page === 0 ? "disabled" : "primary"}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="caption" style={{ color: "white" }}>
              {from}-{to} of {count}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              disabled={to >= count}
              onClick={(e) => onChangePage(e, page + 1)}
            >
              <NextIcon
                fontSize="small"
                color={to < count ? "primary" : "disabled"}
              />
            </IconButton>
          </Grid>
        </Grid>
      </td>
    );
}

export default CustomMTablePagination



