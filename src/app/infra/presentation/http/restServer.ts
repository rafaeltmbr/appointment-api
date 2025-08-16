import "dotenv/config";
import express from "express";
require("express-async-errors");
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import * as swaggerDocument from "./swagger.json";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { appointmentRouter } from "../../../../appointment/infra/presentation/http/routes/appointmentRouter";
import { config } from "../../config";

const restServer = express();

restServer.use(cors());
restServer.use(express.json());
restServer.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
restServer.use("/appointment", appointmentRouter);
restServer.use(errorMiddleware);

restServer.listen(config.restPort, () => {
  console.log(`Rest server listening at http://localhost:${config.restPort}`);
});
