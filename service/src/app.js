import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

// Import routes
import ServiceRoutes from './routes/service.route.js';

import { readConfiguration } from './utils/config.utils.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import CustomError from './errors/custom.error.js';

// Read env variables
readConfiguration();

// Create the express app
const app = express();
app.disable('x-powered-by');

// Define configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/service', ServiceRoutes);
app.use('*', () => {
  throw new CustomError(404, 'Path not found.');
});

// Global error handler
app.use(errorMiddleware);

export default app;
