import React from "react";

import styles from "./Input.module.css";

function Input(props, ref) {
  return (
    <div className={styles.input}>
      <label htmlfor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref} />
    </div>
  );
}

export default React.forwardRef(Input);
