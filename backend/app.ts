import express from "express";
import { configureCORS } from "./middleware/cors";
import magazineRoutes from "./routes/magazines";
import userRoutes from "./routes/users";
import subscriptionRoutes from "./routes/subscriptions";

const app = express();
app.use(express.json());

app.use(configureCORS);

app.use("/api/v1/magazines", magazineRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);

export default app;
