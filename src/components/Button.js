import React from "react";
import classnames from 'classnames/bind';

import "components/Button.scss";

export default function Button(props) {
   const { disabled, onClick, confirm, danger } = props;

   const buttonClass = classnames("button", {
      "button--confirm": confirm,
      "button--danger": danger
   });
   
   return <button className={buttonClass} disabled={disabled} onClick={onClick}>{props.children}</button>
}
