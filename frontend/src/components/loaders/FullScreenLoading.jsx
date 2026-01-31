import classes from "./styles.module.scss";

const FullScreenLoading = () => {
  return (
    <div className={classes.loader_container}>
      <div className={classes.loader}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default FullScreenLoading;
