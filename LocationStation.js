var util = require('util');
var events = require('events');
var gpsd = require('node-gpsd');

function LocationStation() {
  events.EventEmitter.call(this);
  var self = this;
  var notificationCallback = null;
  
  var listener = new gpsd.Listener();

  listener.on('TPV', function (tpv) {
    self.latitude = tpv.lat
    self.longitude = tpv.lon
    if (self.notificationCallback) {
      var data = new Buffer(JSON.stringify(tpv))
      console.log('Sending notify callback value: ' + data)
      self.notificationCallback(data)
    }
  });

  listener.connect(function() {
    listener.watch();
  });
}

util.inherits(LocationStation, events.EventEmitter);

module.exports.LocationStation = LocationStation;