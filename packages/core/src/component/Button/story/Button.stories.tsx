import React from 'react';
import { Meta } from '@storybook/react-vite';
import Button from '../Button';
import type { IButtonProps } from '../types';
export default {
    title: 'Core/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
        },
    },
    args: {
        children: 'Button',
    },
    argTypes: {
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof Button>;
/**
 * Primary Button
 */
export const Default: React.FC<IButtonProps> = (args) => {
    return <Button { ...args }></Button>;
};
