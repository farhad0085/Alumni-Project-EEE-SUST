import React from "react";
import classes from "./styles.module.scss";

const Popup = ({ alumni, isOpen, onClose }) => {

  const handleClose = () => {
    onClose && onClose()
  }

  return (
    <>
      {isOpen && (
        <div className={classes.popupWrapper}>
          <div className={classes.popup}>
            <div className={classes.left}>
              <img
                className={classes.popup_profilePicture}
                src={alumni.profile_picture.picture}
                alt={alumni.name}
                height={'300px'}
                width={"300px"}
              />
            </div>
            <div className={classes.right}>
              <h3 className={classes.popup_header}>
                {alumni.name}
              </h3>
              <p className={classes.batchName}>
                Batch: {alumni.session}
              </p>
              <p className={classes.email}>
                Email: {alumni.email}
              </p>
              <p className={classes.phone}>
                Phone: {alumni.contact_number}
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Popup;