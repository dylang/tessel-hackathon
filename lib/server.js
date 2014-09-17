var request = require('request');


function go(action) {
    console.log('recording action: ', action);

    request({
        uri: 'http://192.168.1.249:3000/' + action + '.json',
        method: 'GET'
    }, function(err, res, body) {
        console.log('err', err);
        console.log('body', body);
        res.setEncoding('utf8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log('resultObject', responseString);
        });

    });
}

module.exports = go;
