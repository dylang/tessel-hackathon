var tessel = require('tessel');

var accel = require('accel-mma84').use(tessel.port['A']);

var firebase = require('./firebase');

accel.on('ready', function () {
    // Stream accelerometer data
  accel.on('data', function (xyz) {
    console.log('x:', xyz[0].toFixed(2),
      'y:', xyz[1].toFixed(2),
      'z:', xyz[2].toFixed(2));


      firebase.put({accel: {x: xyz[0], y: xyz[1], z: xyz[2]}});

      ///db.set();
  });


});

accel.on('error', function(err){
  console.log('Accel Error:', err);
});
