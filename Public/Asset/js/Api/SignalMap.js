/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2019, Ginkgo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */


var _mKeys = ['AIzaSyBF02Xytwx2peyWWpiUwkQDgng_FYmnBaA'];
var _mDefaultPosition = [23.77133806905457, 120.70937982351438];
var _gInited = false;
var _mInited = false;
var _mFunc = null;
var _mMap = null;
var _polyline = null;
var _mMarkers = [];
var _data = [];

window.gmc = function() { $(window).trigger('gm'); };
function time() { return new Date().getTime(); }
function OAM(t) { this._div=null, this._option=Object.assign({className:"",top:0,left:0,width:32,height:32,html:"",map:null,position:null,css:{}},t),this._option.map&&this.setMap(this._option.map)}
function iOM() { OAM.prototype=new google.maps.OverlayView,Object.assign(OAM.prototype,{setPoint:function(){ if (!this._div) return; if(!this._option.position) return this._div.style.left="-999px",void(this._div.style.top="-999px"); if (!this.getProjection()) return;var t=this.getProjection().fromLatLngToDivPixel(this._option.position);t&&(this._div.style.left=t.x-this._option.width/2+this._option.left+"px",this._div.style.top=t.y-this._option.height/2+this._option.top+"px")},draw:function(){this.setPoint()},onAdd: function() {for(var t in this._div=document.createElement("div"),this._div.style.position="absolute",this._div.className=this._option.className,this._div.style.width=this._option.width+"px",this._div.style.height=this._option.height+"px",this._div.innerHTML=this._option.html,this._option.css)"width"!=t&&"height"!=t&&"top"!=t&&"left"!=t&&"bottom"!=t&&"right"!=t&&(this._div.style[t]=this._option.css[t]);var i=this;google.maps.event.addDomListener(this._div,"click",function(t){t.stopPropagation&&t.stopPropagation(),google.maps.event.trigger(i,"click")}),this.getPanes().overlayImage.appendChild(this._div)},remove:function(){return this._div&&(this._div.parentNode.removeChild(this._div),this._div=null),this},setHtml:function(t){this._option.html=t;return this._div&&(this._div.innerHTML=this._option.html),this},setPosition:function(t){return this.map&&(this._option.position=t,this.setPoint()),this},getPosition:function(){return this._option.position}})}
function genLatLng(t) { return new google.maps.LatLng(t[0][0], t[0][1]); }
function markerRemove(t) { t.map && t.setMap(null); return null; }
function filterNotNull(t) { return t !== null; }
function array1D2D(l, c) { var arr = []; for (var i = 0; i < l.length; i++) if (typeof arr[parseInt(i / c, 10)] == 'undefined') arr[parseInt(i / c, 10)] = [l[i]]; else arr[parseInt(i / c, 10)][i % c] = l[i]; return arr; }
function googleMapsCallback() { if (_mInited) return; else _mInited = true; _mDefaultPosition = genLatLng([_mDefaultPosition]); _mFunc && _mFunc(); }
function googleInit() { if (_gInited) return; else _gInited = true; $(window).bind('gm', googleMapsCallback); var key = _mKeys[Math.floor((Math.random() * _mKeys.length))]; $.getScript('https://maps.googleapis.com/maps/api/js?' + (key ? 'key=' + key + '&' : '') + 'language=zh-TW&libraries=visualization&callback=gmc', googleMapsCallback); return true; }
function cluster(s, u, l, y) { if (!s.length) return y([]); var x = {}; var t = []; for (var i = 0; i < s.length; i++) { if (typeof x[i] !== 'undefined') continue; x[i] = true; var tt = [s[i]]; for (var j = i + 1; j < s.length; j++) { if (l && j == s.length - 1) break; if (typeof x[j] !== 'undefined') continue; var d = Math.max(Math.abs(s[i][0] - s[j][0]), Math.abs(s[i][1] - s[j][1])); if (30 / Math.pow(2, _mMap.zoom) / u <= d) continue; x[j] = true; tt.push(s[j]); } t.push(tt); } x = null; delete x; return y(t); }
function fetch() {
  _mMarkers = _mMarkers.map(markerRemove).filter(filterNotNull);

  cluster(_data, .85, false, function(r) {
    _polyline.setPath(r.map(genLatLng))
    _mMarkers = r.map(function(data) {
      var marker = new OAM({ map: _mMap, position: genLatLng(data), width: 12, height: 12, className: 'marker', html: ("<span data-count='" + data.length + "'>" + '' + "</span>")});
      return marker; });
  });
}

$(function() {
  var $body = $('body');
  var $map = $('#map');
  var $reload = $('#reload');
  var $loading = $('#loading');

  _mFunc = function() {
    if (_mMap) return;
    else _mMap = new google.maps.Map($('#map').get(0), { zoom: 8, clickableIcons: false, disableDefaultUI: true, gestureHandling: 'greedy', center: _mDefaultPosition }); iOM();
    _mMap.mapTypes.set('ms', new google.maps.StyledMapType([{stylers: [{gamma: 0}, {weight: 0.75}] }, {featureType: 'all', stylers: [{ visibility: 'on' }]}, {featureType: 'administrative', stylers: [{ visibility: 'on' }]}, {featureType: 'landscape', stylers: [{ visibility: 'on' }]}, {featureType: 'poi', stylers: [{ visibility: 'on' }]}, {featureType: 'road', stylers: [{ visibility: 'simplified' }]}, {featureType: 'road.arterial', stylers: [{ visibility: 'on' }]}, {featureType: 'transit', stylers: [{ visibility: 'on' }]}, {featureType: 'water', stylers: [{ color: '#b3d1ff', visibility: 'on' }]}, {elementType: "labels.icon", stylers:[{ visibility: 'off' }]}]));
    _mMap.setMapTypeId('ms');

    _polyline = new google.maps.Polyline({ map: _mMap, strokeWeight: 5, strokeColor: 'rgba(66, 134, 244, .75)' });    

    $reload.click(function() {
      $loading.removeClass('hide');

      $.get($map.data('api') + '?t=' + time(), function(r) {
        _data = r
        fetch();
        setTimeout(function() {
          $loading.addClass('hide');
        }, 300);
      });

    }).click();

    _mMap.addListener('idle', fetch);
  };

  googleInit(); 
});