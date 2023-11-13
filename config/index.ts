import bunyan, { LogLevel } from "bunyan"
import { Dialect, Sequelize } from "sequelize"
import pjs from "./../package.json"

const { name, version } = pjs
const getLogger = (serviceName: string, serviceVersion: string, level: LogLevel | undefined) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level})

const dialect: Dialect = "postgres"

export default {
    development: {
        name,
        version,
        serviceTimeout: 30,
        postgres: {
            options: {
                host: 'localhost',
                port: 5432,
                database: 'dev',
                dialect: "postgres" as Dialect,
                username: 'postgres',
                password: 'Password@123',
                logging: (msg: any) => getLogger(name, version, 'debug').info(msg)
            },
            client: new Sequelize()
        },
        log: () => getLogger(name, version, 'debug')
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'info')
    },
    test: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'fatal')
    }
}