import React, { useCallback } from 'react';
import { Meta } from '@storybook/react-vite';
import Message from '../Message';
import Button from '../../Button';
import { IMessageAPIOptions } from '../types';

export default {
    title: 'Core/Message',
    // component: Message,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
        },
    },
    args: {
        type: 'info',
        duration: 3,
        content: 'This is an info message!',
        animationDirection: 'down',
        className: undefined,
        style: undefined,
        icon: undefined,
        onClose: (key: string) => {
            console.log('onClose', key);
        },
        onClick: () => {
            console.log('onClick');
        },
    } as IMessageAPIOptions,
    argTypes: {},
} satisfies Meta<IMessageAPIOptions>;

/**
 *  Message hook
 */
export const MessageHook: React.FC<IMessageAPIOptions> = (args) => {
    const [messageApi, contextHolder] = Message.useMessage();

    const showMessage = useCallback((): void => {
        messageApi.open(args);
    }, [args, messageApi]);

    return (
        <div>
            {contextHolder}
            <Button onClick={ showMessage }> Show Message </Button>
        </div>
    );
};
