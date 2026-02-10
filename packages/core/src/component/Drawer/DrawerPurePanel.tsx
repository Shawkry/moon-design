import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import classNames from 'classnames';
import {
    DEFAULT_ANIMATION_DURATION,
    DEFAULT_HORIZONTAL_HEIGHT,
    DEFAULT_HORIZONTAL_WIDTH,
    DEFAULT_VERTICAL_HEIGHT,
    DEFAULT_VERTICAL_WIDTH,
    DEFAULT_Z_INDEX
} from './lib/constants';
import type { IDrawerProps } from './types';
import { CloseOutlined } from '@ant-design/icons';
import * as styles from './css/drawer.css';

const DrawerPurePanel: React.FC<IDrawerProps> = (props) => {

    const [destroyDrawer, setDestroyDrawer] = useState(false);

    const isReadyDestroyDrawerRef = useRef(false);

    const animationDuration = useMemo(() => {
        return props.animationDuration ?? DEFAULT_ANIMATION_DURATION;
    }, [props.animationDuration]);

    const placement = useMemo(() => {
        return props.placement ?? 'bottom';
    }, [props.placement]);

    const drawerClassName = useMemo(() => classNames(
        styles.drawer,
        styles.drawerPosition[placement],
        {
            [styles.drawerOpen]: props.open,
        },
        props.className
    ), [placement, props.open, props.className]);

    const drawerStyle = useMemo(() => {
        const isVertical = placement === 'top' || placement === 'bottom';
        const defaultWidth = isVertical ? DEFAULT_VERTICAL_WIDTH : DEFAULT_HORIZONTAL_WIDTH;
        const defaultHeight = isVertical ? DEFAULT_VERTICAL_HEIGHT : DEFAULT_HORIZONTAL_HEIGHT;

        return {
            ...assignInlineVars({
                [styles.drawerAnimationDuration]: `${animationDuration}ms`,
                [styles.drawerWidth]: String(props.width ?? defaultWidth),
                [styles.drawerHeight]: String(props.height ?? defaultHeight),
                [styles.drawerZIndex]: String(props.zIndex ?? DEFAULT_Z_INDEX),
            }),
            ...props.style,
        };
    }, [placement, animationDuration, props.width, props.height, props.zIndex, props.style]);

    useEffect(() => {
        if (!props.open && isReadyDestroyDrawerRef.current) {
            // 如果抽屉关闭，并且设置了 destroyOnHidden，则在动画结束后销毁抽屉元素
            const timer = setTimeout(() => {
                setDestroyDrawer(true);
            }, animationDuration);
            return () => {
                clearTimeout(timer);
                isReadyDestroyDrawerRef.current = false;
            };
        }

        if (props.destroyOnHidden === true) {
            isReadyDestroyDrawerRef.current = true;
        }

        return () => {
            isReadyDestroyDrawerRef.current = false;
        };
    }, [props.open, animationDuration, props.destroyOnHidden]);

    const handleMaskClick = useCallback((): void => {
        if (props.maskClosable === false) return;
        props.onClose?.();
    }, [props]);

    const handleCloseIconClick = useCallback((): void => {
        props.onClose?.();
    }, [props]);

    const header = useMemo(() => {
        if (props.header !== undefined) return props.header;
        return (
            <div className={ styles.drawerHeader }>
                <div className={ styles.drawerTitle }>
                    { props.title }
                </div>
                <div className={ styles.closeDrawer }>
                    {
                        props.closeIcon ?? (
                            <CloseOutlined
                                className={ styles.closeDrawerIcon }
                                onClick={ handleCloseIconClick }
                                width={ '20px' }
                            />
                        )
                    }
                </div>
            </div>
        );
    }, [handleCloseIconClick, props.closeIcon, props.header, props.title]);

    const mask = useMemo(() => {
        if (props.mask === false || !props.open) return null;
        return (
            <div
                style={{
                    ...assignInlineVars({
                        [styles.drawerZIndex]: String(props.zIndex ?? DEFAULT_Z_INDEX),
                    }),
                    ...props.maskStyle
                }}
                className={ classNames(styles.mask, props.maskClassName) }
                onClick={ handleMaskClick }
            />
        );
    }, [props.mask, props.maskClassName, props.maskStyle, props.open, props.zIndex,
        handleMaskClick]);

    if (destroyDrawer) return null;

    return (
        <>
            { mask }
            <div
                className={ drawerClassName }
                style={ drawerStyle }
            >
                { header }
                <div className={ styles.drawerContent }>
                    { props.children }
                </div>
            </div>
        </>
    );
};

export default DrawerPurePanel;
