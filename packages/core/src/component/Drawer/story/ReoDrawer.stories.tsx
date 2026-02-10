import React from 'react';
import { Meta } from '@storybook/react-vite';
import Drawer from '../Drawer';
import Button from '../../Button';
import { IDrawerProps } from '../types';

export default {
    title: 'Core/Drawer',
    component: Drawer,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
        },
    },
    args: {
        placement: 'bottom',
        children: 'This is a drawer content',
        title: 'Drawer Title',
    } as IDrawerProps,
    argTypes: {},
} satisfies Meta<IDrawerProps>;

/**
 * Primary Drawer
 */
export const Default: React.FC<IDrawerProps> = (args) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = React.useCallback((): void => {
        setOpen(true);
    }, []);

    const handleClose = React.useCallback((): void => {
        setOpen(false);
    }, []);

    return (
        <div>
            <Button onClick={ handleOpen }>Open Drawer</Button>
            <Drawer
                key={args.placement}
                { ...args }
                open={ open }
                onClose={ handleClose }
            />
        </div>
    );
};
