!function(t,i){if("object"==typeof exports&&"object"==typeof module)module.exports=i(require("leaflet"));else if("function"==typeof define&&define.amd)define(["leaflet"],i);else{var e="object"==typeof exports?i(require("leaflet")):i(t.L);for(var s in e)("object"==typeof exports?exports:t)[s]=e[s]}}(self,(t=>(()=>{"use strict";var i={953:i=>{i.exports=t}},e={};function s(t){var r=e[t];if(void 0!==r)return r.exports;var n=e[t]={exports:{}};return i[t](n,n.exports,s),n.exports}s.n=t=>{var i=t&&t.__esModule?()=>t.default:()=>t;return s.d(i,{a:i}),i},s.d=(t,i)=>{for(var e in i)s.o(i,e)&&!s.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:i[e]})},s.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return(()=>{s.r(r);var t=s(953),i=s.n(t);function e(t){return Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)}const n=i().Class.extend({initialize:function(t=[],e){i().setOptions(this,e),t.forEach((t=>{t.isOrigin=!0})),this._trackPoints=t,this._timeTick={},this._update()},addTrackPoint:function(t){if(e(t))for(let i=0,e=t.length;i<e;i++)this.addTrackPoint(t[i]);this._addTrackPoint(t)},getTimes:function(){let t=[];for(let i=0,e=this._trackPoints.length;i<e;i++)t.push(this._trackPoints[i].time);return t},getStartTrackPoint:function(){return this._trackPoints[0]},getEndTrackPoint:function(){return this._trackPoints[this._trackPoints.length-1]},getTrackPointByTime:function(t){return this._trackPoints[this._timeTick[t]]},_getCalculateTrackPointByTime:function(t){let e=this.getTrackPointByTime(t),s=this.getStartTrackPoint(),r=this.getEndTrackPoint(),n=this.getTimes();if(t<s.time||t>r.time)return;let o,a=0,h=n.length-1;if(a===h)return e;for(;h-a!=1;)o=parseInt((a+h)/2),t>n[o]?a=o:h=o;let c=n[a],l=n[h],_=t,u=this.getTrackPointByTime(c),p=this.getTrackPointByTime(l);s=i().point(u.lng,u.lat),r=i().point(p.lng,p.lat);let f=s.distanceTo(r);if(f<=0)return e=p,e;let d=f/(l-c),k=(r.y-s.y)/f,T=(r.x-s.x)/f,m=d*(_-c),g=s.x+m*T,x=s.y+m*k,y=r.x>=s.x?180*(.5*Math.PI-Math.asin(k))/Math.PI:180*(1.5*Math.PI+Math.asin(k))/Math.PI;return e?void 0===e.dir&&(e.dir=y):e={lng:g,lat:x,dir:r.dir||y,isOrigin:!1,time:t},e},getTrackPointsBeforeTime:function(t){let i=[];for(let e=0,s=this._trackPoints.length;e<s;e++)this._trackPoints[e].time<t&&i.push(this._trackPoints[e]);let e=this._getCalculateTrackPointByTime(t);return e&&i.push(e),i},_addTrackPoint:function(t){t.isOrigin=!0,this._trackPoints.push(t),this._update()},_update:function(){this._sortTrackPointsByTime(),this._updatetimeTick()},_sortTrackPointsByTime:function(){let t=this._trackPoints.length;for(let i=0;i<t;i++)for(let e=0;e<t-1-i;e++)if(this._trackPoints[e].time>this._trackPoints[e+1].time){let t=this._trackPoints[e+1];this._trackPoints[e+1]=this._trackPoints[e],this._trackPoints[e]=t}},_updatetimeTick:function(){this._timeTick={};for(let t=0,i=this._trackPoints.length;t<i;t++)this._timeTick[this._trackPoints[t].time]=t}}),o=i().Class.extend({initialize:function(t=[],e,s){i().setOptions(this,s),this._tracks=[],this.addTrack(t),this._draw=e,this._updateTime()},getMinTime:function(){return this._minTime},getMaxTime:function(){return this._maxTime},addTrack:function(t){if(e(t))for(let i=0,e=t.length;i<e;i++)this.addTrack(t[i]);else{if(!(t instanceof n))throw new Error("tracks must be an instance of `Track` or an array of `Track` instance!");this._tracks.push(t),this._updateTime()}},drawTracksByTime:function(t){this._draw.clear();for(let i=0,e=this._tracks.length;i<e;i++){let e=this._tracks[i].getTrackPointsBeforeTime(t);e&&e.length&&this._draw.drawTrack(e)}},_updateTime:function(){this._minTime=this._tracks[0].getStartTrackPoint().time,this._maxTime=this._tracks[0].getEndTrackPoint().time;for(let t=0,i=this._tracks.length;t<i;t++){let i=this._tracks[t].getStartTrackPoint().time,e=this._tracks[t].getEndTrackPoint().time;i<this._minTime&&(this._minTime=i),e>this._maxTime&&(this._maxTime=e)}}}),a=i().Class.extend({includes:i().Evented.prototype||i().Mixin.Events,options:{speed:1,maxSpeed:65},initialize:function(t,e){i().setOptions(this,e),this._trackController=t,this._endTime=this._trackController.getMaxTime(),this._curTime=this._trackController.getMinTime(),this._speed=this.options.speed,this._maxSpeed=this.options.maxSpeed,this._intervalID=null,this._lastFpsUpdateTime=0},start:function(){this._intervalID||(this._intervalID=i().Util.requestAnimFrame(this._tick,this))},stop:function(){this._intervalID&&(i().Util.cancelAnimFrame(this._intervalID),this._intervalID=null,this._lastFpsUpdateTime=0)},rePlaying:function(){this.stop(),this._curTime=this._trackController.getMinTime(),this.start()},slowSpeed:function(){this._speed=this._speed<=1?this._speed:this._speed-1,this._intervalID&&(this.stop(),this.start())},quickSpeed:function(){this._speed=this._speed>=this._maxSpeed?this._speed:this._speed+1,this._intervalID&&(this.stop(),this.start())},getSpeed:function(){return this._speed},getCurTime:function(){return this._curTime},getStartTime:function(){return this._trackController.getMinTime()},getEndTime:function(){return this._trackController.getMaxTime()},isPlaying:function(){return!!this._intervalID},setCursor:function(t){this._curTime=t,this._trackController.drawTracksByTime(this._curTime),this.fire("tick",{time:this._curTime})},setSpeed:function(t){this._speed=t,this._intervalID&&(this.stop(),this.start())},_caculatefpsTime:function(t){let i;return i=0===this._lastFpsUpdateTime?0:t-this._lastFpsUpdateTime,this._lastFpsUpdateTime=t,i/=1e3,i},_tick:function(){let t=+new Date,e=!1,s=this._caculatefpsTime(t)*Math.pow(2,this._speed-1);this._curTime+=s,this._curTime>=this._endTime&&(this._curTime=this._endTime,e=!0),this._trackController.drawTracksByTime(this._curTime),this.fire("tick",{time:this._curTime}),e||(this._intervalID=i().Util.requestAnimFrame(this._tick,this))}}),h=i().Renderer.extend({initialize:function(t){i().Renderer.prototype.initialize.call(this,t),this.options.padding=.1},onAdd:function(t){this._container=i().DomUtil.create("canvas","leaflet-zoom-animated"),t.getPane(this.options.pane).appendChild(this._container),this._ctx=this._container.getContext("2d"),this._update()},onRemove:function(t){i().DomUtil.remove(this._container)},getContainer:function(){return this._container},getBounds:function(){return this._bounds},_update:function(){if(!this._map._animatingZoom||!this._bounds){i().Renderer.prototype._update.call(this);var t=this._bounds,e=this._container,s=t.getSize(),r=i().Browser.retina?2:1;i().DomUtil.setPosition(e,t.min),e.width=r*s.x,e.height=r*s.y,e.style.width=s.x+"px",e.style.height=s.y+"px",i().Browser.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}}}),c=i().Class.extend({trackPointOptions:{isDraw:!1,useCanvas:!0,stroke:!1,color:"#ef0300",fill:!0,fillColor:"#ef0300",opacity:.3,radius:4},trackLineOptions:{isDraw:!1,stroke:!0,color:"#1C54E2",weight:2,fill:!1,fillColor:"#000",opacity:.3},targetOptions:{useImg:!1,imgUrl:"../../static/images/ship.png",showText:!1,width:8,height:18,color:"#00f",fillColor:"#9FD12D"},toolTipOptions:{offset:[0,0],direction:"top",permanent:!1},initialize:function(t,e){if(i().extend(this.trackPointOptions,e.trackPointOptions),i().extend(this.trackLineOptions,e.trackLineOptions),i().extend(this.targetOptions,e.targetOptions),i().extend(this.toolTipOptions,e.toolTipOptions),this._showTrackPoint=this.trackPointOptions.isDraw,this._showTrackLine=this.trackLineOptions.isDraw,this._map=t,this._map.on("mousemove",this._onmousemoveEvt,this),this._trackLayer=(new h).addTo(t),this._trackLayer.on("update",this._trackLayerUpdate,this),this._canvas=this._trackLayer.getContainer(),this._ctx=this._canvas.getContext("2d"),this._bufferTracks=[],this.trackPointOptions.useCanvas||(this._trackPointFeatureGroup=i().featureGroup([]).addTo(t)),this.targetOptions.useImg){const t=new Image;t.onload=()=>{this._targetImg=t},t.onerror=()=>{throw new Error("img load error!")},t.src=this.targetOptions.imgUrl}},update:function(){this._trackLayerUpdate()},drawTrack:function(t){this._bufferTracks.push(t),this._drawTrack(t)},showTrackPoint:function(){this._showTrackPoint=!0,this.update()},hideTrackPoint:function(){this._showTrackPoint=!1,this.update()},showTrackLine:function(){this._showTrackLine=!0,this.update()},hideTrackLine:function(){this._showTrackLine=!1,this.update()},remove:function(){this._bufferTracks=[],this._trackLayer.off("update",this._trackLayerUpdate,this),this._map.off("mousemove",this._onmousemoveEvt,this),this._map.hasLayer(this._trackLayer)&&this._map.removeLayer(this._trackLayer),this._map.hasLayer(this._trackPointFeatureGroup)&&this._map.removeLayer(this._trackPointFeatureGroup)},clear:function(){this._clearLayer(),this._bufferTracks=[]},_trackLayerUpdate:function(){this._bufferTracks.length&&(this._clearLayer(),this._bufferTracks.forEach(function(t,i){this._drawTrack(t)}.bind(this)))},_onmousemoveEvt:function(t){if(!this._showTrackPoint)return;let i=t.layerPoint;if(this._bufferTracks.length)for(let t=0,e=this._bufferTracks.length;t<e;t++)for(let e=0,s=this._bufferTracks[t].length;e<s;e++){let s=this._getLayerPoint(this._bufferTracks[t][e]);if(i.distanceTo(s)<=this.trackPointOptions.radius)return void this._opentoolTip(this._bufferTracks[t][e])}this._map.hasLayer(this._tooltip)&&this._map.removeLayer(this._tooltip),this._canvas.style.cursor="pointer"},_opentoolTip:function(t){this._map.hasLayer(this._tooltip)&&this._map.removeLayer(this._tooltip),this._canvas.style.cursor="default";let e=i().latLng(t.lat,t.lng),s=this._tooltip=i().tooltip(this.toolTipOptions);s.setLatLng(e),s.addTo(this._map),s.setContent(this._getTooltipText(t))},_drawTrack:function(t){this._showTrackLine&&this._drawTrackLine(t);let i=t[t.length-1];this.targetOptions.useImg&&this._targetImg?this._drawShipImage(i):this._drawShipCanvas(i),this.targetOptions.showText&&this._drawtxt(`航向：${parseInt(i.dir)}度`,i),this._showTrackPoint&&(this.trackPointOptions.useCanvas?this._drawTrackPointsCanvas(t):this._drawTrackPointsSvg(t))},_drawTrackLine:function(t){let i=this.trackLineOptions,e=this._getLayerPoint(t[0]);this._ctx.save(),this._ctx.beginPath(),this._ctx.moveTo(e.x,e.y);for(let i=1,e=t.length;i<e;i++){let e=this._getLayerPoint(t[i]);this._ctx.lineTo(e.x,e.y)}this._ctx.globalAlpha=i.opacity,i.stroke&&(this._ctx.strokeStyle=i.color,this._ctx.lineWidth=i.weight,this._ctx.stroke()),i.fill&&(this._ctx.fillStyle=i.fillColor,this._ctx.fill()),this._ctx.restore()},_drawTrackPointsCanvas:function(t){let e=this.trackPointOptions;this._ctx.save();for(let s=0,r=t.length;s<r;s++)if(t[s].isOrigin){let r=i().latLng(t[s].lat,t[s].lng),n=e.radius,o=this._map.latLngToLayerPoint(r);this._ctx.beginPath(),this._ctx.arc(o.x,o.y,n,0,2*Math.PI,!1),this._ctx.globalAlpha=e.opacity,e.stroke&&(this._ctx.strokeStyle=e.color,this._ctx.stroke()),e.fill&&(this._ctx.fillStyle=e.fillColor,this._ctx.fill())}this._ctx.restore()},_drawTrackPointsSvg:function(t){for(let e=0,s=t.length;e<s;e++)if(t[e].isOrigin){let s=i().latLng(t[e].lat,t[e].lng),r=i().circleMarker(s,this.trackPointOptions);r.bindTooltip(this._getTooltipText(t[e]),this.toolTipOptions),this._trackPointFeatureGroup.addLayer(r)}},_drawtxt:function(t,i){let e=this._getLayerPoint(i);this._ctx.save(),this._ctx.font="12px Verdana",this._ctx.fillStyle="#000",this._ctx.textAlign="center",this._ctx.textBaseline="bottom",this._ctx.fillText(t,e.x,e.y-12,200),this._ctx.restore()},_drawShipCanvas:function(t){let i=this._getLayerPoint(t),e=t.dir||0,s=this.targetOptions.width,r=this.targetOptions.height,n=r/3;this._ctx.save(),this._ctx.fillStyle=this.targetOptions.fillColor,this._ctx.strokeStyle=this.targetOptions.color,this._ctx.translate(i.x,i.y),this._ctx.rotate(Math.PI/180*e),this._ctx.beginPath(),this._ctx.moveTo(0,0-r/2),this._ctx.lineTo(0-s/2,0-r/2+n),this._ctx.lineTo(0-s/2,0+r/2),this._ctx.lineTo(0+s/2,0+r/2),this._ctx.lineTo(0+s/2,0-r/2+n),this._ctx.closePath(),this._ctx.fill(),this._ctx.stroke(),this._ctx.restore()},_drawShipImage:function(t){let i=this._getLayerPoint(t),e=t.dir||0,s=this.targetOptions.width,r=this.targetOptions.height,n=s/2,o=r/2;this._ctx.save(),this._ctx.translate(i.x,i.y),this._ctx.rotate(Math.PI/180*e),this._ctx.drawImage(this._targetImg,0-n,0-o,s,r),this._ctx.restore()},_getTooltipText:function(t){let i=[];if(i.push("<table>"),t.info&&t.info.length)for(let e=0,s=t.info.length;e<s;e++)i.push("<tr>"),i.push("<td>"+t.info[e].key+"</td>"),i.push("<td>"+t.info[e].value+"</td>"),i.push("</tr>");return i.push("</table>"),i=i.join(""),i},_clearLayer:function(){let t=this._trackLayer.getBounds();if(t){let i=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,i.x,i.y)}else this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);this._map.hasLayer(this._trackPointFeatureGroup)&&this._trackPointFeatureGroup.clearLayers()},_getLayerPoint(t){return this._map.latLngToLayerPoint(i().latLng(t.lat,t.lng))}}),l=i().Class.extend({includes:i().Evented.prototype||i().Mixin.Events,initialize:function(t,i,e={}){let s={trackPointOptions:e.trackPointOptions,trackLineOptions:e.trackLineOptions,targetOptions:e.targetOptions,toolTipOptions:e.toolTipOptions};this.tracks=this._initTracks(t),this.draw=new c(i,s),this.trackController=new o(this.tracks,this.draw),this.clock=new a(this.trackController,e.clockOptions),this.clock.on("tick",this._tick,this)},start:function(){return this.clock.start(),this},stop:function(){return this.clock.stop(),this},rePlaying:function(){return this.clock.rePlaying(),this},slowSpeed:function(){return this.clock.slowSpeed(),this},quickSpeed:function(){return this.clock.quickSpeed(),this},getSpeed:function(){return this.clock.getSpeed()},getCurTime:function(){return this.clock.getCurTime()},getStartTime:function(){return this.clock.getStartTime()},getEndTime:function(){return this.clock.getEndTime()},isPlaying:function(){return this.clock.isPlaying()},setCursor:function(t){return this.clock.setCursor(t),this},setSpeed:function(t){return this.clock.setSpeed(t),this},showTrackPoint:function(){return this.draw.showTrackPoint(),this},hideTrackPoint:function(){return this.draw.hideTrackPoint(),this},showTrackLine:function(){return this.draw.showTrackLine(),this},hideTrackLine:function(){return this.draw.hideTrackLine(),this},dispose:function(){this.clock.off("tick",this._tick),this.draw.remove(),this.tracks=null,this.draw=null,this.trackController=null,this.clock=null},_tick:function(t){this.fire("tick",t)},_initTracks:function(t){let i=[];if(e(t))if(e(t[0]))for(let e=0,s=t.length;e<s;e++)i.push(new n(t[e]));else i.push(new n(t));return i}});i().TrackPlayBack=l,i().trackplayback=function(t,i,e){return new l(t,i,e)}})(),r})()));
//# sourceMappingURL=leaflet.trackplayback.js.map