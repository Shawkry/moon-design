import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useMessage } from './useMessage';
import { rcReactRender } from './lib/rcReactRender';
import { getGlobal } from '@/utils/getGlobalUtils';
import type {
    IMessageContextType,
    IMessage,
    IMessageAPI,
    IMessageAPIOptions,
    IUseMessageOptions
} from './types';

let globalMessageApi: IMessageAPI | null = null;
let globalSetConfig: ((config: IUseMessageOptions) => void) | null = null;
let isInitialized = false;

let globalMessageConfig: IUseMessageOptions = {};

const MessageContext = createContext<IMessageContextType>({
    messageApi: null,
    config: {},
    setConfig: () => null,
});

const MessageContainer = (): React.ReactElement => {
    const { config } = useContext(MessageContext);
    const [messageApi, contextHolder] = useMessage(config);

    useEffect(() => {
        if (messageApi) {
            globalMessageApi = messageApi;
            isInitialized = true;
        }
    }, [messageApi]);

    return contextHolder;
};

const MessageProvider = (): React.ReactElement => {
    const [config, setConfig] = useState<IUseMessageOptions>(globalMessageConfig);

    const value = useMemo(
        () => ({
            messageApi: globalMessageApi,
            config,
            setConfig: (newConfig: IUseMessageOptions) => {
                setConfig((prev) => ({ ...prev, ...newConfig }));
            },
        }),
        [config],
    );

    useEffect(() => {
        globalSetConfig = (newConfig: IUseMessageOptions) => {
            setConfig((prev) => ({ ...prev, ...newConfig }));
        };
    }, []);

    return (
        <MessageContext.Provider value={ value }>
            <MessageContainer />
        </MessageContext.Provider>
    );
};

const initialize = (): void => {
    if (isInitialized) return;

    const container = getGlobal().document.createDocumentFragment();
    rcReactRender(<MessageProvider />, container);
};

const Message: IMessage = {
    open: (options: IMessageAPIOptions): void => {
        if (typeof window === 'undefined') return;

        if (!isInitialized) {
            initialize();
            requestAnimationFrame(() => {
                if (globalMessageApi) {
                    globalMessageApi.open(options);
                }
            });
            return;
        }

        if (globalMessageApi) {
            globalMessageApi.open(options);
        }
    },
    info: (content: React.ReactNode, duration?: number): void => {
        Message.open({ type: 'info', content, duration });
    },
    error: (content: React.ReactNode, duration?: number): void => {
        Message.open({ type: 'error', content, duration });
    },
    warning: (content: React.ReactNode, duration?: number): void => {
        Message.open({ type: 'warning', content, duration });
    },
    success: (content: React.ReactNode, duration?: number): void => {
        Message.open({ type: 'success', content, duration });
    },
    config: (config: IUseMessageOptions): void => {
        globalMessageConfig = { ...config };

        if (globalSetConfig) {
            globalSetConfig(config);
        }
    },
    useMessage: useMessage,
};

export default Message;
