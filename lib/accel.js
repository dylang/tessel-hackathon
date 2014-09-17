var tessel = require('tessel');

var accel = require('accel-mma84').use(tessel.port['A']);

var firebase = require('./firebase');

accel.on('ready', function () {
    // Stream accelerometer data

    var prevZ = 0;

    accel.on('data', function (xyz) {
        var currZ = xyz[2];
        var flipped = (prevZ * currZ) < 0;

        // TODO Want to send a message when this is true
        console.log('Flipped: ' + flipped);
        prevZ = currZ;

        accel.getAcceleration(function (err, xyz) {

            var x = Math.abs(xyz[0].toFixed(2));
            var y = Math.abs(xyz[0].toFixed(2));
            var z = Math.abs(xyz[0].toFixed(2));
            var accel = 0.4;
            var moving = x > accel || y > accel || z > accel;

            // Want to send a message when shaking (stays at true while sending)
            console.log("Shake it: " + moving);
        });
    });


});

accel.on('error', function(err){
  console.log('Accel Error:', err);
});
