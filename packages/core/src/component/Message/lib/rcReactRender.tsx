import * as React from 'react';
import { render, unmount } from 'rc-util/es/React/render';

type UnmountType = () => Promise<void>;

type RenderType = (
    node: React.ReactElement,
    container: Element | DocumentFragment,
) => UnmountType;

export const rcReactRender: RenderType = (node, container) => {

    render(node, container);

    return () => {
        return unmount(container);
    };
};
