type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

const ANSI_COLORS = {
    reset: '\u001b[0m',
    bold: '\u001b[1m',
    dim: '\u001b[2m',
    white: '\u001b[37m',
    cyan: '\u001b[36m',
    yellow: '\u001b[33m',
    red: '\u001b[31m',
    magenta: '\u001b[35m',
    green: '\u001b[32m',
    gray: '\u001b[90m',
} as const;

const LEVEL_THEMES: Record<LogLevel, { label: string; labelColor: string; messageColor: string; }> = {
    log: {
        label: 'LOG',
        labelColor: `${ANSI_COLORS.bold}${ANSI_COLORS.green}`,
        messageColor: ANSI_COLORS.white,
    },
    info: {
        label: 'LOG',
        labelColor: `${ANSI_COLORS.bold}${ANSI_COLORS.cyan}`,
        messageColor: ANSI_COLORS.white,
    },
    warn: {
        label: 'WARN',
        labelColor: `${ANSI_COLORS.bold}${ANSI_COLORS.yellow}`,
        messageColor: ANSI_COLORS.yellow,
    },
    error: {
        label: 'ERROR',
        labelColor: `${ANSI_COLORS.bold}${ANSI_COLORS.red}`,
        messageColor: ANSI_COLORS.red,
    },
    debug: {
        label: 'DEBUG',
        labelColor: `${ANSI_COLORS.bold}${ANSI_COLORS.magenta}`,
        messageColor: ANSI_COLORS.magenta,
    },
};

export class Logger {

    constructor(private defaultContext = 'App') { }

    setDefaultContext(context: string): void {
        this.defaultContext = context;
    }

    log(message: unknown, contextOrMeta?: unknown, ...meta: unknown[]): void {
        this.print('log', message, contextOrMeta, ...meta);
    }

    info(message: unknown, contextOrMeta?: unknown, ...meta: unknown[]): void {
        this.print('info', message, contextOrMeta, ...meta);
    }

    warn(message: unknown, contextOrMeta?: unknown, ...meta: unknown[]): void {
        this.print('warn', message, contextOrMeta, ...meta);
    }

    error(message: unknown, contextOrMeta?: unknown, ...meta: unknown[]): void {
        this.print('error', message, contextOrMeta, ...meta);
    }

    debug(message: unknown, contextOrMeta?: unknown, ...meta: unknown[]): void {
        this.print('debug', message, contextOrMeta, ...meta);
    }

    private print(level: LogLevel, message: unknown, contextOrMeta?: unknown, ...meta: unknown[]): void {
        const timestamp = new Date().toLocaleString('en-US', { hour12: true });
        const pid = process.pid;
        const { context, extras } = this.extractContext(contextOrMeta, meta);
        const formattedMessage = this.stringify(message);
        const appendedMeta = extras
            .map((extra) => this.stringify(extra))
            .filter(Boolean)
            .join(' ');

        const contextLabel = context || this.defaultContext;
        const theme = LEVEL_THEMES[level];
        const header = `${ANSI_COLORS.dim}[ExpressJS] ${pid}  - ${timestamp}${ANSI_COLORS.reset}     ${this.colorize(theme.label, theme.labelColor)}`;
        const parts = [
            header,
            contextLabel ? this.colorize(`[${contextLabel}]`, ANSI_COLORS.cyan) : undefined,
            formattedMessage ? this.colorize(formattedMessage, theme.messageColor) : undefined,
            appendedMeta ? this.colorize(appendedMeta, ANSI_COLORS.gray) : undefined,
        ].filter(Boolean);

        const line = parts.join(' ');

        const writer = this.getWriter(level);
        writer(line);
    }

    private extractContext(contextOrMeta: unknown, meta: unknown[]): { context?: string; extras: unknown[]; } {
        if (typeof contextOrMeta === 'string') {
            return { context: contextOrMeta, extras: meta };
        }

        if (typeof contextOrMeta === 'undefined') {
            return { extras: meta };
        }

        return { extras: [contextOrMeta, ...meta] };
    }

    private stringify(value: unknown): string {
        if (value === undefined || value === null) return '';
        if (typeof value === 'string') return value;
        if (value instanceof Error) {
            return value.stack || value.message;
        }

        try {
            return JSON.stringify(value);
        } catch (error) {
            return String(value);
        }
    }

    private getWriter(level: LogLevel): (...args: unknown[]) => void {
        if (level === 'error') return console.error.bind(console);
        if (level === 'warn') return console.warn.bind(console);
        if (level === 'debug') return console.debug.bind(console);
        return console.log.bind(console);
    }

    private colorize(value: string, color: string): string {
        return `${color}${value}${ANSI_COLORS.reset}`;
    }
}
