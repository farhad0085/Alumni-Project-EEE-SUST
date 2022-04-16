import React from "react";
import classes from "./styles.module.scss";

const Loader = ({ height }) => {
  return (
    <div className={classes.wrapper} style={{ height: height || 330 }}>
      <div className={classes.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
