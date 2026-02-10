import React from 'react';
import { Meta } from '@storybook/react-vite';
import Counter from '../Counter';
import type { ICounter } from '../types';

export default {
    title: 'Core/Counter',
    component: Counter,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
        },
    },
    args: {
        float: false,
        value: 6,
        step: 2,
        inputReadOnly: false,
        maxValue: 10,
        minValue: -10,
        disabled: false,
        autofocus: false,
        iconStyle: {},
        inputStyle: {},
        className: '',
        inputClassName: '',
        iconClassName: '',
        onChange: (value) => {
            console.log(value);
        },
        onFocus: (event) => {
            console.log(event);
        },
        onBlur: (event) => {
            console.log(event);
        },
    },
    argTypes: {},
} satisfies Meta<typeof Counter>;
/**
 * Primary Counter
 */
export const Default: React.FC<ICounter> = (args) => {
    return <Counter { ...args }></Counter>;
};
