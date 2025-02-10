// const get = () => {};

// const post = () => {};
import { logger } from '../utils/logger.utils.js';
export const paymentController = async (_resource) => {

    try {
        const updateActions = [];


        // Create the UpdateActions Object to return it to the client
        const updateAction = {
            action: 'setCustomField',
            name: 'customFieldSet',
            value: 'customValue from the connectApp'
        };

        updateActions.push(updateAction);
        logger.info(JSON.stringify(updateAction))
        return { statusCode: 200, actions: updateActions };
    } catch (error) {
        // Retry or handle the error
        // Create an error object
    }
};
