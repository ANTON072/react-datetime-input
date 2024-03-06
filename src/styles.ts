import React from "react";

export const componentWrapper: React.CSSProperties = {
  display: "flex",
  columnGap: "0.5em",
};

export const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};
