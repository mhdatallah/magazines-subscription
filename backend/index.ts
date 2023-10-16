import app from "./app";
import { configureCORS } from "./routes/cors";
import magazineRoutes from "./routes/magazines";
import userRoutes from "./routes/users";
import subscriptionRoutes from "./routes/subscriptions";

app.use(configureCORS);
app.use(magazineRoutes);
app.use(userRoutes);
app.use(subscriptionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
