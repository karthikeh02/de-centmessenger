const isDev = __DEV__;

export const logger = {
  info: (...args: unknown[]) => {
    if (isDev) console.log('[De Messenger]', ...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn('[De Messenger]', ...args);
  },
  error: (...args: unknown[]) => {
    console.error('[De Messenger]', ...args);
  },
};
