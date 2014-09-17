var tessel = require('tessel');

var accel = require('accel-mma84').use(tessel.port['A']);

var firebase = require('./firebase');

accel.on('ready', function () {
    // Stream accelerometer data

    accel.on('data', function (xyz) {
        accel.getAcceleration(function (err, xyz) {

            var x = Math.abs(xyz[0].toFixed(2));
            var y = Math.abs(xyz[0].toFixed(2));
            var z = Math.abs(xyz[0].toFixed(2));
            var accel = 0.4;
            var moving = x > accel || y > accel || z > accel;

            console.log("Moving: " + moving);
        });
    });


});

accel.on('error', function(err){
  console.log('Accel Error:', err);
});
