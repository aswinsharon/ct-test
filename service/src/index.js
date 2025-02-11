import 'dotenv/config';
// Import logger
import { logger } from './utils/logger.utils.js';
import app from './app.js';

const PORT = 8080;


// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;
