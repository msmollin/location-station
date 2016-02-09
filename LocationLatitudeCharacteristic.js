var util = require('util');
var bleno = require('bleno');
var locationStation = require('./LocationStation');

function LocationLatitudeCharacteristic(locationStation) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330001',
    properties: ['read'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Get the current latitude of the device.'
      })
    ]
  });
  
  this.locationStation = locationStation
}

util.inherits(LocationLatitudeCharacteristic, bleno.Characteristic);

LocationLatitudeCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    console.log("Sending latitude - " + JSON.stringify(this.locationStation.latitude));
    var data = new Buffer(8);
    data.writeDoubleBE(this.locationStation.latitude, 0);
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = LocationLatitudeCharacteristic;