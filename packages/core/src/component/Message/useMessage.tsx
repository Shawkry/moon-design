import React, { useCallback, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { useNotification } from 'rc-notification';
import { MessagePurePanel } from './MessagePurePanel';
import { rcReactRender } from './lib/rcReactRender';
import { getGlobal } from '@/utils/getGlobalUtils';
import { DEFAULT_DURATION } from './lib/constants';
import type {
    IMessageAPI,
    IMessageAPIOptions,
    IUseMessageOptions,
    TUseMessageReturn
} from './types';
import * as styles from './styles/message.css';

export const useMessage = (options?: IUseMessageOptions): TUseMessageReturn => {
    const isInit = useRef(false);

    const getContainer = useMemo(() => {
        return options?.getContainer;
    }, [options?.getContainer]);

    const getClassName = useCallback(() => {
        return classNames(styles.messageWarp, options?.className);
    }, [options?.className]);

    const getStyle = useCallback((): React.CSSProperties => {
        return {
            ...options?.offset,
            ...options?.style,
        };
    }, [options?.offset, options?.style]);

    const [messageApi, contextHolder] = useNotification({
        getContainer: getContainer,
        className: getClassName,
        style: getStyle,
        maxCount: options?.maxCount,
    });

    const flushNotice = useCallback((): void => {
        if (!isInit.current) {
            const holderFragment = getGlobal().document.createDocumentFragment();
            rcReactRender(contextHolder, holderFragment);
            isInit.current = true;
        }
    }, [contextHolder]);

    const open = useCallback(
        (apiOptions: IMessageAPIOptions) => {
            flushNotice();
            const handleClick = apiOptions.onClick;
            const handleClose = apiOptions.onClose;
            messageApi.open({
                key: apiOptions.key,
                content: (
                    <MessagePurePanel
                        eventKey={ apiOptions.key ?? '' }
                        prefixCls={ '' }
                        type={ apiOptions.type }
                        content={ apiOptions.content }
                        icon={ apiOptions.icon }
                        animationDirection={ apiOptions.animationDirection }
                        duration={ apiOptions.duration ?? DEFAULT_DURATION }
                        style={ apiOptions.style }
                        className={ apiOptions.className }
                        onClick={ handleClick }
                        onClose={ handleClose }
                    />
                ),
                duration: apiOptions.duration ?? DEFAULT_DURATION,
            });
        },
        [flushNotice, messageApi],
    );

    const info = useCallback(
        (content: React.ReactNode, duration?: number) => {
            open({
                type: 'info',
                content: content,
                duration,
            });
        },
        [open],
    );

    const success = useCallback(
        (content: React.ReactNode, duration?: number) => {
            open({
                type: 'success',
                content: content,
                duration,
            });
        },
        [open],
    );

    const error = useCallback(
        (content: React.ReactNode, duration?: number) => {
            open({
                type: 'error',
                content: content,
                duration,
            });
        },
        [open],
    );

    const warning = useCallback(
        (content: React.ReactNode, duration?: number) => {
            open({
                type: 'warning',
                content: content,
                duration,
            });
        },
        [open],
    );

    const api: IMessageAPI = useMemo(() => {
        return {
            info,
            success,
            error,
            warning,
            open,
        };
    }, [error, info, open, success, warning]);

    return [api, contextHolder];
};
