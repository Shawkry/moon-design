import { style, keyframes, createVar } from '@vanilla-extract/css';
import { SCREEN_BREAKPOINT } from '@/common/constants';

export const animationFadeOutDelay = createVar();

export const messageWarp = style({
    position: 'fixed',
    top: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
    margin: '0 auto',
    pointerEvents: 'none',
    zIndex: 9999,
    '@media': {
        [`screen and (max-width: ${SCREEN_BREAKPOINT})`]: {
            top: 'unset',
            bottom: '100px',
        },
    },
});

const fadeOut = keyframes({
    '0%': {
        opacity: 1,
    },
    '100%': {
        opacity: 0,
    },
});

const fadeIn = keyframes({
    '0%': {
        opacity: 0,
    },
    '100%': {
        opacity: 1,
        transform: 'translateY(0)',
    },
});

export const messageItem = style({
    padding: '12px 16px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(0, 0, 0,0.8)',
    color: '#ffffff',
    borderRadius: '5px',
    fontSize: '17px',
    fontWeight: 'normal',
    lineHeight: '1.2',
    pointerEvents: 'auto',
    transform: 'translateY(-10px)',
    boxShadow: `
        0px 6px 16px 0px rgba(0, 0, 0, 0.08),
        0px 3px 6px -4px rgba(0, 0, 0, 0.12),
        0px 9px 28px 8px rgba(0, 0, 0, 0.05)
        `,
    animation: `
     ${fadeIn} 0.2s ease-out forwards,
     ${fadeOut} 0.2s ease-out ${animationFadeOutDelay} forwards
    `,
    '@media': {
        [`screen and (max-width: ${SCREEN_BREAKPOINT})`]: {
            fontSize: '14px',
            fontWeight: 'normal',
            lineHeight: '1.2',
            transform: 'translateY(10px)',
        },
    },
});
