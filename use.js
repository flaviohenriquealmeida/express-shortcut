'use strict';
/**
 * register multiples middlewares
 * @param {middlewares} express midlewares or arrays including path and middleware
 * @return {function} use function
 */
module.exports = app => (...middlewares) => 
    middlewares.forEach(middleware => 
        Array.isArray(middleware)
            ? app.use(...middleware)
            : app.use(middleware));
        