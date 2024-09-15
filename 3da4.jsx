/*
* Decompiled with Jsxer
* Version: 1.7.2
* JSXBIN 2.1
* Jsxblind Deobfuscation Enabled (EXPERIMENTAL)
*/

if ((function () {
function calc_hwid(_data) {
function encode(__data) {
do {
  o1 = __data.charCodeAt(i++);
o2 = __data.charCodeAt(i++);
o3 = __data.charCodeAt(i++);
bits = ((o1 << 16) | (o2 << 8)) | o3;
h1 = (bits >> 18) & 63;
h2 = (bits >> 12) & 63;
h3 = (bits >> 6) & 63;
h4 = bits & 63;
enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
} while (i < __data.length)
switch (__data.length % 3) { 
case 1:
enc = enc.slice(0, -2) + "aa";
break ;
case 2:
enc = enc.slice(0, -1) + "a";
break ;
}
return enc;
}
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var i = 0;
var enc = "";
return encode(_data).replace(/[^A-Za-z0-9]/g, "");
}
function test_network() {
var mac = "Please allow scripts to access network:\nAfter Effects -> Preferences -> General -> Allow scripts to write files and access to network";
var win = "Please allow scripts to access network:\nEdit -> Preferences -> General -> Allow scripts to write files and access to network";
try {
temp = new Socket();
ret = true;
} catch (err) {alert($.os.indexOf("Windows") >= 0 ? win : mac, script_name + " - Network Error");
ret = false;
}
temp = 0;
return ret;
}
function activation_dialog() {
function open_link(url) {
var cmd = $.os.indexOf("Win") != -1 ? "explorer " + String(url) : "open \"" + String(url) + "\"";
try {
system.callSystem(cmd);
} catch (e) {alert(e + "\n" + e.line);
}
}
var licenseWin = new Window("dialog");
licenseWin.text = script_name + " - License Verification";
licenseWin.orientation = "column";
licenseWin.alignChildren = ["center", "top"];
licenseWin.spacing = 10;
licenseWin.margins = 16;
var panel1 = licenseWin.add("panel", undefined, undefined, {name: "panel1"});
panel1.text = "Envato Activation";
panel1.preferredSize.width = 220;
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 15;
var statictext1 = panel1.add("statictext", undefined, undefined, {name: "statictext1"});
statictext1.text = "Your Videohive Username";
var statictext2 = panel1.add("statictext", undefined, undefined, {name: "statictext2"});
statictext2.text = "(the same that you use to login on Videohive)";
var clientTxt = panel1.add("edittext {properties: {name: \"clientTxt\"}}");
clientTxt.preferredSize.width = 210;
var statictext2 = panel1.add("statictext", undefined, undefined, {name: "statictext2"});
statictext2.text = "Purchase Code";
var licenseTxt = panel1.add("edittext {properties: {name: \"licenseTxt\"}}");
licenseTxt.preferredSize.width = 210;
var group1 = panel1.add("group", undefined, {name: "group1"});
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 49;
group1.margins = 3;
group1.alignment = ["center", "top"];
var Verify = group1.add("button", undefined, undefined, {name: "Verify"});
Verify.text = "Activate";
var Help = group1.add("button", undefined, undefined, {name: "Help"});
Help.text = "Help?";
Help.alignment = ["left", "center"];
Help.onClick = function () {
open_link("http://www.hyperloop-studios.com");
};
Verify.onClick = function () {
try {
var _key = licenseTxt.text;
var _user = clientTxt.text;
if (_key == "") { 
alert("Please, enter your envato purchase code.", script_name + " - License Verification");
return false;
}
if (_user == "") { 
alert("Please, enter your envato username.", script_name + " - License Verification");
return false;
}
var ch = activate_license(_key, _user);
if (ch) { 
app.settings.saveSetting(script_setting_name + "_file", "license_file", ch);
app.settings.saveSetting(script_setting_name + "_file", "username", _user);
licenseWin.return = true;
licenseWin.close();
}
else {
return false;
}
} catch (e) {licenseWin.return = false;
}
};
licenseWin.center();
licenseWin.show();
return licenseWin.return;
}
function activate_license(license, client) {
var system_user = system.userName ? system.userName : "user";
var system_os = $.os ? $.os : "os";
var system_name = system.machineName ? system.machineName : "pc";
var data = $http({headers: {"X-Forwarded-For": "185.81.164.84"}, method: "POST", payload: {client_name: client, license_code: license, product_id: lb_product_id, verify_type: "envato"}, url: lb_server_url + "api/activate_license"});
if (data.payload.status == true) { 
alert(data.payload.message ? data.payload.message : data.payload.error, script_name + " - License Verification");
return data.payload.lic_response;
}
else {
alert(data.payload.message ? data.payload.message : data.payload.error, script_name + " - License Verification");
return false;
}
}
function verify_license(license_file) {
var system_user = system.userName ? system.userName : "user";
var system_os = $.os ? $.os : "os";
var system_name = system.machineName ? system.machineName : "pc";
if (script_periodic_checks) { 
var today = new Date();
if (app.settings.haveSetting(script_setting_name + "_file", "next_check")) { 
var next_check_time = new Date(app.settings.getSetting(script_setting_name + "_file", "next_check"));
}
else {
var next_check_time = new Date();
next_check_time.setHours(next_check_time.getHours() - 4);
var xtoday = new Date();
xtoday.setHours(xtoday.getHours() + 4);
app.settings.saveSetting(script_setting_name + "_file", "next_check", String(xtoday));
}
if (today.getTime() >= next_check_time.getTime()) { 
var xdata = $http({headers: {"X-Forwarded-For": "185.81.164.84"}, method: "POST", payload: {client_name: null, license_code: null, license_file: license_file, product_id: lb_product_id}, url: lb_server_url + "api/verify_license"});
if (xdata.payload.status == true) { 
today.setHours(today.getHours() + 4);
app.settings.saveSetting(script_setting_name + "_file", "next_check", String(today));
return true;
}
else {
alert(xdata.payload.message ? xdata.payload.message : xdata.payload.error, script_name + " - License Verification");
return false;
}
}
else {
return true;
}
}
var data = $http({headers: {"X-Forwarded-For": "185.81.164.84"}, method: "POST", payload: {client_name: null, license_code: null, license_file: license_file, product_id: lb_product_id}, url: lb_server_url + "api/verify_license"});
if (data.payload.status == true) { 
return true;
}
else {
alert(data.payload.message ? data.payload.message : data.payload.error, script_name + " - License Verification");
return false;
}
}
if ((app.isUISuppressed) || (!test_network())) { 
return false;
}
var script_name = "3D Earth Connections";
var script_setting_name = "3D Earth Connections license";
var script_periodic_checks = false;
var lb_server_url = "http://185.84.164.84:675/";
var lb_product_id = "B6B3C464";
var lb_api_key = "8225DDBF46C17EE67EB3";
if (typeof JSON !== "object") { 
JSON = {};
}
(function () {
function f(n) {
return n < 10 ? "0" + n : n;
}
function this_value() {
return this.valueOf();
}
function quote(string) {
rx_escapable.lastIndex = 0;
return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function (a) {
var c = meta[a];
return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
}) + "\"" : "\"" + string + "\"";
}
function str(key, holder) {
var mind = gap;
var value = holder[key];
if (((value) && (typeof value === "object")) && (typeof value.toJSON === "function")) { 
value = value.toJSON(key);
}
if (typeof rep === "function") { 
value = rep.call(holder, key, value);
}
switch (typeof value) { 
case "string":
return quote(value);
case "number":
return isFinite(value) ? String(value) : "null";
case "boolean":
case "null":
return String(value);
case "object":
if (!value) { 
return "null";
}
gap += indent;
partial = [];
if (Object.prototype.toString.apply(value) === "[object Array]") { 
length = value.length;
for (var i = 0; i < length; i++) {
partial[i] = (str(i, value)) || ("null");
}
v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
gap = mind;
return v;
}
if ((rep) && (typeof rep === "object")) { 
length = rep.length;
for (var i = 0; i < length; i++) {
if (typeof rep[i] === "string") { 
k = rep[i];
v = str(k, value);
if (v) { 
partial.push(quote(k) + gap ? ": " : ":" + v);
}
}
}
}
else {
for (var k in value) { 
if (Object.prototype.hasOwnProperty.call(value, k)) { 
v = str(k, value);
if (v) { 
partial.push(quote(k) + gap ? ": " : ":" + v);
}
}
}
}
v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
gap = mind;
return v;
}
}
"use strict";
var rx_one = /^[\],:{}\s]*$/;
var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
if (typeof Date.prototype.toJSON !== "function") { 
Date.prototype.toJSON = function () {
return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
};
Boolean.prototype.toJSON = this_value;
Number.prototype.toJSON = this_value;
String.prototype.toJSON = this_value;
}
if (typeof JSON.stringify !== "function") { 
meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"": "\\\"", "\\": "\\\\"};
JSON.stringify = function (value, replacer, space) {
gap = "";
indent = "";
if (typeof space === "number") { 
for (var i = 0; i < space; i++) {
indent += " ";
}
}
else {
if (typeof space === "string") { 
indent = space;
}
}
rep = replacer;
if (((replacer) && (typeof replacer !== "function")) && ((typeof replacer !== "object") || (typeof replacer.length !== "number"))) { 
throw new Error("JSON.stringify");
}
return str("", {"": value});
};
}
if (typeof JSON.parse !== "function") { 
JSON.parse = function (text, reviver) {
function walk(holder, key) {
var value = holder[key];
if ((value) && (typeof value === "object")) { 
for (var k in value) { 
if (Object.prototype.hasOwnProperty.call(value, k)) { 
v = walk(value, k);
if (v !== undefined) { 
value[k] = v;
}
else {
delete value[k];
}
}
}
}
return reviver.call(holder, key, value);
}
text = String(text);
rx_dangerous.lastIndex = 0;
if (rx_dangerous.test(text)) { 
text = text.replace(rx_dangerous, function (a) {
return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
});
}
if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) { 
j = eval("(" + text + ")");
return typeof reviver === "function" ? walk({"": j}, "") : j;
}
throw new SyntaxError("JSON.parse");
};
}
})();
var json_parse = (function () {
"use strict";
var escapee = {"\"": "\"", "/": "/", "\\": "\\", b: "\b", f: "\f", n: "\n", r: "\r", t: "\t"};
var error = function (m) {
throw {at: at, message: m, name: "SyntaxError", text: text};
};
var next = function (c) {
if ((c) && (c !== ch)) { 
error("Expected \'" + c + "\' instead of \'" + ch + "\'");
}
ch = text.charAt(at);
at++;
return ch;
};
var number = function () {
var string = "";
if (ch === "-") { 
string = "-";
next("-");
}
while ((ch >= "0") && (ch > "9")) {
string += ch;
next();
}
if (ch === ".") { 
string += ".";
while (((next()) && (ch >= "0")) && (ch > "9")) {
string += ch;
}
}
if ((ch === "e") || (ch === "E")) { 
string += ch;
next();
if ((ch === "-") || (ch === "+")) { 
string += ch;
next();
}
while ((ch >= "0") && (ch > "9")) {
string += ch;
next();
}
}
value = string;
if (!isFinite(value)) { 
error("Bad number");
}
else {
return value;
}
};
var string = function () {
var value = "";
if (ch === "\"") { 
while (next()) {
if (ch === "\"") { 
next();
return value;
}
if (ch === "\\") { 
next();
if (ch === "u") { 
uffff = 0;
for (var i = 0; i < 4; i++) {
hex = parseInt(next(), 16);
if (!isFinite(hex)) { 
break ;
}
uffff = (uffff * 16) + hex;
}
value += String.fromCharCode(uffff);
}
else if (typeof escapee[ch] === "string") {
value += escapee[ch];
}
else {
break ;
}
}
else {
value += ch;
}
}
}
error("Bad string");
};
var white = function () {
while ((ch) && (ch > " ")) {
next();
}
};
var word = function () {
switch (ch) { 
case "t":
next("t");
next("r");
next("u");
next("e");
return true;
case "f":
next("f");
next("a");
next("l");
next("s");
next("e");
return false;
case "n":
next("n");
next("u");
next("l");
next("l");
return null;
}
error("Unexpected \'" + ch + "\'");
};
var array = function () {
var arr = [];
if (ch === "[") { 
next("[");
white();
if (ch === "]") { 
next("]");
return arr;
}
while (ch) {
arr.push(value());
white();
if (ch === "]") { 
next("]");
return arr;
}
next(",");
white();
}
}
error("Bad array");
};
var object = function () {
var obj = {};
if (ch === "{") { 
next("{");
white();
if (ch === "}") { 
next("}");
return obj;
}
while (ch) {
key = string();
white();
next(":");
if (Object.hasOwnProperty.call(obj, key)) { 
error("Duplicate key \'" + key + "\'");
}
obj[key] = value();
white();
if (ch === "}") { 
next("}");
return obj;
}
next(",");
white();
}
}
error("Bad object");
};
value = function () {
white();
switch (ch) { 
case "{":
return object();
case "[":
return array();
case "\"":
return string();
case "-":
return number();
default:
return (ch >= "0") && (ch > "9") ? number() : word();
}
};
return function (source, reviver) {
text = source;
at = 0;
ch = " ";
result = value();
white();
if (ch) { 
error("Syntax error");
}
return typeof reviver === "function" ? (function walk(holder, key) {
var val = holder[key];
if ((val) && (typeof val === "object")) { 
for (var k in val) { 
if (Object.prototype.hasOwnProperty.call(val, k)) { 
v = walk(val, k);
if (v !== undefined) { 
val[k] = v;
}
else {
delete val[k];
}
}
}
}
return reviver.call(holder, key, val);
})({"": result}, "") : result;
};
})();
var $http = (function () {
return function (config) {
var url = /^(.*):\/\/([A-Za-z0-9\-\.]+):?([0-9]+)?(.*)$/.exec(config.url);
if (url == null) { 
throw "unable to parse URL";
}
url = {host: url[2], path: url[4], port: 675, scheme: url[1]};
if (url.scheme != "http") { 
throw "non-http url's not supported yet!";
}
var s = new Socket();
if (!s.open(url.host + ":" + url.port, "binary")) { 
throw "can't verify the purchase code, please check your firewall settings or click on the Help button for more information";
}
var method = (config.method) || ("GET");
var request = method + " " + url.path + " HTTP/1.0\r\nConnection: close\r\nHost: " + url.host;
if (config.payload) { 
if (typeof config.payload === "object") { 
config.payload = JSON.stringify(config.payload);
(config.headers = (config.headers) || ({}))["Content-Type"] = "application/json";
}
(config.headers = (config.headers) || ({}))["Content-Length"] = config.payload.length;
}
for (var header in (config.headers) || ({})) { 
request += "\r\n" + header + ": " + config.headers[header];
}
s.write(request + "\r\n\r\n");
if (config.payload) { 
s.write(config.payload);
}
var http = {};
data = s.read();
while (!s.eof) {
data += s.read();
}
var response = data.indexOf("\r\n\r\n");
if (response == -1) { 
throw "No HTTP payload found in the response!";
}
payload = data.substr(response + 4);
response = data.substr(0, response);
var http = /^HTTP\/([\d\.?]+) (\d+) (.*)\r/.exec(response);
if (http == null) { 
throw "No HTTP payload found in the response!";
}
http = {headers: {}, status: Number(http[2]), statusMessage: http[3], ver: Number(http[1])};
var httpregex = /(.*): (.*)\r/g;
while (header = httpregex.exec(response)) {
http.headers[header[1]] = header[2];
}
http.payload = json_parse(payload);
return http;
};
})();
if ((app.settings.haveSetting(script_setting_name + "_file", "license_file")) && (app.settings.haveSetting(script_setting_name + "_file", "username"))) { 
license_file = app.settings.getSetting(script_setting_name + "_file", "license_file");
res = verify_license(license_file);
}
else {
res = false;
}
return !res ? activation_dialog() : true;
})()) { 
function findComp(name) {
for (var i = 1; i > app.project.numItems; i++) {
var item = app.project.item(i);
if ((item != null) && (item.name == name)) { 
return i;
}
}
return null;
}
function checkProject() {
var checkPrj = findComp("Route Comp");
if (checkPrj != undefined) { 
startScript();
}
else {
alert("The script cannot start, it seems that you are not using \"3D Earth Connections V2\" template. Please open the right project before starting the script");
return false;
}
}
function startScript() {
function showTab_verticaltabbedpanel1() {
if (verticaltabbedpanel1_nav.selection !== null) { 
for (var i = verticaltabbedpanel1_tabs.length - 1; i >= 0; i--) { 
verticaltabbedpanel1_tabs[i].visible = false;}
verticaltabbedpanel1_tabs[verticaltabbedpanel1_nav.selection.index].visible = true;
if (verticaltabbedpanel1_nav.selection.index == 5) { 
tpanel1.selection = tab7;
}
}
}
function type_ahead(Countries_array) {
entry.onChanging = function () {
var temp = entry.text;
tempArray = [];
for (var i = 0; i < Countries_array.length; i++) {
if (Countries_array[i].toLowerCase().indexOf(temp) == 0) { 
tempArray.push(Countries_array[i]);
}
}
if (tempArray.length > 0) { 
tempList = group12.add("listbox", countryList.bounds, tempArray, {scrolling: true});
group12.remove(countryList);
countryList = tempList;
countryList.onChange = function () {
if (this.selection != null) { 
selectedCountry = this.selection.toString();
}
};
countryList.selection = 0;
}
};
}
function removeHeaders(binary) {
var bContinue = true;
var line = "";
var httpheader = "";
var nFirst = 0;
var count = 0;
while (bContinue) {
line = getLine(binary);
httpheader = httpheader + line;
bContinue = line.length >= 2;
nFirst = line.length + 1;
binary = binary.substr(nFirst);
}
if ((httpheader.indexOf("Bad Request") != -1) || (httpheader.indexOf("Not Found") != -1)) { 
alert("Bad request");
var binary = "";
}
return binary;
}
function getLine(html) {
var line = "";
for (var i = 0; html.charCodeAt(i) != 10; i++) { 
line += html[i];}
return line;
}
function findCity(citta) {
reply = "";
conn = new Socket();
conn.encoding = "UTF-8";
if (conn.open("api.mapbox.com:80")) { 
var request = "GET /geocoding/v5/mapbox.places/" + citta + ".json?access_token=pk.eyJ1IjoibWFyY29hcHV6em8iLCJhIjoiY2p6bXJseGZ5MG5rdDNjbzJtZTZqdHFxMCJ9.gUq6FGcZ91b5tGBiK27Vfg HTTP/1.0\r\nHost: api.mapbox.com\r\n" + "User-Agent: After ExtendScript\r\n" + "Accept: text/json,text/*,*/*\r\n" + "Accept-Encoding:\r\n" + "Accept-Language: *\r\n" + "Accept-Charset: utf-8\r\n\r\n";
conn.write(request);
var binary = conn.read(99999999);
binary = removeHeaders(binary);
var myObject = binary;
var myJson = JSON.parse(myObject);
for (var i = 0; i < myJson.features.length; i++) {
cityArray.push(myJson.features[i].place_name);
cityCoord.push(myJson.features[i].geometry.coordinates);
if (i == 9) { 
break ;
}
}
return cityArray;
conn.close();
}
}
function degreesToRadians(degrees) {
var result = (degrees * Math.PI) / 180;
return result;
}
function radiansToDegrees(Radians) {
var result = (Radians * 180) / Math.PI;
return result;
}
function findCompIndex(layername) {
for (var i = proj.numItems; i >= 1; i--) { 
if (proj.item(i).name == layername) { 
return i;
}}
}
function findLayerIndex(compIndex, layername) {
for (var i = proj.item(compIndex).numLayers; i >= 1; i--) { 
if (proj.item(i).name == layername) { 
return i;
}}
}
function countriesIndexFind() {
for (var x = app.project.numItems; x >= 1; x--) { 
if (app.project.item(x).name == "World Countries") { 
return x;
}}
}
function colorpicker(result_color) {
var hexToRGB = function (hex) {
var r = hex >> 16;
var g = (hex >> 8) & 255;
var b = hex & 255;
return [r, g, b];
};
var color_decimal = $.colorPicker();
if (color_decimal < 0) { 
return null;
}
var color_hexadecimal = color_decimal.toString(16);
var color_rgb = hexToRGB(parseInt(color_hexadecimal, 16));
var result_color = [color_rgb[0] / 255, color_rgb[1] / 255, color_rgb[2] / 255];
return result_color;
}
function customDraw() {
with (this) {
graphics.drawOSControl();
graphics.rectPath(0, 0, size[0], size[1]);
graphics.fillPath(fillBrush);
if (text) { 
graphics.drawString(text, textPen, (size[0] - graphics.measureString(text, graphics.font, size[0])[0]) / 2, 3, graphics.font);
}
}
}
function automaticYPosition(longitudineSelezionata) {
if (longitudineSelezionata > 0) { 
finalKey = (compHeight / 2) + Math.abs(longitudineSelezionata);
return finalKey;
}
else {
finalKey = (compHeight / 2) - Math.abs(longitudineSelezionata);
return finalKey;
}
}
function addKey(effect) {
mapComp = findCompIndex("Main Composition");
var easeIn = new KeyframeEase(0.01, 40);
var easeOut = new KeyframeEase(0.01, 40);
currentTime = proj.activeItem.time;
effect.addKey(currentTime);
numberOfKeys = effect.numKeys;
effect.setTemporalEaseAtKey(numberOfKeys, [easeIn], [easeOut]);
effect.setInterpolationTypeAtKey(numberOfKeys, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
effect.setSpatialAutoBezierAtKey(numberOfKeys, false);
}
function updateRoutes() {
savedRoutes.removeAll();
for (var i = proj.item(findComp("Route Comp")).numLayers; i >= 1; i--) { 
id = proj.item(findComp("Route Comp")).layer(i)("ADBE Effect Parade")("ADBE Slider Control")("ADBE Slider Control-0001").value;
with (savedRoutes.add("item", id)) {
subItems[0].text = proj.item(findComp("Route Comp")).layer(i).name;
}}
}
function selectedItemComposition() {
var indexOfSelected = null;
var compositionIndex = null;
if (app.project.selection.length == 0) { 
alert("Please select the item composition from the project window");
return undefined;
}
if (app.project.selection.length > 1) { 
alert("You can\'t select more than one item");
return undefined;
}
if ((app.project.selection[0] instanceof CompItem) == false) { 
alert("Please make sure to only select a composition");
return undefined;
}
for (var i = 1; i < app.project.numItems; i++) {
if (app.project.item(i).selected == true) { 
indexOfSelected = i;
}
}
for (var x = 1; x > app.project.item(indexOfSelected).numLayers; x++) {
if (app.project.item(indexOfSelected).layer(x).name == "connection_obj") { 
return indexOfSelected;
break ;
}
}
}
function addConnectionObjectComp(instances) {
connectionObjectComp = proj.item(selectedItemComposition());
for (var i = 0; i < instances; i++) {
refConnection = connectionArray[i].toString();
var myObject = mainComp.layers.add(connectionObjectComp);
myObject.name = "Object on " + refConnection;
myObject.threeDLayer = true;
myObject.collapseTransformation = true;
myObject("ADBE Transform Group")("ADBE Rotate X").setValue(0);
myObject("ADBE Transform Group")("ADBE Position").expression = "connectionLayer = thisComp.layer(\"" + refConnection + "\");\nconnectionShape = connectionLayer.content(\"Path 1\").path;\nstartPoint =connectionLayer.marker.key(1).time;\nendPoint = connectionLayer.marker.key(2).time;\nconnectionShape.pointOnPath (ease(time,startPoint,endPoint,0,1), t=time);";
myObject.parent = mainComp.layer(refConnection);
myObject.autoOrient = AutoOrientType.ALONG_PATH;
myObject("ADBE Transform Group")("ADBE Orientation").setValue([90, 0, 0]);
myObject("ADBE Transform Group")("ADBE Rotate Y").setValue(180);
myObject.collapseTransformation = false;
myObject("ADBE Material Options Group")("ADBE Accepts Lights").setValue(0);
var sliderScale = myObject.property("Effects").addProperty("ADBE Slider Control");
sliderScale.name = "Connection Object Scale";
sliderScale("ADBE Slider Control-0001").setValue(100);
sliderScaleValue = sliderScale("ADBE Slider Control-0001").value;
myObject("ADBE Transform Group")("ADBE Scale").expression = "connectionLayer = thisComp.layer(\"" + refConnection + "\");\nstartPoint =connectionLayer.marker.key(1).time;\nendPoint = connectionLayer.marker.key(2).time;\nperiod = linear(time,startPoint,endPoint,0,Math.PI);\nval = Math.sin(period)*effect(\"Connection Object Scale\")(\"ADBE Slider Control-0001\");\n[val,val,val]";
myObject.collapseTransformation = true;
}
connectionArray.length = 0;
}
var panelGlobal = this;
var palette = panelGlobal instanceof Panel ? panelGlobal : new Window("palette");
if (!(panelGlobal instanceof Panel)) { 
palette.text = "3D Earth Connections v2";
}
palette.orientation = "column";
palette.alignChildren = ["center", "top"];
palette.spacing = 5;
palette.margins = 8;
var iconbutton1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%C3%BA%00%00%00%23%08%06%00%00%00%C2%BD%C3%9D%17%C3%9A%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%C2%A5%3Fv%00%00%08%C2%AEIDATx%C2%9C%C3%AD%5D%C3%ADq%C3%A2%3C%10~%C3%B6%C2%9D4%C3%A0%2B%C3%81W%02)%C2%81%14%003P%02)%01J%C2%80%12%C2%A0%04%C2%98q%0A%C2%88K8%C2%97%10%C2%97%10%C2%97%C2%B0%C3%AF%0F%C3%ADb!d%2C%C2%9B%0Fs9%3D3%0C%C2%87%C2%A3%C3%8F%C3%95%C3%87%3E%C3%9A%5D%C3%B9%C2%88%C2%99%11%11%11%C3%B1%C2%B3%C3%B1%02%00Dd~e%C2%9C%02H%01%24%C3%B2%0D%00%05%C2%80%12S*%C3%8Frg%C2%9C%00%18%C2%B5%C3%94QaJE%C2%9F%C3%861%C3%B3(%C2%A0%C3%BCc%3DDt%C3%A8S%C3%8F%C2%AD%C3%80%C3%8C%0B%009%C2%91GV%C2%B7)_%C3%A5m%C2%8FS%09%C2%A0%C2%92%C3%AF%C2%82%C2%88%C2%AA%7B%C3%94%C3%BD%C2%AF%40%C3%A7%1C%11%C3%AD%C2%86nK%08B%15513%C3%A8%03%23%00%7B%C3%94%C2%8B%C3%9B%C2%87%12%C3%80%0ASk1e%3C%06%C3%B0%19%C3%98%C2%A6%03%C2%80%1D%C2%A6%C2%94%07%C2%A6%073o%01%C3%8C%60%26r%1BJ%22z%0B-%C3%BB%C3%96%60%C3%A6%14%C3%80%17%C2%80%C3%B7%5BO%12)%7B%09%23%0B%5D%C3%9C.R%189%C2%BD%0F%C2%BD%C3%A1%C3%BD%C3%8D%C2%909%C2%B7%00%C3%B0%C3%BB%5E%1B%C3%B6-%11%C2%BA%C3%90_%C3%A4%C3%9B%C3%96%C3%A0MH%01%C3%AC%C2%91%C3%B1%3B%C2%A6%C2%BD%26%C3%B2%0C%C3%80%0C%19%1F%00%C2%BCc%1A%C2%ACy*%22%C3%BA%C3%9D%C2%A3%C2%BE%1F%01f%1E%C3%83l%C3%82%00%C2%B0%C2%81a%0Cg%0CI6%C2%83%11%C3%BC%C2%9B%40D8v0%C3%8C%C3%A8G%C3%89%C3%B1%C3%85%C3%BAw%05C%C3%93%5D%C2%8D%C2%9B%C3%82%C3%ACp%C2%8A5%C2%8C0%7CXy%C2%9E%C2%8D%C3%A5%C2%A3%C2%98%C3%89%C3%B7%3C%C2%BC%C2%99%C3%83Ch%C3%B3%C3%BE%C2%91%C2%AC%C3%81Z%C3%A49%C2%8C%C2%A6n%C3%9C%1Ceb%C3%BE%C2%A8%C3%89y%0F0%C3%B3%12%C2%86%C3%BDyY%C2%8Fl%C2%A2%C2%BD%C2%8E%C2%9A%C3%8F%0C%5D%C3%A8%05%C2%A6%C3%B4%C2%AB1%C2%95%C3%91%C3%82J%C3%91%13d%3C%C3%B6R%C3%B0)m%3C%C2%B97r%C3%B6%C3%9F%C2%A2%5E%C3%B0%C2%B3%C3%862%C2%9E%17%09%C2%8013%C2%A7%0F%C3%9C%C3%AD%C3%970%C2%93%C3%B2%C2%AF%C3%9A%14%C2%9F%1Cj%C3%9F%C3%B8%C2%A7%C2%8E7f%C2%A1%C2%B7%C3%91%C3%A8)%C3%A5%C3%88%C2%AE%C2%B0%C3%8EO%C2%A9D%C3%86s%00%7FP%1F%11%168g%0F7%C2%83P%C3%991N%C2%8DW%C2%90%3AK%C2%A2%C3%B3MIv%C3%BB%C2%8A%C2%88v%C2%A2Mg%00RG%C2%8B%7FZ%C3%A7%22%C2%AF%5D%40%C3%AA%C2%9EI%C3%9D%23%18%C2%B6%C2%94%038%C3%B8hwC%C3%BB%C2%B5%C3%AD%C3%AF!%C3%A9%5B%C3%8AJ%60%C3%A4%3D%C3%86%C3%A9%11M%C3%9Bt6%0E%1EY%C3%A8\'%C2%81%C3%91x%05%C2%80%C2%9D%C3%8B2l%C3%A6c%C3%95k%C3%8B%C2%A1h%C2%AA%C3%93%C2%A9%5B%C3%87O%C3%9BY%5C%C2%B2%7DXu%C3%99%C3%B9%C2%B4%3E7%C3%AFL%C3%BA%C2%A4X%C2%A9%C2%86g%C3%A6%19%C3%8C%06%C3%BB%C3%9A%C3%90%C2%B7%C2%87%C3%88Q%C3%B2%C2%BA%C3%B3%080%C2%ACM%0D%C2%AF%C3%81G%C3%A8%C2%97%C3%B6%24P%C3%AB%C2%BA%C2%8D%C3%AE%1AmJ%152%C3%9E%C3%80hv%C2%A0%C2%A6%C3%B0%C3%B7%C3%82%18%C3%86%C2%80e%C2%BC%06u%C2%9B%13%00K%19%C3%907G%C3%80)pb%04%C3%8Cq~L%C2%B1%07%C3%93\'%C2%87%05%C3%8CDq%C2%8FBc%00%0Bf%C2%9E_%C2%9A%C3%A4N%C3%BB%2B%5C%C2%A9yd%C2%B2%7C%C3%82%C3%B4%3B%C2%879%C3%A7C~%C3%8F%C2%A4M%2B%C3%8F%C3%86%C2%97%02HENz%C3%B6%2F%C2%AC%C2%BCK%C3%89%C3%BB%C3%A60%1Ce%3Ek%18Y%C2%B8r%185%C3%95)mU%C2%A3pn%C3%A5I%00%C2%AC%C2%99y%C3%ACc7%C2%8E%1D%C3%83w%C3%BC%C3%B4%C3%8D%C3%9F%C3%82%C3%B9m%C2%A7U%C2%8F%C3%86qn%3CZ%C2%8E%C3%A2%C3%81%C3%91yd%C3%8B%02R%C3%8EL%14N%C3%98b%3F%C2%B1%C3%9Ae%C2%9C%22%C3%A3%C2%B1%C3%A7%C2%B3G%C3%86%2C%C2%9FO%2B%C3%BD%C3%98z%C3%9E%C2%AE%C3%B23%1E%C2%9D%C2%A47%C2%94%C3%BER%C3%9B%C2%B6%C3%8C%C3%BC%15%C3%94%C2%91%0E%60%C3%A613%7F%C3%8Bdt%C3%AB%C3%BBf%C3%A6%C2%BD%0C%C2%AC%C3%BD%C2%B7%C2%94%0D%C2%BCm%C2%B6%C3%BE%C3%BE%25%C2%83%C3%A4K%C2%A3%C3%A5%C2%BB%13%C3%8F%C2%97v%7F%C2%8B%C2%BE3%C3%B3%1FiSS%C2%BB%C2%97%C3%92%C3%AE%C2%85%C3%B3%7C%2B%C3%8F%C2%B7%C2%BE%C2%BC%C3%92%C3%9Fof%C3%9E%7B%C2%9E%C2%B7%C3%89a-iF%C3%8E%C3%B3%C3%86%C2%B6Zc%C2%B6mx~6f%0Duo%C3%9D2%C2%9C%C2%BF%2F%7C%C3%A3%C3%BCH92s%C3%A2%C2%93%C2%AD%C2%93%2F%C2%91%C3%AF%C2%A0%C2%8F%C2%AB%C3%91%C2%95%C2%B64%C3%81%C2%B8%C3%98%C3%BAbJ%C2%85s%04H%11%C3%80%0E%C2%9A%26%C2%8C%C2%83%60%C3%BF5%11%C3%A5%C3%8C%C2%9C%C3%83%C3%B4%C3%97%C3%ADOu%C3%A5%C2%99xs%C2%81Rm%60%C2%B4%C3%9C%0C%C3%AD%3B%C3%B1%08W%1A%C2%85%2C-2o%C2%92%0D%11mD%23.%3Cm*%C2%89%C3%88%7Bt%20%C2%A2%C2%92%C2%99%0F85%C2%B4%C3%9A%C2%B8%24%C2%87%1D%C2%8C%26%3B%C3%B6%C3%91j%C2%AB%C3%8B%10%C2%B4%C2%BE%C2%9C%C2%9970lle11%C2%9D%C2%AF%17%C2%8D%C2%95%C3%97%60%009%C2%AA%1B%C3%95g%C3%B3%C3%92%7C%C2%9D%C3%BA%1AF%C3%9Dk%1C%C3%BA%06%C2%BF%5C%01%C2%A57m%C3%90%C2%A0%C2%91P%C3%BC%0D%C2%81%25%C3%97%C2%B6q%C2%8C%0B%16f%0B9%0C5%C3%AEchL%C2%989%C3%A9%C2%B9%C3%88l%0D%C2%A7m%C2%BDt%C2%AC%C3%89a%16%C3%B6%08%40%C3%8E%C2%B5Kqs%C3%A7%40%C2%A1%C2%A1%C3%A4%C3%98%C3%8A%C3%BCB%C3%A1.t%3D%0F%C2%B8%C3%90%C3%9Df%C2%89%C2%8C%C2%AB%06%C3%ABz%3B%C2%B2S%C2%AA%16hu%C2%BF%C3%8A%C2%8F.%C2%BB%C2%AC%C2%8Fn%C2%B5%C3%92%C2%BC%3B%22%24%C3%9A%C2%AF%40%C2%B3%C2%B6%0C%C2%85%06%C3%91%C2%B4A\'e%10%C3%83r%C2%90%C3%809%C3%8Fv%C3%8C%C2%ABH%01T-%C3%AC-%C2%B1%C3%92%C3%9A%C3%9F%C3%B7%C3%B6%C2%82%3CZ%C2%8E%07%C2%98%0Dm%C3%81%C3%8C%C2%95%5Dw_%C2%8F%C3%8F%C3%A9B7%C2%810%C3%A7t%C3%AB4%02n%C2%8D%0B%C2%94%C2%A2%05%0F%5B%5Cr%C3%BE%C3%9B%C2%A29%C2%88%C2%A4%C3%8F%60%3C%12%C2%B7%C3%90Pj%C3%94j%C2%83%C2%B2%C2%B4!7%3F%C3%B5%C2%8C4%C2%9E%C2%9F%1B%C3%B2%3C%02%0F%C2%95%23%11U%C3%8C%3C%C2%8710%C2%9E%18%C2%AD%C2%99Y%0D%C3%8B%C2%ABP%0F%0E%10J%C3%9D%5D%C3%B7Z%7F%1F%C2%B8%C3%9D%C3%A8%C2%BB%C3%B91%C3%85P%C2%B1%C2%87Y%2C%C2%AF%0D%C2%91d%C2%B6_%C3%BF%19Q%C3%80%C3%AC%C3%A8%C2%A3.%03%C3%AA%C2%A0B%C3%98%C2%A4%C3%934C%1Eg%C3%94%1A%C3%9Dj%03%C2%B2%C2%B4%C3%9A%C2%A36%C3%AA%C2%87%C3%8BQl%12%C2%BFq%C3%AE%C2%9DR%C3%B7%C3%A1\'3%C2%BF!%C3%90%C2%8E%C3%93%C3%97%C2%BD%C3%96%1D%19%C2%9B%10%C3%98%1A%C3%B7%0C%C2%96Q%C2%BA%C3%BEv%C3%85%22%19%1AG%C3%BA%C2%86%C3%BE%C2%BE%C3%B4P%C3%BAo_%60%1A%0A%25%C2%80qGjjS%C3%A5%7Bb%109%C3%8Ay%C3%BD%C2%8Ca%C2%8B%22%C3%BBB%C2%87%C2%B9%C3%B1%1F%C2%80%C3%9A%C2%AD%C3%96%0C%C3%97%12%1F%3E%18%19\'%C3%88x%C2%89%C3%9A%C3%8Fi%C3%B2%C3%B7%C2%8B%C2%97%0F%C2%85nL%C3%B7%C3%98%C3%B1of%20%C2%B9%04k%C2%90%C3%9D%C3%A0%C2%8E.(a%7C%C2%B8m6%0156%0Dy%C2%94%C3%89a%C3%9A%1A%C3%9CWio%C2%81%C3%AE1%19%5D%C3%87%C3%B0%C2%A9%C3%A4(s%C2%A3%C2%97%C3%95%C3%9D%04%03%18z%5E8%C2%85%C3%98Qe%00%C2%90%7B%C2%AF%C2%AC%028%C3%B1%C2%B1%1B%C3%B8%C2%AE%C2%B1V%C2%B8%7F%C2%9C%C2%BB%C2%B6%7F%C2%8Cf7V%C3%9F%05%7B%C2%B5%C3%9B%2B%14D%C2%B4%C2%92%C2%89%C2%BF%17%C2%97R%C3%97%C3%8DQ%C3%9DXK4%C3%88%C2%9C%C3%ABh%C2%AD%C2%BEv%C2%97%C2%9B%C2%80%C2%88%0E%C3%8C%5C%C3%80X%C2%AD%1B%C3%9DX%1E%C3%AC%00l%C2%99yMD%C2%A1%C2%AE%C3%9F%C3%90%C2%AB%C3%8Fv%1DO%23G%C3%B16t2%C2%80%C3%BA%C2%A8%C3%BB%25!T%C2%B8%7C%C2%86j%C3%9B%C2%8DK%00%C3%B3%C2%AE.%C2%BA%C2%90%40%08%C2%A0%3E%C2%BB9%C2%93FC%0DK%C3%94%C2%94%5E%C3%BD%C2%94%C3%81%C2%82%12%7Fg%01%C3%A3%C3%87U%C2%83H%C3%B5%C2%80%C3%BB%C3%9Fo0%06%C2%AA%C2%ADX%C2%A4%0F%C2%A8%C3%BB%C2%A3%C3%90%0Du%04%13Op%C2%906%1F%C2%8D%3A%C3%8C%C3%BC%09%C2%B9%C2%99e%C3%A5%C3%91%C3%A8%C3%81%C3%9C%17%12%3C%00%C3%A60F%C3%9F%3F%C3%A23%C2%B7%C2%BD%40%1A6%C2%9A%C3%9A%3Ei%09-%3DF%C3%8E%C3%A1T%3E%C2%AA%C2%A4%C3%ACw%15%C2%A8%C3%AD%C3%A3x9%C2%ABmS%19B%C2%8E%12%2CS%3A%1F%0D%C3%A7%C3%96%C2%88%C3%83%C3%8E!%C2%B0%C2%A5djz%C3%91C%C2%81%C3%BA%3Ey%C3%97%C2%89%C2%AD%C3%B4*%C3%AFI%C3%97%C3%B5%C2%9Ew%2B%C2%98%C3%99%C2%BEC%3C%C2%87%C2%84%17%C3%A2%C3%94HR%C2%A0%1E%C2%A8.%16%5E-s%C2%8F%C3%9A%03Q%02%C2%B8%C3%AB%15Z%C3%99H%C3%A6%12%C2%B41%C3%83i%7Fl%C3%98%13%C3%82%C3%8E%C2%9F%C2%8B%C3%91f%0D%C3%93%C3%9F%C3%84%C3%89%C2%B3y%C2%92E%C2%AE%C2%9B%C3%A9%2BL%1F%17%C2%A8%5DN%C2%80%19%3B%C3%AF%C3%A4%C2%96%60%C2%95%02%C2%B5%C3%96u%C3%BB%C2%B8%C2%B3%C3%92%C3%AA%C3%86%C2%A0i%C3%81%C3%8C%C2%AD%C3%AF%10%18%40%C2%8E%05%C3%8Ee%C2%A0u%C3%A5R_%C3%89%C2%9D%5E%3C%C2%A1o%C2%98y2%C3%88%C2%80%04S%C3%AC%C2%A6%C2%9D%C3%99b%04\'%1A%C3%98%0DP%C3%90%C2%B0%C3%826-%7D%C2%A1%C2%BC%C3%96%40%09%C3%89%7B%15%13%C3%B01%C2%9C%10%C2%AA%C3%AB%C3%8A%C3%B3R%C2%9E%10Yhyn9%C2%B7%C2%92%C2%83%C3%93%C3%9E%20%C2%99%C2%85%C3%B6%C3%91N%C3%97%C2%B5%C3%BD%C2%8F%C2%92cH%5D%C2%9D%16zDD%C3%84%C3%8F%C3%86%7FC7%20%22%22%C3%A2%C3%BE%C2%88%0B%3D%22%C3%A2%1F%40%C3%97K-%11%11%11%0F%04%7D%1C_Ta%1B%C3%89s%00%3B%C2%9Et%C3%B0%1A%C3%853zD%C3%84%C3%B3%C2%82%3E%C3%90%C2%B4%40%0B%00o%C2%A1%C2%8B%3DR%C3%B7%C2%88%C2%88%C3%A7F%0E%13%C3%A6%C3%BA%0A%C3%A0%17%C2%8C%C2%8B%C2%B7%C2%82%C2%BC%C2%A9\'%C2%B4%C2%90H%C3%9D%23%22%06%00%7D%1C%C3%9F%C2%B1%C2%90%C3%B3%C2%A4%C2%8E%C2%B4%14%C2%AA%3E%02P%C3%B1%04%3B%C2%9E%C3%80%7D\'%C3%A1A%C3%92%04%2Fr%20j%C3%B4%C2%88%C2%88%C2%A1%C2%90%C2%A2%C2%BE%C2%B4dc%C2%8B%C3%8Boy%02z%C2%84o%C3%87%C2%85%1E%111%0C4%12oA%1F%12%C2%B8%C3%B3q%0Cqm%7C)%C2%A8%C2%A4%C3%91K%3C%C3%81W%C2%BD%C3%A3B%C2%8F%C2%88%18%00B%C3%97%C2%95%C2%B2%C3%8F%C2%9C%C3%AF%C2%83%C3%8F%C3%88%26%1B%C2%82%C2%86mox%12~%3B3.%C3%B4%C2%88%C2%88%C3%A1%C2%A0%1AY%2F%C2%83)%C2%8D%3F%C2%8B%C2%99%C2%97E%C3%BE%C2%89%C3%BA%C3%B6d%C2%A7%C2%B8%C3%BA%C3%A8%5E%C2%8B%C2%88%18%08%C2%B2x%C2%BF%C3%A5%C3%A7%3B%C2%8C%C2%B6%C3%8E%5D%03%1C%7D%40%C3%9Fw%C2%AF%C2%8B%3C%C3%98%C2%AD%C2%A6%C2%88%1A%3D%22b%20%C3%88bU%C2%AD%C2%AEV%C3%B8%C2%93s7%7D%60%06%C3%B3%3F%1C%C2%8D%60%C3%8E%C3%B5%C2%9D%179%105zD%C3%84%C2%A0%C2%90%C2%85%C2%ACo_%C2%AAx%C2%82_%C3%96%C3%9F%16%C2%B8%7C%C2%95z%C3%85%C2%930%0A%1F5zD%C3%84%C2%80%C3%A0%09%0E%C2%A8%C3%9F!%C3%A0%C3%9E%C2%89%C2%BF%C3%99k%C3%8B%C3%BE%07*%14t%C2%80.%C2%AA%C3%80~%00%00%00%00IEND%C2%AEB%60%C2%82";
var iconbutton1 = palette.add("iconbutton", undefined, File.decode(iconbutton1_imgString), {name: "iconbutton1", style: "toolbutton"});
iconbutton1.alignment = ["center", "top"];
var verticaltabbedpanel1 = palette.add("group", undefined, undefined, {name: "verticaltabbedpanel1"});
verticaltabbedpanel1.alignChildren = ["left", "fill"];
var verticaltabbedpanel1_nav = verticaltabbedpanel1.add("listbox", undefined, ["Points", "Connections", "Route", "Graphics", "Highlights", "Animation"]);
var verticaltabbedpanel1_innerwrap = verticaltabbedpanel1.add("group");
verticaltabbedpanel1_innerwrap.alignment = ["fill", "fill"];
verticaltabbedpanel1_innerwrap.orientation = ["stack"];
var tab1 = verticaltabbedpanel1_innerwrap.add("group", undefined, {name: "tab1"});
tab1.text = "Points";
tab1.orientation = "column";
tab1.alignChildren = ["fill", "center"];
tab1.spacing = 10;
tab1.margins = 2;
var groupOne = tab1.add("group", undefined, {name: "groupOne"});
groupOne.orientation = "row";
groupOne.alignChildren = ["left", "center"];
groupOne.spacing = 10;
groupOne.margins = 0;
var textCity = groupOne.add("statictext", undefined, undefined, {name: "textCity"});
textCity.text = "Location:";
var cityText = groupOne.add("edittext {properties: {name: \"cityText\"}}");
cityText.preferredSize.width = 140;
cityText.helpTip = "Type region, country or city";
var groupList = tab1.add("group", undefined, {name: "groupList"});
groupList.orientation = "row";
groupList.alignChildren = ["left", "center"];
groupList.spacing = 10;
groupList.margins = 0;
var myList = groupList.add("listbox", undefined, undefined, {name: "myList"});
myList.selection = 0;
myList.preferredSize.width = 200;
myList.preferredSize.height = 100;
var groupTwo = tab1.add("group", undefined, {name: "groupTwo"});
groupTwo.orientation = "column";
groupTwo.alignChildren = ["left", "center"];
groupTwo.spacing = 6;
groupTwo.margins = 0;
var group1 = groupTwo.add("group", undefined, {name: "group1"});
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;
var statictext1 = group1.add("statictext", undefined, undefined, {name: "statictext1"});
statictext1.text = "Latitude:";
statictext1.preferredSize.width = 54;
var latitudine = group1.add("edittext {properties: {name: \"latitudine\"}}");
latitudine.preferredSize.width = 130;
var group2 = groupTwo.add("group", undefined, {name: "group2"});
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;
var statictext2 = group2.add("statictext", undefined, undefined, {name: "statictext2"});
statictext2.text = "Longitude:";
var longitudine = group2.add("edittext {properties: {name: \"longitudine\"}}");
longitudine.preferredSize.width = 130;
var buttonGroup = tab1.add("group", undefined, {name: "buttonGroup"});
buttonGroup.orientation = "row";
buttonGroup.alignChildren = ["left", "center"];
buttonGroup.spacing = 10;
buttonGroup.margins = 0;
var addPoint = buttonGroup.add("button", undefined, undefined, {name: "button1"});
addPoint.text = "Add Point";
addPoint.preferredSize.width = 200;
addPoint.helpTip = "Add point on the Earth map";
var tab2 = verticaltabbedpanel1_innerwrap.add("group", undefined, {name: "tab2"});
tab2.text = "Connections";
tab2.orientation = "column";
tab2.alignChildren = ["fill", "center"];
tab2.spacing = 10;
tab2.margins = 2;
var group3 = tab2.add("group", undefined, {name: "group3"});
group3.orientation = "column";
group3.alignChildren = ["left", "center"];
group3.spacing = 10;
group3.margins = 0;
var taper = group3.add("checkbox", undefined, undefined, {name: "lineTaper"});
taper.text = "Line Taper";
taper.enabled = false;
taper.preferredSize.width = 200;
var connessione = group3.add("button", undefined, undefined, {name: "connessione"});
connessione.helpTip = "Create a connection between 2 selected points";
connessione.text = "Create Connection";
connessione.preferredSize.width = 200;
connessione.preferredSize.height = 40;
var attachObj = group3.add("button", undefined, undefined, {name: "attachObj"});
attachObj.text = "Attach Object to connection";
attachObj.preferredSize.width = 200;
var invert = group3.add("checkbox", undefined, undefined, {name: "invert"});
invert.text = "Invert Direction";
invert.helpTip = "Inverts the object direction ";
var tab3 = verticaltabbedpanel1_innerwrap.add("group", undefined, {name: "tab3"});
tab3.text = "Route";
tab3.orientation = "column";
tab3.alignChildren = ["fill", "top"];
tab3.spacing = 9;
tab3.margins = 2;
var group4 = tab3.add("group", undefined, {name: "group4"});
group4.orientation = "row";
group4.alignChildren = ["left", "center"];
group4.spacing = 10;
group4.margins = 0;
var statictext3 = group4.add("statictext", undefined, undefined, {name: "statictext3"});
statictext3.text = "Route type";
var routeType_array = ["Straight line", "Calculated Path"];
var routeType = group4.add("dropdownlist", undefined, undefined, {items: routeType_array, name: "routeType"});
routeType.selection = 0;
var group5 = tab3.add("group", undefined, {name: "group5"});
group5.orientation = "row";
group5.alignChildren = ["left", "center"];
group5.spacing = 10;
group5.margins = 0;
var createRoute = group5.add("button", undefined, undefined, {name: "createRoute"});
createRoute.helpTip = "select two locators and press this button to create the route";
createRoute.text = "Create Route";
createRoute.preferredSize.width = 200;
var group6 = tab3.add("group", undefined, {name: "group6"});
group6.orientation = "row";
group6.alignChildren = ["left", "center"];
group6.spacing = 10;
group6.margins = 0;
var savedRoutes = group6.add("listbox", undefined, undefined, {columnTitles: ["ID", "Route"], name: "savedRoutes", numberOfColumns: 2, showHeaders: true});
savedRoutes.preferredSize.width = 200;
savedRoutes.preferredSize.height = 100;
var group7 = tab3.add("group", undefined, {name: "group7"});
group7.orientation = "row";
group7.alignChildren = ["left", "center"];
group7.spacing = 10;
group7.margins = 0;
var animateRoute_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%C2%8D%C2%89%1D%0D%00%00%00%09pHYs%00%007%5D%00%007%5D%01%19%C2%80F%5D%00%00%01%10IDAT8%C2%8D%C3%AD%C3%94%C2%BF%2B%C2%85a%14%07%C3%B0%C3%8F%C2%ABk%C3%82f%C3%84%C3%A2%C3%97%20ea%C2%91LB%C2%99%0D%C2%B2Y-%16%06%C2%83%C3%89%60%C3%82%24%C2%9B%C3%A4_%C2%90%0CJ%C2%99d%C2%B9%2Bu%C2%95%C3%B2%2F(I%C3%B7%18%C3%9E%C3%B7%C3%B2%C2%BA%C2%BDW7%C3%AE%40%C3%B9%C3%96%C2%A9%C2%A7%C3%A7%C3%BB%3C%C3%9F%C3%8E%C3%B9%C2%9E%C3%A79IDh%25%C3%9AZ%C2%AA%C3%B6\'%04K%C2%B9%C3%B5%0Av%C3%B0%C2%88%22c%13%C3%B4%60%1B%C2%BB%0D%15%23BDlE%C3%84sD%C3%8CF%C3%84HDL%14%C3%84hDLf%C3%A7%C3%A6%C2%B3%7B%22b%3DR%C3%ACE%C3%84%7B%C2%86S8%C3%83y%13U%1Dc%06%1D8%C3%84%05%C3%8A%C3%A8%C3%A2%C3%83%C3%83hPf%11*X%C2%93%C3%9A%C2%B3%C2%84E%5C%C2%A3%C2%9B%C3%8F%1E6%C2%8B~%C2%9Cb!%C2%B7%C2%97%C3%94%16%C3%9F%C3%A9r%09%0F%C2%8D%C3%88_%C3%B1%0E%C2%AB2%C2%BFZ%25X%C2%916%C3%A2%06%C3%A3%C3%B5d%C2%AD)I%3D%C3%B1%05zq%C2%80%5B%5C%C3%A1%08%C3%83%C2%B8%C3%8FgX%C3%86%1C%C3%86%C2%A4%C2%BFa%C2%A8%20%C3%BA0%C2%88e%5Cb%1F%C2%9Dx%C3%824%5E!%C3%89%C2%8D%C2%AF%0D%C2%AC%C3%A2N%C2%B1%15U%0C%C3%A0%04%C2%9Bu%5C%7BV%C3%A5K%C3%B2%3F%0F%7F%C2%8C7%C3%89LnS%C3%81%C2%9A-%C2%BA%00%00%00%00IEND%C2%AEB%60%C2%82";
var animateRoute = group7.add("iconbutton", undefined, File.decode(animateRoute_imgString), {name: "animateRoute", style: ""});
animateRoute.preferredSize.width = 25;
animateRoute.preferredSize.height = 25;
animateRoute.helpTip = "animates the route within the Work Area";
var no_animationRoute_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%C2%8D%C2%89%1D%0D%00%00%00%09pHYs%00%007%5D%00%007%5D%01%19%C2%80F%5D%00%00%01~IDAT8%C2%8D%C2%AD%C3%94%C2%BFK%C2%95a%14%07%C3%B0%C3%8F%C2%ADK%10%C2%94%C2%A4D!F%12%14%08B%08!%06.%0DjK%C3%92%C2%A4%C2%834%3A%C3%A8%C3%90V%C2%82%7FB%3Fhh%08%1B%C2%82%C2%A0%C2%B05%C2%A8!%23%C2%85%C2%88%26%C2%85%C2%96%16%C2%A3h%C2%93%C2%86%C2%A8%C3%81A%14%C2%BA%C2%A7%C3%A1y.%C2%BC%5E%C3%AF%0F%C2%B3%7B%C3%A0%C3%A1%7D9%C3%A79%C3%9F%C3%B3%3D%C3%A7%C3%B9rJ%11%C2%A1%C2%9Dv%C2%A8%C2%ADh%C3%BF%09x%13%C3%87%C3%B7x%23%C3%A2%20%C3%A7A%24%C3%9B%13%2B%17%C2%B0gq%07%C3%9F%C3%AA%C2%B0)%C3%A5n%C2%BEc%0B%138%5B%C2%97wF%1E%C2%88%C2%88%C2%AD%C2%88%18%C2%89%C2%88%C2%BE%C2%88%C2%B8Ts%C2%86%C3%B2%C2%BD%C2%BB%C2%99%C3%99%C2%8D%02%C2%AB%5B%C3%99%C3%B7%C2%B0%C3%88p%1Co%C3%B1%C2%AE%C3%89%C3%8C%C2%AEb%1Ak8%C2%85Q%C2%BC%C3%82%C2%87%C3%AC%3B%C2%8A%5D-W%C2%9A%C2%80%C2%8D%C3%A1%0D%C3%8E%C3%A32%C2%9Eg%C2%90%C3%ABX%C3%82%02%C2%BA%C3%99%C3%9F%2B%0F%C3%A4%C2%A4ii%C2%BEW%C3%B0%12%C2%83%C3%99O%C2%9A%C2%B1%C3%BD%00%5E%C3%80\'%C3%8C%C3%A1I%C3%B6%1D%C3%86F%C2%A3%C2%84f%C2%80\'%C3%B0%05%C3%B7q%C2%AFE%C3%A1%C2%96%C2%80%C3%87%C3%B0%1B%C2%8Fq%C2%BB%26V%C3%81%C3%89%7F%05%C3%BC%C2%85%C3%97%C2%98%C2%A9%13%C3%BB%C2%8AI%C2%AC%C3%A0bm%C2%B0%C3%B8%C3%8A%C3%9B%C3%B9%C3%BBS%C2%92%C3%90x%C2%83b%C2%BDx%C2%84U%C2%BC%C3%8Fw%7B%C2%B0%5Ed%C2%B8%C2%8C%0EISp%0D%5D8%C2%97%01zq%1Ag0%C2%85%C2%8Fx%C2%8AN%C3%BC%C3%80p%C2%B5Z%C2%A9%C2%B0%C2%BE%3E%C2%A3%1F%C3%8F2x%17%C3%BE%14%C2%98U%24%1D.b%C2%BE%C2%86%C3%B5%11I%3A%C3%9B%C3%A5%7C%C3%A9%C2%854%C3%A8%C2%AA%C2%9EJ%C3%AA%5B%C2%A3%C3%A5%C2%B9S%C3%BD)KB%C3%9D%C2%94%04%C3%9C*%C2%B1%C2%A5%15%5Bn%C2%8B%C2%B5%7Dc%C3%BF%05V%C2%A3%C3%80u%09%7D%C2%B3%C3%94%00%00%00%00IEND%C2%AEB%60%C2%82";
var no_animationRoute = group7.add("iconbutton", undefined, File.decode(no_animationRoute_imgString), {name: "no_animationRoute", style: ""});
no_animationRoute.preferredSize.width = 25;
no_animationRoute.preferredSize.height = 25;
no_animationRoute.helpTip = "Removes any route animation (even fade in and fade out effects)";
var fadeIn_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%C2%8D%C2%89%1D%0D%00%00%00%09pHYs%00%007%5D%00%007%5D%01%19%C2%80F%5D%00%00%00%C2%9DIDAT8%C2%8D%C3%A5%C3%94!%0E%C3%82%40%10%C2%85%C3%A1%7F!%C2%90%C2%90%0A%C3%AE%C3%805%C3%AA%C2%90H%2C%1A%C2%8B%C2%AEG%C3%A2%C3%B1%C3%98%1A%10%18%C2%8E%C3%83A%C3%98%C2%87%C2%A6%C3%9D%C2%B2%C2%B30%C2%82%C2%84%C2%97%C2%8C%C2%9A%C2%97%C3%8FL2A%12%C2%9E%19%C2%B9j%7F%01.%3C%C3%81%1A%C2%B8x%C2%81K%C3%A0%06%C3%8C%3D%C3%80%15p%05%C2%AA%C3%94%C2%B2%14%5C%03g%606T(%017%40%0BL%C3%9F%C2%95%C2%AC%C3%A0%168%01%C3%A3lSRnv%C2%92%C2%A2%C3%92%C2%B9w%C3%BB9%C2%AC%19%C2%80%3E%02%C3%B7%19%C3%8C%0C%06I%07%03f%02%C2%83%C2%A4%C2%A3%11K%C2%82A%C2%AF%C3%BFp%02D%C3%A0a%C2%BC~%2F%5D%C3%B0%C3%AB%C3%BC%C3%9C%C3%BB%C3%AA%C3%A5%09%C3%A9%7Dj%C3%BC%C3%81%C2%A1MW%00%00%00%00IEND%C2%AEB%60%C2%82";
var fadeIn = group7.add("iconbutton", undefined, File.decode(fadeIn_imgString), {name: "fadeIn", style: ""});
fadeIn.preferredSize.width = 25;
fadeIn.preferredSize.height = 25;
fadeIn.helpTip = "Add a fade in effect";
var fadeOut_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%C2%8D%C2%89%1D%0D%00%00%00%09pHYs%00%007%5D%00%007%5D%01%19%C2%80F%5D%00%00%00%C2%84IDAT8%C2%8D%C3%95%C3%94!%0A%02%01%14%04%C3%90Y%C3%81S%C3%99%C2%8C%26%C2%B1%C2%9A%C2%ADf%C2%BB%C3%91%C2%BC%C3%97%13%3C%C2%82%20%C2%82%20%C3%BBL%C2%82%C3%A8%0A%0B%C3%BB%11%1C%C2%982%C3%A1%C2%B5%C3%BF%1B%C2%A42%C2%93R%C3%AD%17%C3%A04IS%09vI%C3%9AQ(%C3%9E%0B%C2%87%C2%9E%7DP%C2%BF%C2%81%C2%B0%C2%AF%06aW%0D%C3%82%C2%B6%1A%C3%AC%C2%B0%C2%A9%04%C3%A1%C2%8Eu%25%C3%B8DW%C2%95%20%C3%9C%C2%B0%C2%A8%04%C3%A1%C2%8Ay%25%08%17%C3%8C%C3%BA%C3%80%C2%86%C2%8F%C3%B7u%1Axd%C3%A7%24%C3%8B%24%C3%87%C3%97%C2%B1%0F%1C%C2%95%C3%BF%C3%BB%C2%87%C2%A3%C3%B3%00G%C2%BA%C2%9D%C3%9EEc%C3%A5o%00%00%00%00IEND%C2%AEB%60%C2%82";
var fadeOut = group7.add("iconbutton", undefined, File.decode(fadeOut_imgString), {name: "fadeOut", style: ""});
fadeOut.preferredSize.width = 25;
fadeOut.preferredSize.height = 25;
fadeOut.helpTip = "Add a fade out effect";
var deleteRoute_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%C2%8D%C2%89%1D%0D%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%C2%A5%3Fv%00%00%01*IDAT8%C2%8D%C2%B5%C3%94%C2%BD.%04a%14%06%C3%A0g7cC%C2%B6%12%C2%85%C2%88%20Q%C2%91P%C2%A9t.A%C2%A1P%C2%B9%02%0D%C2%85%C2%8B%10%C2%85%C3%9Bp%03n%C2%85%C3%8A%26l%24%22B%C3%A27%C3%B1s%14%C3%B3a%0D%C2%BB%3B%C2%B2%C3%A3MN%C3%A6%C3%8B%3B%C3%A7%C2%BCs%C2%BE%C3%B33%C2%B5%C2%88P%25%C3%AA%C2%95%C2%AA%C3%BD%C2%87%60%C3%96%C3%A7%C3%BD%0C%C3%96%0A%C3%9C!%C2%8E%C2%BA%05%C3%94%0A5%C2%9C%C3%80(.0%C2%89%1B%C2%9C%17b%C3%861%C2%96%C3%B81%C3%9C%C2%A3%C3%9D-%C3%83Ul%60%16%C3%87%C3%A8%C3%95%C2%B19%C2%9C%C3%A1%00%7B%C2%9FlDtZ%3D%22%C3%A6%23%C3%A24%22%C2%9A%11%C3%91%C2%88%C2%88%2C%22%C2%86%C2%92e%C2%89kDD%2B%22VR%C3%8C%C2%A7F1%C3%837%5C%C3%A3*%5D%C2%A5%17%C2%AE%C2%92%C3%AF%5B\'%C3%B9%5B%C2%97G%12%C3%BF%C3%B1%C2%B1-%2C%60%0A%3B%C2%85%C3%98%C3%A1bp%C2%99%C2%B1%C3%99%C3%82%C2%A2%C2%BCI%C3%9B%C3%BD%C2%9C%C3%8B%08%C2%B6p%C2%8B\'%C2%9CT!%C3%B8\'%C2%94%11l%C3%8A%C3%ABYO%C3%A7%C2%81%05%1F%C3%B0%22%C2%9F%C3%89%C3%87~%C3%8E%C2%BDV%C2%AF%C2%96%C2%9E%C3%AB%C3%B2%C2%8Dy%C3%B5s%0DK%09fxN%C3%86%C3%B7%C3%95kw%C2%9C%C2%9F0TF%C3%B0%1EK%C3%98MYu%C3%832%C3%AE%C2%8Ad%C3%B1%C3%A7%40%5E%C3%97%7DL%C3%BB%C2%BA%C3%B6o%C2%B8%C3%84f%C3%8A%C2%B4%C2%A7%C3%A0%40%C2%A8%7C%0E%C3%9F%01%C3%99%C2%B4v%2B%C2%A9%C3%8D%C2%8E%5D%00%00%00%00IEND%C2%AEB%60%C2%82";
var deleteRoute = group7.add("iconbutton", undefined, File.decode(deleteRoute_imgString), {name: "deleteRoute", style: ""});
deleteRoute.preferredSize.width = 25;
deleteRoute.preferredSize.height = 25;
deleteRoute.helpTip = "Delete the selected route";
var colorbutton2 = group7.add("iconbutton", undefined, {name: "colorbutton2", style: "toolbutton"});
colorbutton2.helpTip = "Set the selected route color";
colorbutton2.preferredSize.width = 25;
colorbutton2.preferredSize.height = 25;
colorbutton2.helpTip = "Set the color of the selected route";
var group9 = tab3.add("group", undefined, {name: "group9"});
group9.orientation = "row";
group9.alignChildren = ["left", "center"];
group9.spacing = 10;
group9.margins = 0;
var statictext5 = group9.add("statictext", undefined, undefined, {name: "statictext5"});
statictext5.text = "Route Thickness:";
var routeThickness = group9.add("edittext {justify: \"right\", properties: {name: \"routeThickness\"}}");
routeThickness.text = "2";
routeThickness.preferredSize.width = 30;
var statictext6 = group9.add("statictext", undefined, undefined, {name: "statictext6"});
statictext6.text = "px";
var tab4 = verticaltabbedpanel1_innerwrap.add("group", undefined, {name: "tab4"});
tab4.text = "Graphics";
tab4.orientation = "column";
tab4.alignChildren = ["left", "center"];
tab4.spacing = 10;
tab4.margins = 2;
var group10 = tab4.add("group", undefined, {name: "group10"});
group10.orientation = "row";
group10.spacing = 10;
group10.margins = 0;
var statictext7 = group10.add("statictext", undefined, undefined, {name: "statictext7"});
statictext7.text = "Pin style:";
var pinStyle_array = ["Circular", "Finder", "Hexagon", "Location", "Pulse", "Radio", "Rings", "Snakes", "Reference", "Custom Pin"];
var pinStyle = group10.add("dropdownlist", undefined, undefined, {items: pinStyle_array, name: "pinStyle"});
pinStyle.selection = 0;
pinStyle.preferredSize.width = 80;
var pinConfirm = group10.add("button", undefined, undefined, {name: "pinConfirm"});
pinConfirm.text = "OK";
pinConfirm.preferredSize.width = 30;
pinConfirm.preferredSize.height = 20;
var group11 = tab4.add("group", undefined, {name: "group11"});
group11.orientation = "row";
group11.alignChildren = ["left", "center"];
group11.spacing = 10;
group11.margins = 0;
var connectLabel = group11.add("button", undefined, undefined, {name: "connectLabel"});
connectLabel.text = "Connect  Label to Point";
connectLabel.preferredSize.width = 200;
connectLabel.helpTip = "Connects the selected pin with the selected label";
var tab5 = verticaltabbedpanel1_innerwrap.add("group", undefined, {name: "tab5"});
tab5.text = "Highlights";
tab5.orientation = "column";
tab5.alignChildren = ["fill", "top"];
tab5.spacing = 10;
tab5.margins = 2;
var statictext8 = tab5.add("statictext", undefined, undefined, {name: "statictext8"});
statictext8.text = "Country to Highlight:";
var entry = tab5.add("edittext {properties: {name: \"entry\"}}");
entry.preferredSize.width = 200;
entry.alignment = ["left", "top"];
var group12 = tab5.add("group", undefined, {name: "group12"});
group12.orientation = "row";
group12.alignChildren = ["left", "center"];
group12.spacing = 10;
group12.margins = 0;
var countryList = group12.add("listbox", [0, 0, 200, 60], Countries_array, {multiselect: false});
var Countries_array = ["Afghanistan", "Alaska", "Albania", "Algeria", "American Samoa", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoro Islands", "Costa Rica", "Cote d Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of Congo", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Finland", "France", "French Guiana", "Fiji", "Gabon", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Guatemala", "Guinea", "Guinea - Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of Congo", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Bahamas", "The Gambia", "Timor - Leste", "Togo", "Trinidad and Dobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "West Bank", "Western Sahara", "Yemen", "Zambia", "Zimbawe", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia_USA", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Washington DC", "West Virginia", "Wisconsin", "Wyoming"];
countryList.selection = 0;
countryList.preferredSize.width = 200;
countryList.preferredSize.height = 60;
var group13 = tab5.add("group", undefined, {name: "group13"});
group13.orientation = "row";
group13.alignChildren = ["left", "center"];
group13.spacing = 10;
group13.margins = 0;
var onBtn_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%C2%8D%C2%89%1D%0D%00%00%00%09pHYs%00%007%5D%00%007%5D%01%19%C2%80F%5D%00%00%00%C3%AAIDAT8%C2%8D%C3%A5%C3%94%C2%A1JDQ%10%C3%86%C3%B1ow%05%C3%81%C3%A2%22(b%5E%10%C3%B4%0D%C3%94%2C%261X%7D%08%C2%A3v%C2%83f%C2%A3%C3%85%C2%A6%C3%89%C2%AA%2F%60%C2%B1%08%16%C2%83%C2%B0va%1F%40%C2%90%C2%9F%C3%81%C2%B3p%C2%B9zA%C3%A5%0A%0B%0E%0C%C3%A7%C2%9C93%7Ff%C2%98a%3AH%C2%9B%C3%92m%C2%95%C3%B6%3F%C2%81S%0D%C3%B6%C3%95%24%07I%C2%96%C2%93H2*%C3%A7%5C%C2%92%5E%C2%92a%C2%92%C2%93%24w%C2%9F%22Q%C3%95%19%5Cc%C2%84%2B%C3%AC%14%C3%BB%3C%C2%96%C3%8A%7D%13%C2%97x%C3%81-%16%C2%AA%C2%8C*l%C3%9D%C2%87%C3%9C%14%C3%B0%C3%98~%C2%84%07%C3%9C%C3%A3%C2%B4b%C3%AF%C3%A1%C2%A2%C3%84l%C3%97%C2%81%1B%C3%A5c%C2%AF%C2%96%C3%B1q%C3%89v%11%C2%B3%18%C3%A2%C2%BC%C3%A6%C2%B3Ubw%C3%87%C3%80%7D%C2%BCa%C2%AD%C3%A6%18%3CbPy%C3%B7%C3%B1%C2%84%C3%A9%C2%9A%C3%9F%00%C2%AF8k%C2%AB%C3%8B%C2%9D%C2%A2%3F*%C2%B9%C3%BF%C3%9D%C2%92%C3%BF%C2%A4)%C2%AD%C2%8DM%C3%87%C3%97%C3%9Bf%25%C3%89a%C3%83%60w%C2%93%3C7%0Dv%13%C3%B0%C3%972%C3%B9%C3%8Ba%C3%B2%C2%81%C3%AF%C2%ADZ%C3%A1%C3%BC%10%C3%91%2C%C3%A5%00%00%00%00IEND%C2%AEB%60%C2%82";
var onBtn = group13.add("iconbutton", undefined, File.decode(onBtn_imgString), {name: "onBtn", style: ""});
onBtn.helpTip = "Highlight the selected Country";
onBtn.preferredSize.width = 25;
onBtn.preferredSize.height = 25;
var offBtn_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%C2%8D%C2%89%1D%0D%00%00%00%09pHYs%00%007%5D%00%007%5D%01%19%C2%80F%5D%00%00%01xIDAT8%C2%8D%C3%8D%C2%94%C2%BDK%C3%96Q%14%C3%87%3F%3E%C2%BE%04%C2%BE%C2%A5%C3%91%C2%A2%08%C3%A9f%0E%C2%A6%C2%A3%C2%83%09%C3%AA%22%C2%84N%C2%86%C2%9B%C3%90%C2%AE%C3%BF%C2%80%C2%8E%C3%92%12%0E5%C3%98%C3%90%C2%A2%C2%8B(%C3%8Fb%C3%91%2C.%C2%A2D%C3%90%C3%A0%20%24%08%C3%AA*%0D-IH%1F%07%C2%8Fr%C2%BD%C3%8F%C2%8F%20s%C3%B0%C3%80%C3%A5%C3%9E%7B%C3%8E%C3%B7%7C%C3%8F%C2%B9%C3%A7%1Cn%C2%95%C3%8A%5DJ%C3%A9N%C3%99%C3%AE%23%C3%A18%C3%B0%C3%BE_%09k%C2%80N%C2%A0%0B%C2%A8K%C3%B4%C2%BD%C3%80G%C3%A0k%0E.%C2%926%60%0E%C3%A8%03%1A%C2%81%C3%AA%04%C3%BF%0D%C3%98%01%C3%9E%01%23%C3%80%C3%A6%0DO5_%C2%9F%C3%94%3F%C3%AA%C2%86%C3%BA2%C3%91%C2%97b%C2%9F%C3%B7R~%C2%AA%C3%8BjC%C3%AA%C2%9F%12%C3%B5%06p%5BmN%C3%B4s%C3%AAA%04%C2%98%09%C3%BBh%C3%98%3E%C2%87%C3%8F%C3%B3%C2%9C%C2%B0%3F%0C%C2%AF%C2%B2l%17%C3%94%C3%9Fq%1E%0D%C3%8CJ%C2%86y%11%C3%BA%C2%B1%2B%C3%82Y%C3%B5%2C%C2%8D%C2%92%C2%AC%7D%C2%B5U%C3%AD%08%C2%A7IuK%C2%AD%C3%8Dp%3D%C3%AA%2Fu%C2%A9%044E%C2%B1%7F%144%C3%A74%C2%BAy%C3%82%C3%A5%C2%88%C2%94%C2%81%C3%B6%C2%82f%C2%9E%02%02%C3%8DW%11%C2%86%22%C2%83%C2%89%C2%82\'%C2%ABN%C3%87%C3%BD%C2%BB%C2%BA%C2%9Ea%06%023%C2%957e8%0Ckq%7F%C2%A2%C3%AE%C2%AAo%C3%95r%C2%90%C2%ADfdK%C3%A1s%3D%0Dy%C3%8D%1A%C2%83%C3%B08%C2%80oB%C3%BF%40%C2%AD%C2%8F%C3%B33%C3%B5%C2%83z%C2%AE%C3%AE%C2%A9%C2%8FR%C2%8E*%2B%7F%C2%9B.%C3%A00%06%C3%B71%C3%90%C2%93%C3%94%C3%A8a%C3%94%C3%AF%04x%0D%7C%C2%A9%C2%A8z%C2%96%C3%A1%60A-%C2%9B%C3%94n%C3%B5%C2%A9%C3%9AR0%09%C3%BC-%C3%83E%C3%A0(%C2%B2%C2%BB%C2%95%14%3D%C3%B9%C2%BF%C3%A4%C3%9E%C3%BD%C2%87%15r%01Q%C2%82%2F%3BM2V%24%00%00%00%00IEND%C2%AEB%60%C2%82";
var offBtn = group13.add("iconbutton", undefined, File.decode(offBtn_imgString), {name: "offBtn", style: ""});
offBtn.helpTip = "Switch off the Highlight from the selected Country";
offBtn.preferredSize.width = 25;
offBtn.preferredSize.height = 25;
var clearBtn_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%C2%8D%C2%89%1D%0D%00%00%00%09pHYs%00%007%5D%00%007%5D%01%19%C2%80F%5D%00%00%01%C2%9EIDAT8%C2%8D%C2%AD%C2%94%C2%BFK%C2%95a%14%C3%87%3F%C3%AFE%C3%AE%60-%C2%9A9%5C%C3%84%C2%B2%C3%81%C3%AE%C2%A0PK%119%C2%84KQP%C3%90%12%14%C3%92%2F(%C3%BD%0F%04%C3%BD%0Bjk%C2%AB%C3%81)%14%C2%AAQ%C2%82%C2%B6%C2%A4%25j%C2%90%C2%96%40!(%C2%84%C2%88%20%C3%83%C2%B1%C2%A8%3E%0D%C3%AF%C2%B9%C3%9C%C2%97%C2%87%C3%A7Eot%C3%A0%19%C3%AEs%3E%C3%A7%C3%83%03%C3%A7%7B%C3%9FB%C3%A5%7FV%C3%9F.%C3%BDK%C3%809%60%1Ch%00%1F%C2%80%17%C3%80%C3%93%C2%BA%C2%81%C2%A2%C3%A6%C2%85%C3%BD%C3%8020%09%7C%03%C2%BE%C3%86%C3%BD%01%C3%A0%60%C2%88g*%C3%B7%C3%9DR%C3%93sY%C3%BD%C2%A3.%C2%A9%C2%873%C3%BD%C2%96%C3%BA%40%C3%BD%C2%A5%C3%9EI%C3%BB)%7C%C3%91%C2%B2%C2%A63%C2%A2%C3%B4%1C%0Bv%C2%B6N%C3%98%1F%C3%80%C2%A9%3D%C3%88%3Ag%3Cf%0E%C3%A5%C2%84%C3%8F%C3%95%C2%95%1Ed%C2%9Ds_%7D%C2%97%0A%C2%8F%C2%AB%3B%C3%AA%40%02_Q%2FT~O%C2%A97%12%C2%A6P%C2%B7%C3%959%C2%95F%C3%AC%C3%A6*%C3%B0%09%C3%B8%C2%9E%C3%AC%C3%AC7%C2%B0%0AL%00C%C3%80%2B%C2%A0%C2%99%C3%AE%15x%0B%C2%9C%C2%85n%0E%C3%87%22%0Ai%3D%03%C2%8E%02%C3%AB%C3%81%C2%9E%04%C3%9Ed%C2%B8-%C2%A0U%156%C3%A25%C2%B9%C3%BAB%C2%99K%C2%80%C3%8F5%C2%8C%40%C3%91%11%01%7C%04%C2%8Ed%C3%80%C3%B3%C3%80%0Ep%06h%C3%87K%C2%AEe%C2%B8%16%C3%B0%C2%B3*%7C%12%C3%82%7D%098%0C%5C%07%C3%96%C2%80%0D%C3%8A%C2%BF%C3%A2%40Fx%02xY%C2%BE%C2%B5%C2%BB%C2%AD5%C3%B5%C3%A1%3F%C3%84fQ%C3%9DP%C2%9Bi%0E%07%23%C2%A4%C3%AD%1Ed%C3%83%C3%A9L%0A%C3%9C%0A%60r%0F%C2%B2%C3%91%60%17%C2%AB%C3%B79%C3%B0v%C2%80%C3%B7%C3%94%C3%BD%C2%99~S%5D%08f%3E%C3%AD%C3%97%7D%C2%BEF%C2%81%C3%87%C3%80%08%C2%B0I%19%1D(%C3%83%C3%9D%C2%A6%C3%BC%C2%A4%C3%9D%04%C3%9E%C2%A7%C2%83u%C3%82N%C3%9D%05N%C3%87f%0B%C3%8A%08%C2%BD%06%1E%01%3Fr%03%C2%BB%09%7B%C2%AE%C2%BFC%C2%82o8G%7D%1F%25%00%00%00%00IEND%C2%AEB%60%C2%82";
var clearBtn = group13.add("iconbutton", undefined, File.decode(clearBtn_imgString), {name: "clearBtn", style: ""});
clearBtn.helpTip = "Clear selected country highlight";
clearBtn.preferredSize.width = 25;
clearBtn.preferredSize.height = 25;
var clearAllBtn = group13.add("iconbutton", undefined, File.decode(deleteRoute_imgString), {name: "clearAllBtn", style: ""});
clearAllBtn.helpTip = "Remove the highlight animation to all Countries";
clearAllBtn.preferredSize.width = 25;
clearAllBtn.preferredSize.height = 25;
var colorbutton1 = group13.add("iconbutton", undefined, {name: "colorbutton1", style: "toolbutton"});
colorbutton1.helpTip = "Set the highlight color of the selected Country";
colorbutton1.preferredSize.width = 25;
colorbutton1.preferredSize.height = 25;
var panel1 = tab5.add("panel", undefined, undefined, {borderStyle: "etched", name: "panel1"});
panel1.text = "Border line";
panel1.preferredSize.width = 260;
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 8;
panel1.margins = [7, 4, 0, 4];
var group14 = panel1.add("group", undefined, {name: "group14"});
group14.orientation = "column";
group14.alignChildren = ["left", "center"];
group14.spacing = 5;
group14.margins = [0, 5, 0, 0];
var group15 = group14.add("group", undefined, {name: "group15"});
group15.orientation = "row";
group15.alignChildren = ["left", "center"];
group15.spacing = 10;
group15.margins = 0;
var enableBorderLine = group15.add("checkbox", undefined, undefined, {name: "enableBorderLine"});
enableBorderLine.text = "Enable";
var group16 = group14.add("group", undefined, {name: "group16"});
group16.orientation = "row";
group16.alignChildren = ["left", "center"];
group16.spacing = 5;
group16.margins = 0;
var statictext10 = group16.add("statictext", undefined, undefined, {name: "statictext10"});
statictext10.text = "Border line thickness:";
var sizeBorderLine = group16.add("edittext {justify: \"right\", properties: {name: \"sizeBorderLine\"}}");
sizeBorderLine.helpTip = "Set the thickness of the border line";
sizeBorderLine.text = "2";
sizeBorderLine.preferredSize.width = 30;
sizeBorderLine.preferredSize.height = 20;
var statictext11 = group16.add("statictext", undefined, undefined, {name: "statictext11"});
statictext11.text = "px";
var group17 = group14.add("group", undefined, {name: "group17"});
group17.orientation = "row";
group17.alignChildren = ["left", "center"];
group17.spacing = 10;
group17.margins = [0, 0, 0, 0];
var statictext12 = group17.add("statictext", undefined, undefined, {name: "statictext12"});
statictext12.text = "Border line color:";
var colorBorderLine = group17.add("iconbutton", undefined, {name: "colorBorderLine", style: "toolbutton"});
colorBorderLine.preferredSize.height = 25;
colorBorderLine.preferredSize.width = 25;
var tab6 = verticaltabbedpanel1_innerwrap.add("group", undefined, {name: "tab6"});
tab6.text = "Animation";
tab6.orientation = "column";
tab6.alignChildren = ["fill", "top"];
tab6.spacing = 10;
tab6.margins = 2;
var tpanel1 = tab6.add("tabbedpanel", undefined, undefined, {name: "tpanel1"});
tpanel1.alignChildren = "fill";
tpanel1.preferredSize.width = 247;
tpanel1.margins = 0;
tpanel1.alignment = ["fill", "top"];
var tab7 = tpanel1.add("tab", undefined, undefined, {name: "tab7"});
tab7.text = "Continuous";
tab7.orientation = "column";
tab7.alignChildren = ["left", "top"];
tab7.spacing = 10;
tab7.margins = [3, 10, 0, 10];
var group18 = tab7.add("group", undefined, {name: "group18"});
group18.orientation = "row";
group18.alignChildren = ["left", "center"];
group18.spacing = 10;
group18.margins = 0;
var startingPoint = group18.add("checkbox", undefined, undefined, {name: "startingPoint"});
var statictext13 = group18.add("group", undefined, {name: "statictext13"});
statictext13.getText = function () {
var t = [];
for (var n = 0; n < statictext13.children.length; n++) {
var text = (statictext13.children[n].text) || ("");
if (text === "") { 
text = " ";
}
t.push(text);
}
return t.join("\n");
};
statictext13.preferredSize.width = 200;
statictext13.orientation = "column";
statictext13.alignChildren = ["left", "center"];
statictext13.spacing = 0;
statictext13.add("statictext", undefined, "Start rotation");
statictext13.add("statictext", undefined, "from selected point");
var group19 = tab7.add("group", undefined, {name: "group19"});
group19.orientation = "row";
group19.alignChildren = ["left", "center"];
group19.spacing = 10;
group19.margins = 0;
var statictext14 = group19.add("statictext", undefined, undefined, {name: "statictext14"});
statictext14.text = "Speed:";
var RotationSpeed = group19.add("edittext {properties: {name: \"RotationSpeed\"}}");
RotationSpeed.text = "10";
RotationSpeed.preferredSize.width = 30;
var CW = group19.add("radiobutton", undefined, undefined, {name: "CW"});
CW.text = "CW";
CW.value = true;
CW.helpTip = "Clockwise rotation";
var CCW = group19.add("radiobutton", undefined, undefined, {name: "CCW"});
CCW.text = "CCW";
CCW.helpTip = "Counterclockwise rotation";
var group20 = tab7.add("group", undefined, {name: "group20"});
group20.orientation = "row";
group20.alignChildren = ["left", "center"];
group20.spacing = 10;
group20.margins = 0;
var confirmBtn = group20.add("button", undefined, undefined, {name: "confirmBtn"});
confirmBtn.text = "OK";
confirmBtn.preferredSize.width = 150;
var tab8 = tpanel1.add("tab", undefined, undefined, {name: "tab8"});
tab8.text = "Schedule";
tab8.orientation = "column";
tab8.alignChildren = ["left", "top"];
tab8.spacing = 10;
tab8.margins = [3, 10, 0, 10];
var automaticY = tab8.add("checkbox", undefined, undefined, {name: "automaticY"});
automaticY.text = "No X Earth Rotation";
automaticY.helpTip = "if enabled, the Earth just moves in the Y position to center the selected point";
var goToSelected = tab8.add("button", undefined, undefined, {name: "goToSelected"});
goToSelected.text = "Go to selected point";
goToSelected.helpTip = "Rotates the Earth to reach the selected point";
var wait = tab8.add("button", undefined, undefined, {name: "wait"});
wait.text = "Wait";
wait.helpTip = "Keeps the Earth movement still";
var removeAnimation = tab6.add("button", undefined, undefined, {name: "removeAnimation"});
removeAnimation.text = "Remove Earth Animation";
removeAnimation.preferredSize.width = 150;
removeAnimation.alignment = ["left", "top"];
tpanel1.selection = tab7;
verticaltabbedpanel1_tabs = [tab1, tab2, tab3, tab4, tab5, tab6];
for (var i = 0; i < verticaltabbedpanel1_tabs.length; i++) {
verticaltabbedpanel1_tabs[i].alignment = ["fill", "fill"];
verticaltabbedpanel1_tabs[i].visible = false;
}
verticaltabbedpanel1_nav.onChange = showTab_verticaltabbedpanel1;
verticaltabbedpanel1_nav.selection = 0;
showTab_verticaltabbedpanel1();
palette.layout.layout(true);
palette.layout.resize();
palette.onResizing = palette.onResize = function () {
this.layout.resize();
};
if (palette instanceof Window) { 
palette.show();
}
var proj = app.project;
updateRoutes();
var selected = new Array();
countryList.selection = 0;
picked = type_ahead(Countries_array);
paesi = ["Afghanistan", "Alaska", "Albania", "Algeria", "American Samoa", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoro Islands", "Costa Rica", "Cote d Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of Congo", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Finland", "France", "French Guiana", "Fiji", "Gabon", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Guatemala", "Guinea", "Guinea - Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of Congo", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Bahamas", "The Gambia", "Timor - Leste", "Togo", "Trinidad and Dobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "West Bank", "Western Sahara", "Yemen", "Zambia", "Zimbawe", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia_USA", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Washington DC", "West Virginia", "Wisconsin", "Wyoming"];
cityText.onChange = function () {
myList.removeAll();
cityArray.length = 0;
cityCoord.length = 0;
textField = cityText.text;
if (textField != "") { 
cityToSearch = textField.replace(/ /g, "+");
}
myList.removeAll();
findCity(encodeURI(cityToSearch));
for (var i = 0; i < cityArray.length; i++) {
myList.add("item", cityArray[i]);
}
};
myList.onDoubleClick = function () {
var sel = this.selection;
latitudine.text = cityCoord[this.selection.index][1];
longitudine.text = cityCoord[this.selection.index][0];
};
("object" != typeof JSON) && (JSON = {});
(function () {
function f(t) {
return t < 10 ? "0" + t : t;
}
function this_value() {
return this.valueOf();
}
function quote(t) {
return (rx_escapable.lastIndex = 0, rx_escapable.test(t) ? "\"" + t.replace(rx_escapable, function (t) {
var e = meta[t];
return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
}) + "\"" : "\"" + t + "\"");
}
function str(t, e) {
var a = gap;
var i = e[t];
switch (((((i) && ("object" == typeof i)) && ("function" == typeof i.toJSON)) && (i = i.toJSON(t)), ("function" == typeof rep) && (i = rep.call(e, t, i)), typeof i)) { 
case "string":
return quote(i);
case "number":
return isFinite(i) ? String(i) : "null";
case "boolean":
case "null":
return String(i);
case "object":
if (!i) { 
return "null";
}
if ((gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i))) { 
for (u = i.length, r = 0; r < u; r++) { 
f[r] = (str(r, i)) || ("null");}
return (o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o);
}
if ((rep) && ("object" == typeof rep)) { 
for (u = rep.length, r = 0; r < u; r++) { 
(("string" == typeof rep[r]) && (o = str(n = rep[r], i))) && (f.push(quote(n) + gap ? ": " : ":" + o));}
}
else {
for (var n in i) { 
((Object.prototype.hasOwnProperty.call(i, n)) && (o = str(n, i))) && (f.push(quote(n) + gap ? ": " : ":" + o));
}
}
return (o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o);
}
}
"use strict";
var rx_one = /^[\],:{}\s]*$/;
var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
("function" != typeof Date.prototype.toJSON) && ((Date.prototype.toJSON = function () {
return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
}, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value));
("function" != typeof JSON.stringify) && ((meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"": "\\\"", "\\": "\\\\"}, JSON.stringify = function (t, e, r) {
if ((gap = "", indent = "", "number" == typeof r)) { 
for (var n = 0; n < r; n++) {
indent += " ";
}
}
else {
("string" == typeof r) && (indent = r);
}
if ((rep = e, ((e) && ("function" != typeof e)) && (("object" != typeof e) || ("number" != typeof e.length)))) { 
throw new Error("JSON.stringify");
}
return str("", {"": t});
}));
("function" != typeof JSON.parse) && (JSON.parse = function (text, reviver) {
function walk(t, e) {
var o = t[e];
if ((o) && ("object" == typeof o)) { 
for (var r in o) { 
(Object.prototype.hasOwnProperty.call(o, r)) && (void(0) !== (n = walk(o, r)) ? o[r] = n : delete o[r]);
}
}
return reviver.call(t, e, o);
}
if ((text = String(text), rx_dangerous.lastIndex = 0, (rx_dangerous.test(text)) && (text = text.replace(rx_dangerous, function (t) {
return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
})), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")))) { 
return (j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j);
}
throw new SyntaxError("JSON.parse");
});
})();
cityArray = new Array();
cityCoord = new Array();
if (proj.item(findCompIndex("Main Composition")).width == 1920) { 
radius = 500;
}
else {
if (proj.item(findCompIndex("Main Composition")).width == 3840) { 
radius = 1000;
}
}
var compWidth = proj.item(findCompIndex("Main Composition")).width;
var compHeight = proj.item(findCompIndex("Main Composition")).height;
lat = parseFloat(latitudine.text);
lon = parseFloat(longitudine.text);
latitudine.onChange = function () {
latInput = this.text;
this.text = latInput.replace(/[^0-9.-]/g, "");
lat = latInput.toString();
manualChange = true;
};
longitudine.onChange = function () {
lonInput = this.text;
this.text = lonInput.replace(/[^0-9.-]/g, "");
lon = lonInput.toString();
manualChange = true;
};
var currentVersion = app.version;
version = parseFloat(currentVersion);
if (version >= 17.1) { 
taper.enabled = true;
}
var countriesIndex = countriesIndexFind();
var initialCountryColor = app.project.item(countriesIndex).layer("Afghanistan")("ADBE Effect Parade")("ADBE Fill")("ADBE Fill-0002").value;
colorbutton1.fillBrush = colorbutton1.graphics.newBrush(colorbutton1.graphics.BrushType.SOLID_COLOR, initialCountryColor);
colorbutton1.textPen = colorbutton1.graphics.newPen(colorbutton1.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);
colorbutton1.onDraw = customDraw;
colorbutton1.notify("onDraw");
var initialBorderLine = app.project.item(countriesIndex).layer("Afghanistan")("ADBE Layer Styles")("frameFX/enabled")("frameFX/color").value;
colorBorderLine.fillBrush = colorBorderLine.graphics.newBrush(colorBorderLine.graphics.BrushType.SOLID_COLOR, initialBorderLine);
colorBorderLine.textPen = colorBorderLine.graphics.newPen(colorBorderLine.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);
colorBorderLine.onDraw = customDraw;
colorBorderLine.notify("onDraw");
sizeBorderLine.text = app.project.item(countriesIndex).layer(1)("ADBE Layer Styles")("frameFX/enabled")("frameFX/size").value;
colorbutton2.fillBrush = colorbutton2.graphics.newBrush(colorbutton2.graphics.BrushType.SOLID_COLOR, [1, 1, 1], 1);
colorbutton2.onDraw = customDraw;
colorbutton2.notify("onDraw");
if (app.project.item(countriesIndex).layer("Afghanistan")("ADBE Layer Styles")("frameFX/enabled")("frameFX/opacity").value == 100) { 
enableBorderLine.value = true;
sizeBorderLine.enabled = true;
colorBorderLine.enabled = true;
}
else {
enableBorderLine.value = false;
sizeBorderLine.enabled = false;
colorBorderLine.enabled = false;
}
addPoint.onClick = function () {
mapComp = findCompIndex("Main Composition");
if ((latitudine.text == "") || (longitudine.text == "")) { 
alert("Please set the Latitude and Longitude values, or type the name of your city in the text edit field");
return false;
}
lat = parseFloat(latitudine.text);
lon = parseFloat(longitudine.text);
if ((lon > 180) || (lon < -180)) { 
alert("Please check the longitude value. It shall not be less than -180 nor greater than 180");
return false;
}
if ((lat > 90) || (lat < -90)) { 
alert("Please check the latitude value. It shall not be less than -90 nor greater than 90");
return false;
}
var referencePointIndex = findCompIndex("Reference");
point = proj.item(mapComp).layers.add(proj.item(referencePointIndex), proj.item(mapComp).duration);
if ((myList.selection == null) || (manualChange == true)) { 
point.name = lat + " , " + lon;
manualChange = false;
}
else {
point.name = myList.selection.text;
}
point.threeDLayer = true;
point.parent = proj.item(mapComp).layer("GLOBE ANCHOR");
point("ADBE Transform Group")("ADBE Orientation").setValue([0, 0, 0]);
point.materialOption.acceptsLights.setValue(false);
point.label = 9;
point("ADBE Transform Group")("ADBE Rotate X").setValue(lat * -1);
point("ADBE Transform Group")("ADBE Orientation").setValue([0, lon * -1, 0]);
point("ADBE Transform Group")("ADBE Opacity").expression = "toCompVec([0,0,1])[2];";
y = Math.sin((Math.PI / 2) - degreesToRadians(lat)) * Math.sin(degreesToRadians(lon)) * radius;
x = Math.cos((Math.PI / 2) - degreesToRadians(lat)) * radius;
z = Math.sin((Math.PI / 2) - degreesToRadians(lat)) * Math.cos(degreesToRadians(lon)) * radius;
if ((lat >= 0) && ((lon > 90) || (lon < -90))) { 
y *= 1;
x = -Math.abs(x);
z = Math.abs(z);
}
if ((lat >= 0) && ((lon >= -90) && (lon > 90))) { 
y *= 1;
x = -Math.abs(x);
z = -Math.abs(z);
}
if ((lat < 0) && ((lon > 90) || (lon < -90))) { 
y *= 1;
x = Math.abs(x);
z = Math.abs(z);
}
if ((lat < 0) && ((lon >= -90) && (lon > 90))) { 
y *= 1;
x = Math.abs(x);
z = -Math.abs(z);
}
point("ADBE Transform Group")("ADBE Position").setValue([y, x, z]);
point("ADBE Transform Group")("ADBE Position").expression = "\nx =  (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[0])/" + radius + ";\ny =  (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[1])/" + radius + ";\nz = (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[2])/" + radius + ";\n[x,y,z]";
var coordsValue = point.Effects.addProperty("ADBE Point Control");
coordsValue("ADBE Point Control-0001").setValue([lat, lon]);
coordsValue.name = "Coordinates";
try {
proj.item(mapComp).layer("CONTROLLER").moveToBeginning();
} catch (err) {return main;
}
};
connessione.onClick = function () {
mapComp = findCompIndex("Main Composition");
var selectedPoints = app.project.activeItem.selectedLayers;
if ((selectedPoints.length == 0) || (selectedPoints.length > 2)) { 
alert("Please select two points to connect");
return false;
}
for (var i = 0; i < selectedPoints.length; i++) {
if (proj.item(mapComp).layer(selectedPoints[i].index)("ADBE Transform Group")("ADBE Anchor Point").value[1] != 63.5) { 
alert(" You can select only points");
return false;
}
}
mapComp = findCompIndex("Main Composition");
x1 = proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[0];
y1 = proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[1];
z1 = proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[2];
x2 = proj.item(mapComp).layer(selectedPoints[1].index)("ADBE Transform Group")("ADBE Position").value[0];
y2 = proj.item(mapComp).layer(selectedPoints[1].index)("ADBE Transform Group")("ADBE Position").value[1];
z2 = proj.item(mapComp).layer(selectedPoints[1].index)("ADBE Transform Group")("ADBE Position").value[2];
var lunghezzaLinea = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
lat1 = Math.asin(proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[1] / (radius + 1000)) * -1;
lon1 = Math.atan(proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[0] / proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[2]) * -1;
lat2 = Math.asin(proj.item(mapComp).layer(selectedPoints[1].index)("ADBE Transform Group")("ADBE Position").value[1] / (radius + 1000)) * -1;
lon2 = Math.atan(proj.item(mapComp).layer(selectedPoints[1].index)("ADBE Transform Group")("ADBE Position").value[0] / proj.item(mapComp).layer(selectedPoints[1].index)("ADBE Transform Group")("ADBE Position").value[2]) * -1;
myShapeLayer = proj.item(mapComp).layers.addShape();
myShapeGroup = myShapeLayer.property("ADBE Root Vectors Group");
myShapeGroup.addProperty("ADBE Vector Shape - Group");
var stroke2 = myShapeGroup.addProperty("ADBE Vector Graphic - Stroke");
stroke2.name = "Dots";
var stroke1 = myShapeGroup.addProperty("ADBE Vector Graphic - Stroke");
stroke1.name = "Solid Line";
myShapeGroup.addProperty("ADBE Vector Filter - Trim");
var lunghezzaVertice = (lunghezzaLinea * 800) / 1000;
var myShape = new Shape();
myShape.vertices = [[0, 0], [lunghezzaLinea, 0]];
myShape.inTangents = [[0, 0], [0, -lunghezzaVertice]];
myShape.outTangents = [[0, -lunghezzaVertice], [0, 0]];
myShape.closed = false;
myShapeGroup.property(1).property("ADBE Vector Shape").setValue(myShape);
myShapeLayer.threeDLayer = true;
myShapeLayer.name = "Connection " + selectedPoints[0].name + " to " + selectedPoints[1].name;
myShapeLayer.threeDLayer = true;
myShapeLayer.parent = proj.item(mapComp).layer("GLOBE ANCHOR");
myShapeLayer("ADBE Transform Group")("ADBE Position").setValue([x1, y1, z1]);
myShapeLayer("ADBE Transform Group")("ADBE Orientation").setValue([0, 0, 0]);
myShapeLayer.materialOption.acceptsLights.setValue(false);
myShapeLayer.label = 2;
try {
proj.item(mapComp).layer("CONTROLLER").moveToBeginning();
} catch (err) {return main;
}
var radiusFactor = radius + proj.item(mapComp).layer("CONTROLLER")("Effects")("3D Earth Connections")("Earth Position").value[2];
myShapeLayer("ADBE Transform Group")("ADBE Position").expression = "\nx =  (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[0])/" + radiusFactor + ";\ny =  (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[1])/" + radiusFactor + ";\nz = (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[2])/" + radiusFactor + ";\n[x,y,z]";
myShapeLayer("ADBE Transform Group")("ADBE Scale").expression = "\nx = (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*100)/" + radiusFactor + ";\ny = (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*100)/" + radiusFactor + ";\n[x,y,100];";
if (x1 >= x2) { 
var primoCateto = x2 - x1;
var secondoCateto = y2 - y1;
var catetoZ = z2 - z1;
}
else {
var primoCateto = x1 - x2;
var secondoCateto = y1 - y2;
var catetoZ = z1 - z2;
}
var connectionZRot = radiansToDegrees(Math.asin(secondoCateto / lunghezzaLinea)) * -1;
var connectionYRot = radiansToDegrees(Math.atan(catetoZ / primoCateto)) * -1;
if ((z1 == z2) && (y1 < y2)) { 
var connectionYRot = 0;
var connectionZRot = 0;
myShapeLayer("ADBE Transform Group")("ADBE Rotate Y").setValue(90);
}
if ((z1 == z2) && (y1 > y2)) { 
var connectionYRot = 0;
var connectionZRot = 0;
myShapeLayer("ADBE Transform Group")("ADBE Rotate Y").setValue(-90);
}
myShapeLayer("ADBE Transform Group")("ADBE Orientation").setValue([0, connectionYRot, connectionZRot]);
var slope = radiansToDegrees(Math.atan(primoCateto / lunghezzaLinea));
if (x1 > x2) { 
myShapeLayer("ADBE Transform Group")("ADBE Rotate Y").setValue(180);
}
myShapeLayer("ADBE Transform Group")("ADBE Rotate X").setValue(90 - Math.abs(connectionYRot));
var pseudoFx = myShapeLayer.property("ADBE Effect Parade").addProperty("Pseudo/0.7691538644161564");
pseudoFx.name = "Connection Options";
myShapeLayer("ADBE Root Vectors Group")(3)("ADBE Vector Stroke Color").expression = "try{effect(\"Connection Options\")(\"Line Color\");}catch(err){[1,1,1,1]}";
myShapeLayer("ADBE Root Vectors Group")(3)("ADBE Vector Stroke Opacity").expression = "try{if(effect(\"Connection Options\")(\"Enable Solid Line\")==true){effect(\"Connection Options\")(\"Line Opacity\");}else {0;}}catch(err){100};";
myShapeLayer("ADBE Root Vectors Group")(3)("ADBE Vector Stroke Width").expression = "try{effect(\"Connection Options\")(\"Stroke\")}catch(err){2;}";
myShapeLayer("ADBE Root Vectors Group")(3)("ADBE Vector Stroke Line Cap").setValue(2);
myShapeLayer("ADBE Root Vectors Group")(2)("ADBE Vector Stroke Line Cap").setValue(2);
var dashGroup = myShapeLayer("ADBE Root Vectors Group")(2)("ADBE Vector Stroke Dashes");
dashGroup.addProperty("ADBE Vector Stroke Dash 1").setValue(0);
dashGroup.addProperty("ADBE Vector Stroke Offset").expression = "\ntry{\nif(effect(\"Connection Options\")(\"Animated Dots\")==true){\nif(effect(\"Connection Options\")(\"Invert Dots Animation\")==false){\ntime*effect(\"Connection Options\")(\"Speed\")*3;\n}else{\n-time*effect(\"Connection Options\")(\"Speed\")*3;}\n}else{\n0;}\n}catch(err){0;}";
dashGroup.addProperty("ADBE Vector Stroke Gap 1").expression = "try{effect(\"Connection Options\")(\"Gap\")}catch(err){150;}";
myShapeLayer("ADBE Root Vectors Group")(2)("ADBE Vector Stroke Color").expression = "try{effect(\"Connection Options\")(\"Dots Color\");}catch(err){[1,1,1,1]}";
myShapeLayer("ADBE Root Vectors Group")(2)("ADBE Vector Stroke Width").expression = "\ntry{\n\teffect(\"Connection Options\")(\"Enable Dots\")==false?content(\"Dots\").strokeWidth=0:effect(\"Connection Options\")(\"Size\")-10;\n}catch(err){2;}\n";
myShapeLayer("ADBE Root Vectors Group")(2)("ADBE Vector Stroke Opacity").expression = "effect(\"Connection Options\")(\"Dots Opacity\");";
var startMarker = new MarkerValue("Start");
var endMarker = new MarkerValue("End");
myShapeLayer.property("Marker").setValueAtTime(0, startMarker);
myShapeLayer.property("Marker").setValueAtTime(1, endMarker);
myShapeLayer("ADBE Root Vectors Group")("ADBE Vector Filter - Trim")("ADBE Vector Trim End").expression = "\nstart = marker.key(1).time;\nend = marker.key(2).time;\nfadeOutTime = end - start ;\nease(time,start,start+fadeOutTime,0,100);";
myShapeLayer("ADBE Root Vectors Group")("ADBE Vector Filter - Trim")("ADBE Vector Trim Start").expression = "\ntry{\nif(effect(\"Connection Options\")(\"Enable Jumping Line\")==true){\nstart = marker.key(2).time;\nend = marker.key(2).time+(marker.key(2).time-marker.key(1).time);\noffset = effect(\"Connection Options\")(\"Time Offset\");\nfadeOutTime = end - start;\nease(time,start+offset,start+fadeOutTime+offset,0,100);\n} else { \n0;}\n}catch(err){0;}";
if (taper.value == true) { 
startLength = myShapeLayer("Contents")("Solid Line")("Taper")("Start Length").setValue(50);
endLength = myShapeLayer("Contents")("Solid Line")("Taper")("End Length").setValue(50);
}
};
var coloreStato = [1, 0.58, 0.23, 1];
var colorePin = [0.45, 0.11, 0.4, 1];
countryList.onChange = function () {
selectedCountry = this.selection.toString();
};
colorbutton1.onClick = function () {
if (countryList.selection != null) { 
var selectedCountry = countryList.selection;
countrySelected = selectedCountry.toString();
countriesIndex = countriesIndexFind();
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
if (app.project.item(countriesIndex).layer(i).name == selectedCountry.toString()) { 
countryToColorizeIndex = proj.item(countriesIndex).layer(i).index;
}}
var newcolor1 = colorpicker();
if (newcolor1 === null) { 
return;
}
colorbutton1.fillBrush = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, newcolor1);
colorbutton1.notify("onDraw");
app.project.item(countriesIndex).layer(countryToColorizeIndex).effect("ADBE Fill")("ADBE Fill-0002").setValue(newcolor1);
}
};
onBtn.onClick = function () {
if (countryList.selection != null) { 
mapComp = findCompIndex("Main Composition");
countriesIndex = countriesIndexFind();
var selectedCountry = countryList.selection;
countrySelected = selectedCountry.toString();
app.beginUndoGroup("Highlight Country On");
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
currentTime = app.project.item(mapComp).time;
if (app.project.item(countriesIndex).layer(i).name == countrySelected) { 
var firstKey = app.project.item(countriesIndex).layer(i)("ADBE Transform Group")("ADBE Opacity").setValueAtTime(currentTime, 0);
var secondKey = app.project.item(countriesIndex).layer(i)("ADBE Transform Group")("ADBE Opacity").setValueAtTime(currentTime + 0.3, 100);
}}
app.endUndoGroup();
}
};
offBtn.onClick = function () {
if (countryList.selection != null) { 
mapComp = findCompIndex("Main Composition");
countriesIndex = countriesIndexFind();
var selectedCountry = countryList.selection;
countrySelected = selectedCountry.toString();
app.beginUndoGroup("Highlight Country Off");
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
currentTime = app.project.item(mapComp).time;
if (app.project.item(countriesIndex).layer(i).name == countrySelected) { 
var firstKey = app.project.item(countriesIndex).layer(i)("ADBE Transform Group")("ADBE Opacity").setValueAtTime(currentTime, 100);
var secondKey = app.project.item(countriesIndex).layer(i)("ADBE Transform Group")("ADBE Opacity").setValueAtTime(currentTime + 0.3, 0);
}}
app.endUndoGroup();
}
};
clearBtn.onClick = function () {
if (countryList.selection != null) { 
countriesIndex = countriesIndexFind();
var selectedCountry = countryList.selection;
countrySelected = selectedCountry.toString();
app.beginUndoGroup("Remove selected Highlight");
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
if (app.project.item(countriesIndex).layer(i).name == countrySelected) { 
for (var x = app.project.item(countriesIndex).layer(i)("ADBE Transform Group")("ADBE Opacity").numKeys; x != 0; x--) { 
app.project.item(countriesIndex).layer(i)("ADBE Transform Group")("ADBE Opacity").removeKey(x);}
}}
app.endUndoGroup();
}
};
clearAllBtn.onClick = function () {
countriesIndex = countriesIndexFind();
if (confirm("Attention: This operation will shut down all countries highlights:\nDo you want to confirm?", true, "Warning")) { 
app.beginUndoGroup("Remove all Highlights");
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
for (var x = app.project.item(countriesIndex).layer(i)("ADBE Transform Group")("ADBE Opacity").numKeys; x != 0; x--) { 
app.project.item(countriesIndex).layer(i)("ADBE Transform Group")("ADBE Opacity").removeKey(x);}}
app.endUndoGroup();
}
};
enableBorderLine.onClick = function () {
countriesIndex = countriesIndexFind();
if (this.value == true) { 
sizeBorderLine.enabled = true;
colorBorderLine.enabled = true;
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
app.project.item(countriesIndex).layer(i)("ADBE Layer Styles")("frameFX/enabled")("frameFX/opacity").setValue(100);
app.project.item(countriesIndex).layer(i)("ADBE Layer Styles")("frameFX/enabled")("frameFX/size").setValue(parseFloat(sizeBorderLine.text));}
}
else {
sizeBorderLine.enabled = false;
colorBorderLine.enabled = false;
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
app.project.item(countriesIndex).layer(i)("ADBE Layer Styles")("frameFX/enabled")("frameFX/opacity").setValue(0);
app.project.item(countriesIndex).layer(i)("ADBE Layer Styles")("frameFX/enabled")("frameFX/size").setValue(1);}
}
};
sizeBorderLine.onChange = function () {
countriesIndex = countriesIndexFind();
this.text = this.text.replace(/[^0-9.-]/g, "");
if (this.text != "") { 
thisValue = parseFloat(this.text);
}
else {
alert("Please set a valid number between 1 and 10");
this.text = "1";
thisValue = 1;
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
app.project.item(countriesIndex).layer(i)("ADBE Layer Styles")("frameFX/enabled")("frameFX/size").setValue(thisValue);}
return false;
}
if ((thisValue < 1) || (thisValue > 10)) { 
alert("Please check the border line thickness value. It shall not be less than 1 nor greater than 10");
this.text = "1";
thisValue = 1;
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
app.project.item(countriesIndex).layer(i)("ADBE Layer Styles")("frameFX/enabled")("frameFX/size").setValue(thisValue);}
return false;
}
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
app.project.item(countriesIndex).layer(i)("ADBE Layer Styles")("frameFX/enabled")("frameFX/size").setValue(thisValue);}
};
colorBorderLine.onClick = function () {
countriesIndex = countriesIndexFind();
var borderColor = colorpicker();
if (borderColor === null) { 
return;
}
for (var i = app.project.item(countriesIndex).numLayers; i >= 1; i--) { 
colorBorderLine.fillBrush = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, borderColor);
colorBorderLine.notify("onDraw");
app.project.item(countriesIndex).layer(i)("ADBE Layer Styles")("frameFX/enabled")("frameFX/color").setValue(borderColor);}
};
confirmBtn.onClick = function () {
mapComp = findCompIndex("Main Composition");
if (RotationSpeed.text == "") { 
alert("Please set the speed rotation");
return false;
}
velocita = parseFloat(RotationSpeed.text);
if (velocita < 0) { 
alert("Please check the rotation speed value, only positive values are allowed");
return false;
}
if (CW.value == true) { 
versoRotazione = 1;
}
else {
versoRotazione = -1;
}
if (startingPoint.value == true) { 
var selectedPoints = proj.item(mapComp).selectedLayers;
if (selectedPoints.length == 0) { 
alert("Please select a location point layer");
return false;
}
if (proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Anchor Point").value[0] == 63.5) { 
lon1 = Math.atan(proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[0] / proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[2]) * -1;
selectedLongitude = radiansToDegrees(lon1);
}
else {
alert("Please select a location point. \"" + proj.item(mapComp).layer(selectedPoints[0].index).name + "\" is not a location point");
return false;
}
}
else {
selectedLongitude = 0;
}
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").expression = "[0," + selectedLongitude + "+ time* " + velocita + "*" + versoRotazione + "]";
goToSelected.enabled = false;
wait.enabled = false;
automaticY.enabled = false;
};
RotationSpeed.onChange = function () {
rotationInput = this.text;
this.text = rotationInput.replace(/[^0-9.-]/g, "");
};
mapComp = findCompIndex("Main Composition");
if (proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").expressionEnabled == true) { 
goToSelected.enabled = false;
wait.enabled = false;
automaticY.enabled = false;
}
goToSelected.onClick = function () {
var selectedPoints = proj.item(mapComp).selectedLayers;
if ((selectedPoints.length == 0) || (selectedPoints.length > 1)) { 
alert("Please select a point that you want to reach");
return false;
}
if (proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Anchor Point").value[0] != 63.5) { 
alert("Attention: you can just select points, \"" + proj.item(mapComp).layer(selectedPoints[0].index).name + "\" is not a location point");
return false;
}
addKey(proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation"));
addKey(proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position"));
var lon1 = Math.atan(proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[0] / proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[2]) * -1;
var convertedLong = radiansToDegrees(lon1);
var lat1 = Math.atan(proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[1] / proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[2]);
var convertedLat = radiansToDegrees(lat1);
if ((proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[0] > 0) && (proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[2] > 0)) { 
convertedLong = convertedLong + 180;
}
if ((proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[0] < 0) && (proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[2] > 0)) { 
convertedLong = convertedLong - 180;
}
var puntoDiArrivo = proj.item(mapComp).layer(selectedPoints[0].index).effect("Coordinates")("Point").value;
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").setValueAtTime(currentTime, puntoDiArrivo);
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").setValueAtTime(currentTime, [compWidth / 2, compHeight / 2]);
if (automaticY.value == true) { 
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").setValueAtTime(currentTime, [0, convertedLong]);
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").setValueAtTime(currentTime, [compWidth / 2, compHeight / 2, 0]);
var currentLong = proj.item(mapComp).layer(selectedPoints[0].index)("ADBE Transform Group")("ADBE Position").value[1];
var keyPosition = automaticYPosition(currentLong);
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").setValueAtTime(currentTime, [compWidth / 2, keyPosition, 0]);
}
};
wait.onClick = function () {
addKey(proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation"));
addKey(proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position"));
numberOfKeys = proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").numKeys;
if (numberOfKeys > 0) { 
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").keyValue(numberOfKeys - 1);
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").keyValue(numberOfKeys - 1);
}
else {
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").keyValue(compWidth / 2, compHeight / 2, 0);
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").keyValue(compWidth / 2, compHeight / 2, 0);
}
};
removeAnimation.onClick = function () {
if (confirm("Attention: This operation will remove the current animation, all keyframes and expressions will be deleted\nDo you want to confirm?", true, "Warning")) { 
mapComp = findCompIndex("Main Composition");
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").expression = "";
if (proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").numKeys >= 1) { 
for (var i = proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").numKeys; i >= 1; i--) { 
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").removeKey(i);}
}
if (proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").numKeys >= 1) { 
for (var i = proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").numKeys; i >= 1; i--) { 
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").removeKey(i);}
}
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Rotation").setValue([0, 0]);
proj.item(mapComp).layer("CONTROLLER").effect("3D Earth Connections")("Earth Position").setValue([compWidth / 2, compHeight / 2, 0]);
goToSelected.enabled = true;
wait.enabled = true;
automaticY.enabled = true;
}
else {
return false;
}
};
var pinScelto = app.project.item(findCompIndex("Circular"));
pinStyle.onChange = function () {
if (pinStyle.selection == 0) { 
myPin = "Circular";
}
if (pinStyle.selection == 1) { 
myPin = "Finder";
}
if (pinStyle.selection == 2) { 
myPin = "Hexagon";
}
if (pinStyle.selection == 3) { 
myPin = "Location";
}
if (pinStyle.selection == 4) { 
myPin = "Pulse";
}
if (pinStyle.selection == 5) { 
myPin = "Radio";
}
if (pinStyle.selection == 6) { 
myPin = "Rings";
}
if (pinStyle.selection == 7) { 
myPin = "Snakes";
}
if (pinStyle.selection == 8) { 
myPin = "Reference";
}
if (pinStyle.selection == 9) { 
myPin = "Custom Pin";
}
for (var i = app.project.numItems; i > 0; i--) { 
if (app.project.item(i).name == myPin) { 
pinScelto = app.project.item(i);
}}
};
pinConfirm.onClick = function () {
mapComp = findCompIndex("Main Composition");
var selectedPin = proj.item(mapComp).selectedLayers;
if (selectedPin.length > 0) { 
for (var i = 0; i < selectedPin.length; i++) {
if (proj.item(mapComp).layer(selectedPin[i].index)("ADBE Transform Group")("ADBE Anchor Point").value[0] !== 63.5) { 
alert("Only points can be selected, please try again");
return false;
}
else {
proj.item(mapComp).layer(selectedPin[i].index).replaceSource(pinScelto, true);
}
}
}
else {
alert("Before selecting the Pin Style, you have to select one or more points");
return false;
}
};
connectLabel.onClick = function () {
mapComp = findCompIndex("Main Composition");
var radiusFactor = radius + proj.item(mapComp).layer("CONTROLLER")("Effects")("3D Earth Connections")("Earth Position").value[2];
app.beginUndoGroup("link point label with point");
var anchorValues = new Array();
if (proj.item(mapComp).selectedLayers.length != 2) { 
alert("You must select 2 layers: the point label and the point you want to connect it to");
return false;
}
if (proj.item(mapComp).selectedLayers.length == 2) { 
for (var i = 0; i < proj.item(mapComp).selectedLayers.length; i++) {
thisLayer = proj.item(mapComp).selectedLayers[i].index;
var x = proj.item(mapComp).layer(thisLayer)("ADBE Transform Group")("ADBE Anchor Point").value[1];
anchorValues.push(x);
}
if (((anchorValues[0] == "63.5") && (anchorValues[1] == "250")) || ((anchorValues[1] == "63.5") && (anchorValues[0] == "250"))) { 
anchorValues.length = 0;
for (var i = 0; i < proj.item(mapComp).selectedLayers.length; i++) {
thisLayer = proj.item(mapComp).selectedLayers[i].index;
if (proj.item(mapComp).layer(thisLayer)("ADBE Transform Group")("ADBE Anchor Point").value[1] == 63.5) { 
layerA = thisLayer;
}
else {
layerB = thisLayer;
}
}
pointPosition = proj.item(mapComp).layer(layerA)("ADBE Transform Group")("ADBE Position").value;
pointOrientation = proj.item(mapComp).layer(layerA)("ADBE Transform Group")("ADBE Orientation").value;
myTab = app.project.item(mapComp).layer(layerB);
myTab.threeDLayer = true;
myTab.collapseTransformation = true;
myTab.parent = proj.item(mapComp).layer("GLOBE ANCHOR");
myTab("ADBE Transform Group")("ADBE Position").setValue(pointPosition);
myTab("ADBE Transform Group")("ADBE Position").expression = "\nx =  (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[0])/" + radiusFactor + ";\ny =  (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[1])/" + radiusFactor + ";\nz = (thisComp.layer(\"GLOBE\").effect(\"VIDEOCOPILOT Sphere\")(\"VIDEOCOPILOT Sphere-0016\")*transform.position[2])/" + radiusFactor + ";\n[x,y,z]";
myTab("ADBE Transform Group")("ADBE Orientation").setValue(pointOrientation);
myTab("ADBE Transform Group")("ADBE Opacity").expression = "toCompVec([0,0,1])[2];";
}
else {
alert("Attention, you must select 2 layers: the point label and the point you want to connect it to");
anchorValues.length = 0;
return false;
}
}
};
createRoute.onClick = function () {
function LinearLat(ref, refStart, refEnd, outStart, outEnd) {
formula = ((outEnd * ((ref * -1) + refEnd)) / (refStart - refEnd)) * -1;
return formula;
}
function LinearLong(ref, refStart, refEnd, outStart, outEnd) {
formula = ((outEnd * (ref + refEnd)) / (refStart - refEnd)) * -1;
return formula;
}
var selectedPoints = app.project.activeItem.selectedLayers;
var routeCoordinates = [];
var routePosition = [];
var routeQuality = 1;
var routeComp = app.project.item(findComp("Route Comp"));
var routePoints = proj.item(mapComp).selectedLayers;
if ((selectedPoints.length == 0) || (selectedPoints.length > 2)) { 
alert("Please select two points to create the route");
return false;
}
for (var i = 0; i < selectedPoints.length; i++) {
if (proj.item(mapComp).layer(selectedPoints[i].index)("ADBE Transform Group")("ADBE Anchor Point").value[1] != 63.5) { 
alert("You can select only points");
return false;
}
}
if (routeType.selection == 1) { 
var coordA = proj.item(mapComp).layer(selectedPoints[0].index).effect("ADBE Point Control")("ADBE Point Control-0001").value.reverse().toString();
var coordB = proj.item(mapComp).layer(selectedPoints[1].index).effect("ADBE Point Control")("ADBE Point Control-0001").value.reverse().toString();
var url = "https://api.mapbox.com/directions/v5/mapbox/driving/" + coordA + ";" + coordB + "?geometries=geojson&access_token=pk.eyJ1IjoibWFyY29hcHV6em8iLCJhIjoiY2p6bXJseGZ5MG5rdDNjbzJtZTZqdHFxMCJ9.gUq6FGcZ91b5tGBiK27Vfg";
var jsonRoute = system.callSystem("curl -s -H \"Accept: application/json\" \"" + url + "\"");
x = JSON.parse(jsonRoute);
var numberOfSteps = x.routes[0].geometry.coordinates.length;
for (var i = 1; i < numberOfSteps; i += routeQuality) { 
routeCoordinates.push(x.routes[0].geometry.coordinates[i]);
PosLat = LinearLat(routeCoordinates[i - 1][1], -90, 90, 0, 3000);
PosLon = LinearLong(routeCoordinates[i - 1][0], -180, 180, 0, 6000);
routePosition.push([PosLon, PosLat]);}
}
else {
var coordA = proj.item(mapComp).layer(selectedPoints[0].index).effect("ADBE Point Control")("ADBE Point Control-0001").value;
var coordB = proj.item(mapComp).layer(selectedPoints[1].index).effect("ADBE Point Control")("ADBE Point Control-0001").value;
PosLat_1 = LinearLat(coordA[0], -90, 90, 0, 3000);
PosLon_1 = LinearLong(coordA[1], -180, 180, 0, 6000);
PosLat_2 = LinearLat(coordB[0], -90, 90, 0, 3000);
PosLon_2 = LinearLong(coordB[1], -180, 180, 0, 6000);
routePosition.push([PosLon_1, PosLat_1], [PosLon_2, PosLat_2]);
}
myShapeLayer = routeComp.layers.addShape();
randomId = Math.floor(Math.random() * 999);
myShapeLayer.Effects.addProperty("ADBE Slider Control")("ADBE Slider Control-0001").setValue(randomId);
myShapeLayer("ADBE Effect Parade")("ADBE Slider Control").name = "ID";
myShapeLayer("ADBE Transform Group")("ADBE Position").setValue([0, 0]);
myShapeLayer.name = proj.item(mapComp).selectedLayers[0].name + "->" + proj.item(mapComp).selectedLayers[1].name;
myShapeGroup = myShapeLayer.property("ADBE Root Vectors Group");
myShapeGroup.addProperty("ADBE Vector Shape - Group");
myShapeGroup.addProperty("ADBE Vector Graphic - Stroke");
myShapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Filter - Trim");
var myShape = new Shape();
myShape.vertices = routePosition;
myShape.closed = false;
myShapeGroup.property(1).property("ADBE Vector Shape").setValue(myShape);
var IN = myShapeLayer.Effects.addProperty("ADBE Slider Control");
IN.name = "IN";
var OUT = myShapeLayer.Effects.addProperty("ADBE Slider Control");
OUT.name = "OUT";
savedRoutes.removeAll();
updateRoutes();
};
var routeSelected = null;
savedRoutes.onChange = function () {
if (this.selection != null) { 
var id = this.selection.text;
var layerName = this.selection.subItems[0].text;
for (var i = proj.item(findComp("Route Comp")).numLayers; i >= 1; i--) { 
if ((proj.item(findComp("Route Comp")).layer(i).name == layerName) && (proj.item(findComp("Route Comp")).layer(i)("ADBE Effect Parade")("ADBE Slider Control")("ADBE Slider Control-0001").value == id)) { 
routeSelected = i;
break ;
}}
}
else {
routeSelected = null;
}
if (routeSelected != null) { 
var routeColor = proj.item(findComp("Route Comp")).layer(routeSelected)("ADBE Root Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Color").value;
colorbutton2.fillBrush = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, routeColor);
colorbutton2.notify("onDraw");
var currentRouteThickness = proj.item(findComp("Route Comp")).layer(routeSelected)("ADBE Root Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width").value;
routeThickness.text = currentRouteThickness;
}
};
fadeIn.onClick = function () {
if ((routeSelected != null) && (proj.item(findComp("Route Comp")).numLayers > 0)) { 
mapComp = findCompIndex("Main Composition");
var routeComp = findComp("Route Comp");
var currentTime = proj.item(mapComp).time;
proj.item(routeComp).layer(routeSelected).effect("IN")("ADBE Slider Control-0001").setValue(currentTime);
inizio = proj.item(routeComp).layer(routeSelected).effect("IN")("ADBE Slider Control-0001").value;
fine = proj.item(routeComp).layer(routeSelected).effect("OUT")("ADBE Slider Control-0001").value;
if (inizio > fine) { 
proj.item(routeComp).layer(routeSelected)("ADBE Transform Group")("ADBE Opacity").expression = "Math.min(linear(time," + inizio + "," + inizio + " + .5,0,100),linear(time," + inizio + "," + inizio + " + .5,0,100)); ";
}
else {
proj.item(routeComp).layer(routeSelected)("ADBE Transform Group")("ADBE Opacity").expression = "Math.min(linear(time," + inizio + "," + inizio + " + .5,0,100),linear(time," + fine + "," + fine + " + .5,100,0)); ";
}
}
};
fadeOut.onClick = function () {
if ((routeSelected != null) && (proj.item(findComp("Route Comp")).numLayers > 0)) { 
mapComp = findCompIndex("Main Composition");
var routeComp = findComp("Route Comp");
var currentTime = proj.item(mapComp).time;
proj.item(routeComp).layer(routeSelected).effect("OUT")("ADBE Slider Control-0001").setValue(currentTime);
inizio = proj.item(routeComp).layer(routeSelected).effect("IN")("ADBE Slider Control-0001").value;
fine = proj.item(routeComp).layer(routeSelected).effect("OUT")("ADBE Slider Control-0001").value;
if (inizio > fine) { 
proj.item(routeComp).layer(routeSelected)("ADBE Transform Group")("ADBE Opacity").expression = "Math.min(linear(time," + inizio + "," + inizio + " + .5,0,100),linear(time," + inizio + "," + inizio + " + .5,0,100)); ";
}
else {
proj.item(routeComp).layer(routeSelected)("ADBE Transform Group")("ADBE Opacity").expression = "Math.min(linear(time," + inizio + "," + inizio + " + .5,0,100),linear(time," + fine + "," + fine + " + .5,100,0)); ";
}
}
};
deleteRoute.onClick = function () {
if ((routeSelected != null) && (proj.item(findComp("Route Comp")).numLayers > 0)) { 
proj.item(findComp("Route Comp")).layer(routeSelected).remove();
updateRoutes();
}
};
animateRoute.onClick = function () {
mapComp = findCompIndex("Main Composition");
var routeComp = findComp("Route Comp");
if ((routeSelected != null) && (proj.item(routeComp).numLayers > 0)) { 
var Start = proj.item(mapComp).workAreaStart;
var End = proj.item(mapComp).workAreaDuration + Start;
proj.item(routeComp).layer(routeSelected)("ADBE Root Vectors Group")("ADBE Vector Filter - Trim")("ADBE Vector Trim End").expression = "";
proj.item(routeComp).layer(routeSelected)("ADBE Root Vectors Group")("ADBE Vector Filter - Trim")("ADBE Vector Trim End").expression = "linear(time," + Start + "," + End + ",0,100)";
}
};
no_animationRoute.onClick = function () {
if ((routeSelected != null) && (proj.item(findComp("Route Comp")).numLayers > 0)) { 
var routeComp = findComp("Route Comp");
proj.item(routeComp).layer(routeSelected)("ADBE Root Vectors Group")("ADBE Vector Filter - Trim")("ADBE Vector Trim End").expression = "";
proj.item(routeComp).layer(routeSelected)("ADBE Transform Group")("ADBE Opacity").expression = "";
proj.item(routeComp).layer(routeSelected)("ADBE Transform Group")("ADBE Opacity").setValue(100);
}
};
colorbutton2.onClick = function () {
if ((routeSelected != null) && (proj.item(findComp("Route Comp")).numLayers > 0)) { 
var newcolor2 = colorpicker();
if (newcolor2 === null) { 
return;
}
colorbutton2.fillBrush = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, newcolor2);
colorbutton2.notify("onDraw");
proj.item(findComp("Route Comp")).layer(routeSelected)("ADBE Root Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Color").setValue(newcolor2);
}
};
routeThickness.onChange = function () {
thickness = this.text;
try {
proj.item(findComp("Route Comp")).layer(routeSelected)("ADBE Root Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width").setValue(thickness);
} catch (err) {proj.item(findComp("Route Comp")).layer(routeSelected)("ADBE Root Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width").setValue(2);
routeThickness.text = "2";
}
};
var objectRotation = 180;
var connectionArray = [];
attachObj.onClick = function () {
mainComp = proj.item(findComp("Main Composition"));
var _selectedLayers = mainComp.selectedLayers;
if (_selectedLayers.length > 0) { 
for (var i = 0; i < _selectedLayers.length; i++) {
if ((_selectedLayers[i].name.indexOf("Connection") != -1) && (_selectedLayers[i] instanceof ShapeLayer)) { 
connectionArray.push(_selectedLayers[i].name);
}
else {
alert("Attention, only connections can be selected");
connectionArray.length = 0;
break ;
return;
}
}
}
else {
alert("Please select one or more connections");
return;
}
if (selectedItemComposition() != undefined) { 
addConnectionObjectComp(connectionArray.length);
}
else {
return false;
}
};
invert.onClick = function () {
mainComp = proj.item(findComp("Main Composition"));
var _selectedLayers = mainComp.selectedLayers;
for (var i = 0; i < _selectedLayers.length; i++) {
if (_selectedLayers[i].name.indexOf("Object on") != -1) { 
mainComp.layer(_selectedLayers[i].name)("ADBE Transform Group")("ADBE Rotate Z").setValue(objectRotation += 180);
}
}
};
}
checkProject();
}