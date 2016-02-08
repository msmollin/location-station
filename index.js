var gpsd = require('node-gpsd');
var daemon = new gpsd.Daemon({
        program: '/usr/sbin/gpsd',
        device: '/dev/ttyAMA0',
        verbose: true
});

var lat, long;

daemon.start(function() {
    var listener = new gpsd.Listener();

    listener.on('TPV', function (tpv) {
        console.log(tpv.lat);
	this.lat = tpv.lat
	this.long = tpv.long
    });

    listener.connect(function() {
        listener.watch();
    });
});
