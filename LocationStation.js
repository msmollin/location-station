var util = require('util');
var events = require('events');
var gpsd = require('node-gpsd');

function LocationStation() {
  events.EventEmitter.call(this);
  var self = this;
  
  var listener = new gpsd.Listener();

  listener.on('TPV', function (tpv) {
    self.latitude = tpv.lat
    self.longitude = tpv.lon
  });

  listener.connect(function() {
    listener.watch();
  });
}

util.inherits(LocationStation, events.EventEmitter);

module.exports.LocationStation = LocationStation;