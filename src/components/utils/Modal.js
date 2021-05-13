import React from "react";
import "../../style/modal.scss";

function Modal(props) {
  const { handleClose, show, children } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button" onClick={handleClose} className="modal-close">
          X
        </button>
        {children}
      </section>
    </div>
  );
}

export default Modal;
