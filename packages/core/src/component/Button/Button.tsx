import React from "react";
import type { IButtonProps } from "./types";
import classNames from "classnames";
import * as css from "./styles/button.css";

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const {
    type,
    size,
    disabled,
    status,
    ghost,
    style,
    className,
    children,
    ...restProps
  } = props;

  const mergeCls = classNames(
    className,
    css.buttonSize({ size }),
    status ? css.status[status] : null,
    type ? css.buttonType[type] : null,
    {
      [css.disabled]: disabled,
      [css.ghost]: ghost,
    },
  );

  return (
    <button
      type="button"
      style={style}
      className={mergeCls}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};
Button.defaultProps = {
  size: "medium",
  status: "normal",
  type: "primary",
};
export default Button;
