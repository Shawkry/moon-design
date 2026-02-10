import React, { useCallback } from 'react';
import { Meta } from '@storybook/react-vite';
import Message from '../Message';
import Button from '../../Button';
import { TMessageType, IMessageAPIOptions } from '../types';

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
        duration: 3,
        content: 'This is a message!',
    } as IMessageAPIOptions,
    argTypes: {},
} satisfies Meta<IMessageAPIOptions>;

/**
 * Message global api
 */
export const MessageGlobalApi: React.FC<IMessageAPIOptions> = (args) => {
    const showMessage = useCallback(
        (type: TMessageType): void => {
            switch (type) {
                case 'info':
                    Message.info(args.content, args.duration);
                    break;
                case 'success':
                    Message.success(args.content, args.duration);
                    break;
                case 'error':
                    Message.error(args.content, args.duration);
                    break;
                case 'warning':
                    Message.warning(args.content, args.duration);
                    break;
            }
        },
        [args.content, args.duration],
    );

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <p style={{ color: 'white' }}> 全局静态方法无法消费 Context，有 Context 需求可以使用 Hook 版本 </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Button onClick={ showMessage.bind(null, 'info') }> Show Info </Button>
                <Button onClick={ showMessage.bind(null, 'success') }> Show Success </Button>
                <Button onClick={ showMessage.bind(null, 'error') }> Show Error </Button>
                <Button onClick={ showMessage.bind(null, 'warning') }> Show Warning </Button>
            </div>
        </div>
    );
};
