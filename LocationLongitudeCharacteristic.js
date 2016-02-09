var util = require('util');
var bleno = require('bleno');
var locationStation = require('./LocationStation');

function LocationLongitudeCharacteristic(locationStation) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330002',
    properties: ['read'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Get the current longitude of the device.'
      })
    ]
  });
  
  this.locationStation = locationStation
}

util.inherits(LocationLongitudeCharacteristic, bleno.Characteristic);

LocationLongitudeCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
      console.log("Sending longitude - " + JSON.stringify(this.locationStation.longitude));
    var data = new Buffer(8);
    data.writeDoubleBE(this.locationStation.longitude, 0);
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = LocationLongitudeCharacteristic;