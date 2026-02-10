import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
const backgroundColor = createVar();
const borderColor = createVar();
const color = createVar();
const sizeVars = {
    small: {
        fontSize: '12px',
        padding: '10px 16px',
    },
    medium: {
        fontSize: '15px',
        padding: '12px 24px',
    },
    large: {
        fontSize: '18px',
        padding: '14px 28px',
    },
};
export const status = {
    normal: style({
        vars: {
            [backgroundColor]: '#87CEFA',
            [borderColor]: '#87CEFA',
            [color]: '#333333',
        },
    }),
    success: style({
        vars: {
            [backgroundColor]: '#90EE90',
            [borderColor]: '#90EE90',
            [color]: '#333333',
        },
    }),
    warning: style({
        vars: {
            [backgroundColor]: '#F0E68C',
            [borderColor]: '#F0E68C',
            [color]: '#333333',
        },
    }),
    error: style({
        vars: {
            [backgroundColor]: '#C10000',
            [borderColor]: '#C10000',
            [color]: '#ffffff',
        },
    }),
};
export const disabled = style({});
export const buttonType = {
    primary: style({ border: '1px solid' }),
    default: style({
        vars: {
            [backgroundColor]: '#ffffff',
            [color]: '#333333',
            [borderColor]: '#d9d9d9',
        },
        border: '1px solid',
    }),
    dashed: style({
        vars: {
            [backgroundColor]: 'transparent',
            [color]: borderColor,
        },
        border: '1px dashed',
        backgroundColor: 'transparent !important',
    }),
    text: style({
        vars: {
            [backgroundColor]: 'transparent',
            [color]: borderColor,
        },
        border: '0px',
        backgroundColor: 'transparent !important',
    }),
};
export const ghost = style({
    vars: {
        [backgroundColor]: 'transparent',
        [color]: borderColor,
    },
});
const buttonBase = style({
    fontWeight: 700,
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    color: color,
    borderRadius: '2em',
    cursor: 'pointer',
    display: 'inline-block',
    selectors: {
        [`&${disabled}`]: {
            backgroundColor: '#CCCCCC',
            borderColor: '#CCCCCC',
            color: '#999999',
            cursor: 'not-allowed',
        },
        [`&${ghost}`]: {
            vars: {
                backgroundColor: 'transparent',
            },
        },
    },
});

export const buttonSize = recipe({
    base: buttonBase,
    variants: {
        size: sizeVars,
    },
});
