import { app } from "./api";
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
