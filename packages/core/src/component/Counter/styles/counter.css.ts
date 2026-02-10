import { style, globalStyle, createVar } from '@vanilla-extract/css';

export const flexDirection = createVar();

export const counterWrap = style({
    display: 'inline-flex',
    flexDirection: flexDirection,
    gap: '6px',
    userSelect: 'none',
});

export const input = style({
    background: '#FDFDFD',
    boxSizing: 'border-box',
    border: '1px solid #E1E1E1',
    textAlign: 'center',
    outline: 'none',
    width: '52px',
    fontSize: '16px',
    lineHeight: '1.2',
    borderRadius: '5px',
    selectors: {
        '&:focus': {
            borderColor: '#87CEFA',
        },
        '&:read-only': {
            background: 'rgba(116, 116, 128, 0.08)',
        },
        '&:read-only:focus': {
            borderColor: '#E1E1E1',
        },
    },
});

export const icon = style({
    fontSize: '20px',
    cursor: 'pointer',
    selectors: {
        '&:hover': {
            color: '#87CEFA',
        },
    },
});

export const disabled = style({
    pointerEvents: 'none',
    cursor: 'not-allowed',
    color: 'rgba(204, 204, 204, 0.4)',
});

export const inputDisabled = style({
    cursor: 'not-allowed',
    color: 'rgba(51, 51, 51, 0.4)',
    backgroundColor: 'rgba(116, 116, 128, 0.08)',
});

globalStyle(`${counterWrap} input::-webkit-outer-spin-button`, {
    appearance: 'none',
});

globalStyle(`${counterWrap} input::-webkit-inner-spin-button`, {
    appearance: 'none',
});
