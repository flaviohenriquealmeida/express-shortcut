'use strict';
const use = require('./use');
const set = require('./set');

module.exports = app => {
    
    return {
        use: use(app),
        set: set(app),
    }
}