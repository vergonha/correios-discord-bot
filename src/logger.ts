import winston, { format } from "winston";
const { combine, label, printf, timestamp } = format

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: "debug",
    format: combine(label({ label: '✍️' }), timestamp({format:'DD-MM-YYYY HH:mm:ss'}), customFormat),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ]
});

export default logger
