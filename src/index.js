var express = require('express');


var app = express.Router();
var _dataAdapter = null;

app.get(
    '/memory-dump.json',
    function(request, response, next) {
        return _dataAdapter.getKeys()
            .then(function(keys) {
                return RSVP.all(keys.map(function(key) {
                    return _dataAdapter.get(key);
                }))
                    .then(function(values) {
                        var result = {};
                        values.forEach(function(value, index) {
                            result[keys[index]] = value;
                        });
                        response.send(result);
                    });
            });
    }
);


module.exports = function(dataAdapter) {
    _dataAdapter = dataAdapter;
    return app;
};
