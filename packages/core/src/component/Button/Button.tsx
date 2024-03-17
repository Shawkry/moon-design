import React from 'react';
import './button.css';
import type { IButtonProps } from '@/component/Button/types';
import classNames from 'classnames';
const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const { primary, size, status, backgroundColor, label, ...restProps } = props;
  const mergeCls = classNames(
    'button',
    `button--${size}`,
    `button--${status}`,
    primary ? 'button--primary' : 'button--secondary',
  );
  return (
    <button type="button" className={mergeCls} style={{ backgroundColor }} {...restProps}>
      {label}
    </button>
  );
};
Button.defaultProps = {
  size: 'medium',
  status: 'normal',
};
export default Button;
