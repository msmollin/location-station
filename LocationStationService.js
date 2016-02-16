var util = require('util');
var bleno = require('bleno');

var LocationLatitudeCharacteristic = require('./LocationLatitudeCharacteristic');
var LocationLongitudeCharacteristic = require('./LocationLongitudeCharacteristic');
var LocationNotifyCharacteristic = require('./LocationNotifyCharacteristic');

function LocationStationService(locationStation) {
  bleno.PrimaryService.call(this, {
    uuid: '13333333333333333333333333333337',
      characteristics: [
      	new LocationLongitudeCharacteristic(locationStation),
      	new LocationLatitudeCharacteristic(locationStation),
      	new LocationNotifyCharacteristic(locationStation)
      ]
  });
}

util.inherits(LocationStationService, bleno.PrimaryService);


module.exports = LocationStationService;