var tessel = require('tessel');

var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['D']);

ambient.on('ready', function() {
//    setInterval(function() {
//        ambient.getLightLevel(function(err, ldata) {
//            if (err) throw err;
//
//            ambient.getSoundLevel(function(err, sdata) {
//                if (err) throw err;
//                console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
//            });
//        })
//    }, 500); // The readings will happen every .5 seconds unless the trigger is hit

//    ambient.setLightTrigger(0.5);
//
//    // Set a light level trigger
//    // The trigger is a float between 0 and 1
//    ambient.on('light-trigger', function(data) {
//        console.log("Our light trigger was hit:", data);
//
//        // Clear the trigger so it stops firing
//        ambient.clearLightTrigger();
//        //After 1.5 seconds reset light trigger
//        setTimeout(function() {
//
//            ambient.setLightTrigger(0.5);
//
//        }, 1500);
//    });

    setInterval(function() {
        ambient.getLightLevel(function(err, ldata) {
            if (err) throw err;

            if (ldata < 0.1) {
                console.log("DARK");
            }

            if (ldata > 0.3) {
                console.log("LIGHT");
            }
        })
    }, 300); // The readings will happen every .5 seconds unless the trigger is hit

    // Set a sound level trigger
    // The trigger is a float between 0 and 1
    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
        // TODO send this also
        console.log("CLAP - BANG - SHOUT", data);

        // Clear it
        ambient.clearSoundTrigger();
        ambient.setSoundTrigger(0.1);
    });
});

ambient.on('error', function(err) {
    console.log('Ambient Error:', err);
});
