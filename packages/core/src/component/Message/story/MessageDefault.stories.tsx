import React, { useCallback } from 'react';
import { Meta } from '@storybook/react-vite';
import { MessagePurePanel } from '../MessagePurePanel';
import type { IMessageAPIOptions, IMessagePurePanelProps } from '../types';
import Message from '../Message';
import Button from '../../Button';

export default {
    title: 'Core/Message',
    component: MessagePurePanel,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
        },
    },
    args: {
        type: 'info',
        duration: 3,
        content: 'This is a message!',
    } satisfies Partial<IMessagePurePanelProps>,
    argTypes: {},
} satisfies Meta<typeof MessagePurePanel>;

/**
 * Primary Message
 */
export const MessageDefault: React.FC<IMessageAPIOptions> = (args) => {
    const showMessage = useCallback(() =>{
        Message.open(args);
    },[args]);

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
          <Button onClick={ showMessage }> Show Info </Button>
      </div>
    );
};
