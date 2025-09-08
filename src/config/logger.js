import winston from "winston";
import { envConfig } from "./env.config.js";

const nivelesPersonalizados = {
  levels: {
    grave: 0,
    warn: 1,
    info: 2,
    leve: 3,
  },
  colors: {
    grave: "red",
    warn: "yellow",
    info: "blue",
    leve: "green",
  },
};

winston.addColors(nivelesPersonalizados.colors);

const tansportConsole = new winston.transports.Console({
  level: "leve",
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

const transportFile = new winston.transports.File({
  level: "grave",
  filename: "./src/logs/error.log",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

export const logger = winston.createLogger({
  levels: nivelesPersonalizados.levels,
  transports: [transportFile],
});

if (envConfig.MODE === "DEV") {
  logger.add(tansportConsole);
}

export const middLog = (req, res, next) => {
  req.logger = logger;
  next();
};
