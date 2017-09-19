'use strict';

module.exports = app => (...pairs) => {
    for(let i = 0; i < pairs.length; i=i+2) {
        app.set(pairs[i], pairs[i+1]);
    }
}