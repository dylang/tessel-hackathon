var tessel = require('tessel');

var accel = require('accel-mma84').use(tessel.port['A']);

var server = require('./server');

accel.on('ready', function () {
    // Stream accelerometer data

    var prevZ = 0;

    var shakingCount = 0;
    var stillCount = 0;

    accel.on('data', function (xyz) {
        var currZ = xyz[2];
        var flipped = (prevZ * currZ) < 0;

        // TODO Want to send a message when this is true
        if (flipped) {
            console.log('>>>> F L I P I T <<<<');
            server('flip');
        }
        prevZ = currZ;

        accel.getAcceleration(function (err, xyz) {

            var x = Math.abs(xyz[0].toFixed(2));
            var y = Math.abs(xyz[0].toFixed(2));
            var z = Math.abs(xyz[0].toFixed(2));
            var MIN_MOVEMENT_FOR_SHAKE = 0.4;


            var isMoving = x > MIN_MOVEMENT_FOR_SHAKE || y > MIN_MOVEMENT_FOR_SHAKE || z > MIN_MOVEMENT_FOR_SHAKE;

            if (isMoving) {
                shakingCount++;
            } else {
                stillCount++;
            }

            if (stillCount > 4) {
                shakingCount = 0;
            }

            if (shakingCount > 1) {
                stillCount = 0;
            }

            if (shakingCount === 4){
                console.log('>>>> S H A K E I T <<<<');
                server('shake');
                shakingCount = 0;
                stillCount = 0;
            }

            // Want to send a message when shaking (stays at true while sending)
            console.log("Shake it: " + isMoving);
        });
    });


});

accel.on('error', function(err){
  console.log('Accel Error:', err);
});
