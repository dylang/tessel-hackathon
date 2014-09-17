var request = require('request');


function put(data) {
    console.log('lets put something on firebase: ', data);

    request({
        uri: 'https://opower.firebaseio.com/tessel.json',
        method: 'PUT',
        body: JSON.stringify(data)
    }, function(err, res, body) {
        console.log('err', err);
        console.log('body', body);
        res.setEncoding('utf8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            var resultObject = JSON.parse(responseString);
            console.log('resultObject', resultObject);
        });

    });
}

module.exports = {
    put: put
};
