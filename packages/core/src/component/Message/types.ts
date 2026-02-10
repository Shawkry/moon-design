import * as React from 'react';
import type { NoticeProps } from 'rc-notification/lib/Notice';
import { CSSProperties, MouseEvent } from 'react';

export type TMessageType = 'info' | 'error' | 'success' | 'warning';

export type TAnimationDirection = 'up' | 'down';

export type TMessageIconInfo = Record<TMessageType, React.ReactNode>;

export interface IUseMessageOptions {
    /**
     * 配置挂载的节点，但依旧为全屏展示
     * @default document.body
     */
    getContainer?: () => HTMLElement;

    /**
     * 最大显示数，超过限制时，最早的消息会被自动关闭
     */
    maxCount?: number;

    /**
     * 消息列表偏移值
     * @default PC端:{top:100px,bottom:'unset'} M端:{top:'unset',bottom:'100px'}
     */
    offset?: {
        top?: string;
        bottom?: string;
    };

    /**
     * class
     */
    className?: string;
    /**
     * style
     */
    style?: CSSProperties;
}

export type TUseMessageReturn = [IMessageAPI, React.ReactElement];

export interface IMessageAPIOptions {
    /**
     * 类型
     * @default info
     */
    type: TMessageType;

    /**
     * 消息内容
     */
    content: React.ReactNode;

    /**
     * 当前的唯一标志
     */
    key?: string | number;

    /**
     * 默认自动关闭延时，单位秒
     * @default 2
     */
    duration?: number;

    /**
     * 自定义图标
     */
    icon?: React.ReactNode;

    /**
     * 消息动画出现方向
     * @default down
     */
    animationDirection?: TAnimationDirection;

    /**
     * 单个消息className
     */
    className?: string;
    /**
     * 单个消息style
     */
    style?: CSSProperties;

    /**
     * 点击时触发的回调函数
     */
    onClick?: (e: MouseEvent) => void;

    /**
     * 关闭时触发的回调函数
     */
    onClose?: (key: React.Key) => void;
}

export interface IMessagePurePanelProps extends NoticeProps {
    /**
     * 类型
     * @default info
     */
    type: TMessageType;

    /**
     * 消息icon
     */
    icon?: React.ReactNode;

    /**
     * 默认自动关闭延时，单位秒
     * @default 2
     */
    duration: number;

    /**
     * 消息出现的动画朝向，向上出现或向下出现
     * @default down
     */
    animationDirection?: TAnimationDirection;

    /**
     * 关闭时触发的回调函数
     */
    onClose?: (key: React.Key) => void;
}

export interface IMessageContextType {
    messageApi: IMessageAPI | null;
    config: IUseMessageOptions;
    setConfig: (config: IUseMessageOptions) => void;
}

export interface IMessageAPI {
    info: (content: React.ReactNode, duration?: number) => void;
    success: (content: React.ReactNode, duration?: number) => void;
    error: (content: React.ReactNode, duration?: number) => void;
    warning: (content: React.ReactNode, duration?: number) => void;
    open: (props: IMessageAPIOptions) => void;
}

export interface IMessage extends IMessageAPI {
    config: (config: IUseMessageOptions) => void;
    useMessage: (options?: IUseMessageOptions) => TUseMessageReturn;
}
