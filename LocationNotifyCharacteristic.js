var util = require('util');
var bleno = require('bleno');
var locationStation = require('./LocationStation');

function LocationNotifyCharacteristic(locationStation) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330003',
    properties: ['notify'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Subscribe for location updates'
      })
    ]
  });
  
  this.locationStation = locationStation
}

util.inherits(LocationNotifyCharacteristic, bleno.Characteristic);

LocationNotifyCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('LocationNotifyCharacteristic - onSubscribe');

  this.locationStation.notificationCallback = updateValueCallback;
};

LocationNotifyCharacteristic.prototype.onUnsubscribe = function() {
  console.log('LocationNotifyCharacteristic - onUnsubscribe');

  this.locationStation.notificationCallback = null;
};

module.exports = LocationNotifyCharacteristic;