// HomeKit types required
var types = require("./types.js")
var exports = module.exports = {};

var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var lightState = hue.lightState

var execute = function(accessory,characteristic,value){ console.log("executed accessory: " + accessory + ", and characteristic: " + characteristic + ", with value: " +  value + "."); }

exports.accessory = {
  displayName: "Large Rear",
  username: "1B:2B:3C:4D:5E:FF",
  pincode: "031-45-154",
  services: [{
    sType: types.ACCESSORY_INFORMATION_STYPE, 
    characteristics: [{
    	cType: types.NAME_CTYPE, 
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "Large Rear",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255    
    },{
    	cType: types.MANUFACTURER_CTYPE, 
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "Philips",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255    
    },{
    	cType: types.MODEL_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "Hue",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255    
    },{
    	cType: types.SERIAL_NUMBER_CTYPE, 
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "A1S2NASF88EW",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255    
    },{
    	cType: types.IDENTIFY_CTYPE, 
    	onUpdate: null,
    	perms: ["pw"],
		format: "bool",
		initialValue: false,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Identify Accessory",
		designedMaxLength: 1    
    }]
  },{
    sType: types.LIGHTBULB_STYPE, 
    characteristics: [{
    	cType: types.NAME_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "Large Rear",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255   
    },{
    	cType: types.POWER_STATE_CTYPE,
    	onUpdate: function(value) { 
			hue.nupnpSearch(function(err, bridge) {
				if (err) throw err;
				api = new HueApi(bridge[0].ipaddress, "newdeveloper");
				
				state = lightState.create();
				if (value) {
					state.on();
				} else {
					state.off();
				}
				
				api.setLightState(1, state, function(err, result) {
					if (err) throw err;
				});
			});
		},
    	perms: ["pw","pr","ev"],
		format: "bool",
		initialValue: false,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Turn On the Light",
		designedMaxLength: 1    
    },{
    	cType: types.HUE_CTYPE,
    	onUpdate: function(value) { 
			hue.nupnpSearch(function(err, bridge) {
				if (err) throw err;
				api = new HueApi(bridge[0].ipaddress, "newdeveloper");
				
				state = lightState.create();
				state.hue(value);
				
				api.setLightState(1, state, function(err, result) {
					if (err) throw err;
				});
			});
		},
    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Adjust Hue of Light",
		designedMinValue: 0,
		designedMaxValue: 65536,
		designedMinStep: 1,
		unit: "arcdegrees"
    },{
    	cType: types.BRIGHTNESS_CTYPE,
    	onUpdate: function(value) { 
			hue.nupnpSearch(function(err, bridge) {
				if (err) throw err;
				api = new HueApi(bridge[0].ipaddress, "newdeveloper");
				
				state = lightState.create();
				state.bri(value);
				
				api.setLightState(1, state, function(err, result) {
					if (err) throw err;
				});
			});
		},
    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Adjust Brightness of Light",
		designedMinValue: 0,
		designedMaxValue: 255,
		designedMinStep: 1,
		unit: "%"
    },{
    	cType: types.SATURATION_CTYPE,
    	onUpdate: function(value) { 
			hue.nupnpSearch(function(err, bridge) {
				if (err) throw err;
				api = new HueApi(bridge[0].ipaddress, "newdeveloper");
				
				state = lightState.create();
				state.sat(value);
				
				api.setLightState(1, state, function(err, result) {
					if (err) throw err;
				});
			});
		},
    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Adjust Saturation of Light",
		designedMinValue: 0,
		designedMaxValue: 255,
		designedMinStep: 1,
		unit: "%"
    }]
  }]
}