import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from "express"
import morgan from "morgan"
import bodyParser from "body-parser";
import studentRoutes from "./src/student/routes"

const app: Express = express()
const port = 3000;

// app.use(express.json())

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