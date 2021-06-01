import { Typography } from "@material-ui/core";
import React from "react";

const MultilineText = ({ text }) => {
  return (
    <div>
      {text.split("\n").map((i, key) => {
        return (
          <div key={key}>
            <Typography variant="subtitle2" noWrap>
              {i}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default MultilineText;
