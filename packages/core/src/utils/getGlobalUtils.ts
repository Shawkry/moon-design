declare const global: typeof globalThis;

type GlobalType = typeof globalThis & {
    window?: typeof window;
    document?: Document;
};

/**
 * 安全地获取全局对象
 * 优先使用 window，其次是 globalThis，然后是 global，最后是 self
 */
export const getGlobal = (): GlobalType => {
    try {
        if (typeof window !== 'undefined') {
            return window;
        }

        if (typeof globalThis !== 'undefined') {
            return globalThis;
        }

        if (typeof global !== 'undefined') {
            return global;
        }

        if (typeof self !== 'undefined') {
            return self;
        }

        return {} as GlobalType;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
        return {} as GlobalType;
    }
};
