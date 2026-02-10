import { style, styleVariants, createVar } from '@vanilla-extract/css';

export const drawerAnimationDuration = createVar();
export const drawerWidth = createVar();
export const drawerHeight = createVar();
export const drawerZIndex = createVar();

export const drawer = style({
    position: 'fixed',
    backgroundColor: '#FFFFFF',
    zIndex: drawerZIndex,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: drawerWidth,
    height: drawerHeight,
    transition: `transform ${drawerAnimationDuration} ease-in-out`,
});

export const drawerHeader = style({
    position: 'sticky',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    alignItems: 'flex-start',
    flexShrink: 0,
    margin: '10px 12px',
    backgroundColor: '#FFFFFF',
    zIndex: `calc(${drawerZIndex} + 1)`,
    width: 'calc(100% - 12px - 12px)',
});

export const drawerTitle = style({
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '20px',
    fontWeight: 600,
    color: '#3D3D3D',
    textAlign: 'center',
    paddingLeft: '30px',
});

export const drawerContent = style({
    flex: 1,
    overflow: 'auto',
    position: 'relative',
    zIndex: drawerZIndex,
    padding: '0 20px',
});

export const closeDrawer = style({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-end',
    background: '#FFFFFF',
});

export const closeDrawerIcon = style({
    fontSize: '20px',
});

export const mask = style({
    position: 'fixed',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: `calc(${drawerZIndex} - 1)`,
});

export const drawerPosition = styleVariants({
    top: {
        top: 0,
        left: 0,
        right: 0,
        borderRadius: '0 0 12px 12px',
        transform: 'translateY(-100%)',
    },
    bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: '12px 12px 0 0',
        transform: 'translateY(100%)',
    },
    left: {
        top: 0,
        bottom: 0,
        left: 0,
        transform: 'translateX(-100%)',
    },
    right: {
        top: 0,
        bottom: 0,
        right: 0,
        transform: 'translateX(100%)',
    },
});

export const drawerOpen = style({
    transform: 'translate(0, 0)',
});
