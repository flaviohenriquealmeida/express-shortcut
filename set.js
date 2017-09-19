'use strict';

module.exports = (...pairs) => app => {
    for(let i = 0; i < pairs.length; i=i+2) {
        app.set(pairs[i], pairs[i+1]);
    }
}