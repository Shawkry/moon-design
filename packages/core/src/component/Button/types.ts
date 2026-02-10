import React, { CSSProperties } from 'react';

type TButtonType = 'primary' | 'default' | 'dashed' | 'text';
type TButtonSize = 'small' | 'medium' | 'large';
type TButtonStatus = 'normal' | 'success' | 'warning' | 'error';

export interface IButtonProps {
    /**
     * 按钮类型
     * @default primary
     */
    type?: TButtonType;
    /**
     * 幽灵属性，使按钮背景透明
     */
    ghost?: boolean;
    /**
     * 禁用按钮
     */
    disabled?: boolean;
    /**
     * 大小
     * @default medium
     */
    size?: TButtonSize;
    /**
     * 状态
     * @default normal
     */
    status?: TButtonStatus;
    /**
     * 按钮内容
     */
    children?: React.ReactNode;
    /**
     * class
     */
    className?: string;
    /**
     * style
     */
    style?: CSSProperties;
    /**
     * onClick点击事件
     */
    onClick?: () => void;
}
