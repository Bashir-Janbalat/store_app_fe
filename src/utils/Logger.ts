class Logger {
    private readonly isDev: boolean;

    constructor() {
        this.isDev = import.meta.env.MODE === 'development';
    }

    log(...args: unknown[]): void {
        if (this.isDev) {
            console.log('[LOG]', ...args);
        }
    }

    warn(...args: unknown[]): void {
        if (this.isDev) {
            console.warn('[WARN]', ...args);
        }
    }

    error(...args: unknown[]): void {
        if (this.isDev) {
            console.error('[ERROR]', ...args);
        }
    }

    info(...args: unknown[]): void {
        if (this.isDev) {
            console.info('[INFO]', ...args);
        }
    }
}

const logger = new Logger();
export default logger;
