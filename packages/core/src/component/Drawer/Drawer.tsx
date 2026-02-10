import React, { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getGlobal } from '@/utils/getGlobalUtils';
import DrawerPurePanel from './DrawerPurePanel';
import { drawerStyleManager } from './lib/DrawerStyleManager';
import type { IDrawerProps } from './types';

const Drawer: React.FC<IDrawerProps> = (props) => {
    const container = useMemo(() => {
        return props.getContainer?.() ?? getGlobal()?.document?.body;
    }, [props]);

    const isLocked = useRef(false);

    useEffect(() => {
        if (!getGlobal().document) return;
        // 如果没有遮罩层，则不需要锁定滚动
        if(props.mask === false) return;
        // 如果遮罩层被打开了，并且之前没有锁定滚动，则锁定滚动
        if (props.open && !isLocked.current) {
            isLocked.current = true;
            drawerStyleManager.lock();
        }
        // 如果遮罩层被关闭了，并且之前已经锁定了滚动，则解锁滚动
        if (!props.open && isLocked.current) {
            isLocked.current = false;
            drawerStyleManager.unlock();
        }
    }, [props.mask, props.open]);

    useEffect(() => {
        return () => {
            if (isLocked.current) {
                isLocked.current = false;
                drawerStyleManager.unlock();
            }
        };
    }, []);

    if (!getGlobal().document) return null;

    return createPortal(<DrawerPurePanel { ...props } />, container);
};

export default Drawer;
