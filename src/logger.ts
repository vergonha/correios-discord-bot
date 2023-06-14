import winston, { format } from "winston";
import DiscordHook from "./utils/loggerDiscordWebhook.js";
import dotenv from 'dotenv'
const { combine, label, printf, timestamp } = format

dotenv.config()
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
        new DiscordHook({url: process.env.DISCORD_LOG_WEBHOOK})
    ]
});

export default logger
