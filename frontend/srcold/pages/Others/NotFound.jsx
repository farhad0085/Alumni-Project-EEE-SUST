import React from "react";
import classes from "./styles.module.scss";

const NotFound = ({ history }) => {

  return (
    <div className={classes.container}>
      <div className={classes.container_box}>
        <h1>404</h1>
        <p>Page not found</p>
        <button onClick={() => history.push("/")}>Go Home</button>
      </div>
    </div>
  );
};

export default NotFound;
