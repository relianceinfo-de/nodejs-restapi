#!usr/env node

import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from "express"
import morgan from "morgan"
import bodyParser from "body-parser";
import studentRoutes from "./src/student/routes"
import { Dialect, Sequelize } from "sequelize";
// import config from "./config";
import { ObjectType } from "typescript";
import dotenv from "dotenv"
import bunyan, { LogLevel } from "bunyan"
import pjs from "./package.json"

dotenv.config()

// const field = process.env.NODE_ENV || "development"

// const configure = config.development // config.production
const app: Express = express()
const port = 3000;
// const log = configure.log()
const { name, version } = pjs
const getLogger = (serviceName: string, serviceVersion: string, level: LogLevel | undefined) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level})


// app.use(express.json())
const sequelize = new Sequelize(process.env.DATABASE_NAME!, process.env.DATABASE_USER!, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT! as Dialect,
    logging: (msg: any) => getLogger(name, version, 'debug').info(msg)
})

const connectToPostgres = () => {
    sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully")
    }).catch(error => {
        console.error("Unable to connect to the database: ", error)
        process.exit(1)
    })

    return sequelize
}

const postgresClient = connectToPostgres()
// configure.postgres.client = postgresClient

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Allow-Control-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");

        return res.status(200).json({})
    }

    next();
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

app.use("/api/v1/students", studentRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");

    // error.status(404);

    next(error);
});

app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(error.length || 500);

    res.json({
        error: {
            message: error.name
        }
    });
});

app.listen(port, () => console.log(`app listening on port ${port}`));