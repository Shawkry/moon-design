import React from 'react';

export interface ICounter {
    /**
     * 输入框value
     * @default 0
     */
    value?: number;

    /**
     * 反转加减按钮
     * @default false
     */
    reverseOrder?: boolean;

    /**
     * 是否允许浮点数
     */
    float?: boolean;

    /**
     * 是否自动聚焦输入框
     */
    autofocus?: boolean;

    /**
     * 输入框只读，不允许用户输入，但可以点击+-icon控制数值变化
     */
    inputReadOnly?: boolean;

    /**
     * 是否禁用
     */
    disabled?: boolean;

    /**
     * 步距，每次加减的值
     * @default 1
     */
    step?: number;

    /**
     * 最大值
     * @default Infinity
     */
    maxValue?: number;

    /**
     * 最小值
     * @default -Infinity
     */
    minValue?: number;

    /**
     * 最外层 className
     */
    className?: string;

    /**
     * 输入框 className
     */
    inputClassName?: string;

    /**
     * icon className
     */
    iconClassName?: string;

    /**
     * 最外层 style
     */
    style?: React.CSSProperties;

    /**
     * 输入框 style
     */
    inputStyle?: React.CSSProperties;

    /**
     * icon style
     */
    iconStyle?: React.CSSProperties;

    /**
     * 数据变化触发回调
     */
    onChange?: (value: number) => void;

    /**
     * 输入框失焦时触发回调
     */
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * 输入框聚焦时触发回调
     */
    onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
