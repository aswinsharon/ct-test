import CustomError from '../errors/custom.error.js';
import { cartController } from './cart.controller.js';
import { apiSuccess } from '../api/success.api.js';
import { paymentController } from './payments.controller.js';
import { logger } from '../utils/logger.utils.js';
/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 */
export const post = async (request, response) => {

  // Deserialize the action and resource from the body
  const { action, resource } = request.body;

  if (!action || !resource) {
    throw new CustomError(400, 'Bad request - Missing body parameters.');
  }

  // Identify the type of resource in order to redirect
  // to the correct controller
  switch (resource?.typeId) {
    case 'cart':
      try {
        logger.info('Cart update extension executed');
        const data = await cartController(action, resource);

        if (data && data?.statusCode === 200) {
          apiSuccess(200, data.actions, response);
          return;
        }

        throw new CustomError(
          data ? data.statusCode : 400,
          JSON.stringify(data)
        );
      } catch (error) {
        if (error instanceof Error) {
          throw new CustomError(500, error.message);
        }
      }

      break;
    case 'payment': {
      logger.info('payment create extension executed');
      const data = await paymentController(action, resource);
      logger.info(JSON.stringify(data))
      if (data && data?.statusCode === 200) {
        apiSuccess(200, data.actions, response);
        return;
      }
      break;
    }
    case 'order':
      break;

    default:
      throw new CustomError(
        500,
        `Internal Server Error - Resource not recognized. Allowed values are 'cart', 'payments' or 'orders'.`
      );
  }
};
