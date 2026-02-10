import React from 'react';

export type TDrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface IDrawerProps {

    /**
     * 抽屉是否可见
     */
    open: boolean;

    /**
     * 抽屉内容节点
     */
    children: React.ReactNode;

    /**
     * 抽屉的方向
     * @default 'bottom'
     */
    placement?: TDrawerPlacement;

    /**
     * 抽屉的头部节点
     */
    header?: React.ReactNode;

    /**
     * 抽屉的标题
     */
    title?: React.ReactNode;

    /**
     * 关闭图标
     */
    closeIcon?: React.ReactNode;

    /**
     * 高度
     * 在 placement 为 top 或 bottom 时生效，默认为 ‘80vh'
     */
    height?: string | number;

    /**
     * 宽度
     * 在 placement 为 top 或 bottom 时默认为 '100%'，
     * 在 placement 为 right 或 left 时默认为 ‘40vw'
     */
    width?: string | number;

    /**
     * 层级
     * @default 1000
     */
    zIndex?: string | number;

    /**
     * 是否显示遮罩层
     * @default true
     */
    mask?: boolean;

    /**
     * 点击遮罩层是否允许关闭
     * @default true
     */
    maskClosable?: boolean;

    /**
     * 关闭时销毁抽屉元素
     * @default false
     */
    destroyOnHidden?: boolean;

    /**
     * 展开收起动画持续时间（毫秒）
     * @default 300
     */
    animationDuration?: number;

    /**
     * 抽屉的样式
     */
    style?: React.CSSProperties;

    /**
     * 抽屉的css类名
     */
    className?: string;

    /**
     * 抽屉遮罩层的样式
     */
    maskStyle?: React.CSSProperties;

    /**
     * 抽屉遮罩层的css类名
     */
    maskClassName?: string;

    /**
     * 配置挂载的节点
     * @default document.body
     */
    getContainer?: () => HTMLElement | null;

    /**
     * 关闭抽屉的回调函数
     */
    onClose?: () => void;

}
