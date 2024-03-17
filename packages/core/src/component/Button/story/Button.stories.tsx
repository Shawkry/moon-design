import { Meta } from '@storybook/react';
import Button from '../Button';
import { IButtonProps } from '@/component/Button';
import React from 'react';
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
    label: 'Button',
    ...Button.defaultProps,
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;
/**
 * Primary Button
 */
export const Default: React.FC<IButtonProps> = (args) => {
  return <Button {...args} primary={true}></Button>;
};
