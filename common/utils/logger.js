"use strict";

module.exports = handler => ({
    info: (message) => {
        const {
            user,
            resource,
            path,
            httpMethod,
            queryStringParameters,
            pathParameters,
            body
        } = handler.event;

        if (message.error && message.error.stack) {
            console.error(message.error.stack);
        } 

        console.info(JSON.stringify({
            user,
            resource,
            path,
            httpMethod,
            queryStringParameters,
            pathParameters,
            message
        }, null, 2));
    }
})
