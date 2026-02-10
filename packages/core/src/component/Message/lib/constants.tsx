import React from 'react';
import type { TMessageIconInfo } from '../types';
import {
    InfoCircleFilled,
    CheckCircleFilled,
    CloseCircleFilled,
    ExclamationCircleFilled
} from '@ant-design/icons';

export const DEFAULT_DURATION = 2;

export const DEFAULT_ANIMATION_DURATION = 0.2;

export const ANIMATION_INIT_OFFSET = {
    up: '10px',
    down: '-10px',
    unset: 'unset',
};

export const messageIconInfo: TMessageIconInfo = {
    info: <InfoCircleFilled style={{ color: '#87C1FF' }} />,
    success: <CheckCircleFilled style={{ color: '#2BA471' }} />,
    error: <CloseCircleFilled style={{ color: '#F6685D' }} />,
    warning: <ExclamationCircleFilled style={{ color: '#E37318' }} />,
};
