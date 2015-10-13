/* Zepto v1.0rc1 - polyfill zepto event detect fx ajax form touch - zeptojs.com/license */
(function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!="function")throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})})();var Zepto=function(){function A(a){return v.call(a)=="[object Function]"}function B(a){return a instanceof Object}function C(b){var c,d;if(v.call(b)!=="[object Object]")return!1;d=A(b.constructor)&&b.constructor.prototype;if(!d||!hasOwnProperty.call(d,"isPrototypeOf"))return!1;for(c in b);return c===a||hasOwnProperty.call(b,c)}function D(a){return a instanceof Array}function E(a){return typeof a.length=="number"}function F(b){return b.filter(function(b){return b!==a&&b!==null})}function G(a){return a.length>0?[].concat.apply([],a):a}function H(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function I(a){return a in i?i[a]:i[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function J(a,b){return typeof b=="number"&&!k[H(a)]?b+"px":b}function K(a){var b,c;return h[a]||(b=g.createElement(a),g.body.appendChild(b),c=j(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),h[a]=c),h[a]}function L(b,d){return d===a?c(b):c(b).filter(d)}function M(a,b,c,d){return A(b)?b.call(a,c,d):b}function N(a,b,d){var e=a%2?b:b.parentNode;e?e.insertBefore(d,a?a==1?e.firstChild:a==2?b:null:b.nextSibling):c(d).remove()}function O(a,b){b(a);for(var c in a.childNodes)O(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=window.document,h={},i={},j=g.defaultView.getComputedStyle,k={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,m=[1,3,8,9,11],n=["after","prepend","before","append"],o=g.createElement("table"),p=g.createElement("tr"),q={tr:g.createElement("tbody"),tbody:o,thead:o,tfoot:o,td:p,th:p,"*":g.createElement("div")},r=/complete|loaded|interactive/,s=/^\.([\w-]+)$/,t=/^#([\w-]+)$/,u=/^[\w-]+$/,v={}.toString,w={},x,y,z=g.createElement("div");return w.matches=function(a,b){if(!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=z).appendChild(a),d=~w.qsa(e,b).indexOf(a),f&&z.removeChild(a),d},x=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},y=function(a){return a.filter(function(b,c){return a.indexOf(b)==c})},w.fragment=function(b,d){d===a&&(d=l.test(b)&&RegExp.$1),d in q||(d="*");var e=q[d];return e.innerHTML=""+b,c.each(f.call(e.childNodes),function(){e.removeChild(this)})},w.Z=function(a,b){return a=a||[],a.__proto__=arguments.callee.prototype,a.selector=b||"",a},w.isZ=function(a){return a instanceof w.Z},w.init=function(b,d){if(!b)return w.Z();if(A(b))return c(g).ready(b);if(w.isZ(b))return b;var e;if(D(b))e=F(b);else if(C(b))e=[c.extend({},b)],b=null;else if(m.indexOf(b.nodeType)>=0||b===window)e=[b],b=null;else if(l.test(b))e=w.fragment(b.trim(),RegExp.$1),b=null;else{if(d!==a)return c(d).find(b);e=w.qsa(g,b)}return w.Z(e,b)},c=function(a,b){return w.init(a,b)},c.extend=function(c){return f.call(arguments,1).forEach(function(d){for(b in d)d[b]!==a&&(c[b]=d[b])}),c},w.qsa=function(a,b){var c;return a===g&&t.test(b)?(c=a.getElementById(RegExp.$1))?[c]:e:a.nodeType!==1&&a.nodeType!==9?e:f.call(s.test(b)?a.getElementsByClassName(RegExp.$1):u.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},c.isFunction=A,c.isObject=B,c.isArray=D,c.isPlainObject=C,c.inArray=function(a,b,c){return e.indexOf.call(b,a,c)},c.trim=function(a){return a.trim()},c.uuid=0,c.map=function(a,b){var c,d=[],e,f;if(E(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return G(d)},c.each=function(a,b){var c,d;if(E(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,indexOf:e.indexOf,concat:e.concat,map:function(a){return c.map(this,function(b,c){return a.call(b,c,b)})},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return r.test(g.readyState)?a(c):g.addEventListener("DOMContentLoaded",function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return this.forEach(function(b,c){a.call(b,c,b)}),this},filter:function(a){return c([].filter.call(this,function(b){return w.matches(b,a)}))},add:function(a,b){return c(y(this.concat(c(a,b))))},is:function(a){return this.length>0&&w.matches(this[0],a)},not:function(b){var d=[];if(A(b)&&b.call!==a)this.each(function(a){b.call(this,a)||d.push(this)});else{var e=typeof b=="string"?this.filter(b):E(b)&&A(b.item)?f.call(b):c(b);this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})}return c(d)},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!B(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!B(a)?a:c(a)},find:function(a){var b;return this.length==1?b=w.qsa(this[0],a):b=this.map(function(){return w.qsa(this,a)}),c(b)},closest:function(a,b){var d=this[0];while(d&&!w.matches(d,a))d=d!==b&&d!==g&&d.parentNode;return c(d)},parents:function(a){var b=[],d=this;while(d.length>0)d=c.map(d,function(a){if((a=a.parentNode)&&a!==g&&b.indexOf(a)<0)return b.push(a),a});return L(b,a)},parent:function(a){return L(y(this.pluck("parentNode")),a)},children:function(a){return L(this.map(function(){return f.call(this.children)}),a)},siblings:function(a){return L(this.map(function(a,b){return f.call(b.parentNode.children).filter(function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return this.map(function(){return this[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),j(this,"").getPropertyValue("display")=="none"&&(this.style.display=K(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){return this.each(function(){c(this).wrapAll(c(a)[0].cloneNode(!1))})},wrapAll:function(a){return this[0]&&(c(this[0]).before(a=c(a)),a.append(this)),this},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return c(this.map(function(){return this.cloneNode(!0)}))},hide:function(){return this.css("display","none")},toggle:function(b){return(b===a?this.css("display")=="none":b)?this.show():this.hide()},prev:function(){return c(this.pluck("previousElementSibling"))},next:function(){return c(this.pluck("nextElementSibling"))},html:function(b){return b===a?this.length>0?this[0].innerHTML:null:this.each(function(a){var d=this.innerHTML;c(this).empty().append(M(this,b,a,d))})},text:function(b){return b===a?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0||this[0].nodeType!==1?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(this.nodeType!==1)return;if(B(c))for(b in c)this.setAttribute(b,c[b]);else this.setAttribute(c,M(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&this.removeAttribute(a)})},prop:function(b,c){return c===a?this[0]?this[0][b]:a:this.each(function(a){this[b]=M(this,c,a,this[b])})},data:function(b,c){var d=this.attr("data-"+H(b),c);return d!==null?d:a},val:function(b){return b===a?this.length>0?this[0].value:a:this.each(function(a){this.value=M(this,b,a,this.value)})},offset:function(){if(this.length==0)return null;var a=this[0].getBoundingClientRect();return{left:a.left+window.pageXOffset,top:a.top+window.pageYOffset,width:a.width,height:a.height}},css:function(c,d){if(d===a&&typeof c=="string")return this.length==0?a:this[0].style[x(c)]||j(this[0],"").getPropertyValue(c);var e="";for(b in c)typeof c[b]=="string"&&c[b]==""?this.each(function(){this.style.removeProperty(H(b))}):e+=H(b)+":"+J(b,c[b])+";";return typeof c=="string"&&(d==""?this.each(function(){this.style.removeProperty(H(c))}):e=H(c)+":"+J(c,d)),this.each(function(){this.style.cssText+=";"+e})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return this.length<1?!1:I(a).test(this[0].className)},addClass:function(a){return this.each(function(b){d=[];var e=this.className,f=M(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&(this.className+=(e?" ":"")+d.join(" "))})},removeClass:function(b){return this.each(function(c){if(b===a)return this.className="";d=this.className,M(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(I(a)," ")}),this.className=d.trim()})},toggleClass:function(b,d){return this.each(function(e){var f=M(this,b,e,this.className);(d===a?!c(this).hasClass(f):d)?c(this).addClass(f):c(this).removeClass(f)})}},["width","height"].forEach(function(b){c.fn[b]=function(d){var e,f=b.replace(/./,function(a){return a[0].toUpperCase()});return d===a?this[0]==window?window["inner"+f]:this[0]==g?g.documentElement["offset"+f]:(e=this.offset())&&e[b]:this.each(function(a){var e=c(this);e.css(b,M(this,d,a,e[b]()))})}}),n.forEach(function(a,b){c.fn[a]=function(){var a=c.map(arguments,function(a){return B(a)?a:w.fragment(a)});if(a.length<1)return this;var d=this.length,e=d>1,f=b<2;return this.each(function(c,g){for(var h=0;h<a.length;h++){var i=a[f?a.length-h-1:h];O(i,function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&window.eval.call(window,a.innerHTML)}),e&&c<d-1&&(i=i.cloneNode(!0)),N(b,g,i)}})},c.fn[b%2?a+"To":"insert"+(b?"Before":"After")]=function(b){return c(b)[a](this),this}}),w.Z.prototype=c.fn,w.camelize=x,w.uniq=y,c.zepto=w,c}();window.Zepto=Zepto,"$"in window||(window.$=Zepto),function(a){function f(a){return a._zid||(a._zid=d++)}function g(a,b,d,e){b=h(b);if(b.ns)var g=i(b.ns);return(c[f(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||g.test(a.ns))&&(!d||f(a.fn)===f(d))&&(!e||a.sel==e)})}function h(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function i(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function j(b,c,d){a.isObject(b)?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function k(b,d,e,g,i,k){k=!!k;var l=f(b),m=c[l]||(c[l]=[]);j(d,e,function(c,d){var e=i&&i(d,c),f=e||d,j=function(a){var c=f.apply(b,[a].concat(a.data));return c===!1&&a.preventDefault(),c},l=a.extend(h(c),{fn:d,proxy:j,sel:g,del:e,i:m.length});m.push(l),b.addEventListener(l.e,j,k)})}function l(a,b,d,e){var h=f(a);j(b||"",d,function(b,d){g(a,b,d,e).forEach(function(b){delete c[h][b.i],a.removeEventListener(b.e,b.proxy,!1)})})}function p(b){var c=a.extend({originalEvent:b},b);return a.each(o,function(a,d){c[a]=function(){return this[d]=m,b[a].apply(b,arguments)},c[d]=n}),c}function q(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var b=a.zepto.qsa,c={},d=1,e={};e.click=e.mousedown=e.mouseup=e.mousemove="MouseEvents",a.event={add:k,remove:l},a.proxy=function(b,c){if(a.isFunction(b)){var d=function(){return b.apply(c,arguments)};return d._zid=f(b),d}if(typeof c=="string")return a.proxy(b[c],b);throw new TypeError("expected function")},a.fn.bind=function(a,b){return this.each(function(){k(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){l(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){k(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return l(d,b,a),c}})})};var m=function(){return!0},n=function(){return!1},o={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){var e=!1;if(c=="blur"||c=="focus")a.iswebkit?c=c=="blur"?"focusout":c=="focus"?"focusin":c:e=!0;return this.each(function(f,g){k(g,c,d,b,function(c){return function(d){var e,f=a(d.target).closest(b,g).get(0);if(f)return e=a.extend(p(d),{currentTarget:f,liveFired:g}),c.apply(f,[e].concat([].slice.call(arguments,1)))}},e)})},a.fn.undelegate=function(a,b,c){return this.each(function(){l(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return c==undefined||a.isFunction(c)?this.bind(b,c):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return c==undefined||a.isFunction(c)?this.unbind(b,c):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){return typeof b=="string"&&(b=a.Event(b)),q(b),b.data=c,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,h){d=p(typeof b=="string"?a.Event(b):b),d.data=c,d.target=h,a.each(g(h,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){if(a)this.bind(b,a);else if(this.length)try{this.get(0)[b]()}catch(c){}return this}}),a.Event=function(a,b){var c=document.createEvent(e[a]||"Events"),d=!0;if(b)for(var f in b)f=="bubbles"?d=!!b[f]:c[f]=b[f];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c}}(Zepto),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/Kindle\/([\d.]+)/),k=a.match(/Silk\/([\d._]+)/),l=a.match(/(BlackBerry).*Version\/([\d.]+)/);if(c.webkit=!!d)c.version=d[1];e&&(b.android=!0,b.version=e[2]),g&&(b.ios=b.iphone=!0,b.version=g[2].replace(/_/g,".")),f&&(b.ios=b.ipad=!0,b.version=f[2].replace(/_/g,".")),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),l&&(b.blackberry=!0,b.version=l[2]),j&&(b.kindle=!0,b.version=j[1]),k&&(c.silk=!0,c.version=k[1]),!k&&b.android&&a.match(/Kindle Fire/)&&(c.silk=!0)}b.call(a,navigator.userAgent),a.__detect=b}(Zepto),function(a,b){function l(a){return a.toLowerCase()}function m(a){return d?d+a:l(a)}var c="",d,e,f,g={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},h=window.document,i=h.createElement("div"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,k={};a.each(g,function(a,e){if(i.style[a+"TransitionProperty"]!==b)return c="-"+l(a)+"-",d=e,!1}),k[c+"transition-property"]=k[c+"transition-duration"]=k[c+"transition-timing-function"]=k[c+"animation-name"]=k[c+"animation-duration"]="",a.fx={off:d===b&&i.style.transitionProperty===b,cssPrefix:c,transitionEnd:m("TransitionEnd"),animationEnd:m("AnimationEnd")},a.fn.animate=function(b,c,d,e){return a.isObject(c)&&(d=c.easing,e=c.complete,c=c.duration),c&&(c/=1e3),this.anim(b,c,d,e)},a.fn.anim=function(d,e,f,g){var h,i={},l,m=this,n,o=a.fx.transitionEnd;e===b&&(e=.4),a.fx.off&&(e=0);if(typeof d=="string")i[c+"animation-name"]=d,i[c+"animation-duration"]=e+"s",o=a.fx.animationEnd;else{for(l in d)j.test(l)?(h||(h=[]),h.push(l+"("+d[l]+")")):i[l]=d[l];h&&(i[c+"transform"]=h.join(" ")),!a.fx.off&&typeof d=="object"&&(i[c+"transition-property"]=Object.keys(d).join(", "),i[c+"transition-duration"]=e+"s",i[c+"transition-timing-function"]=f||"linear")}return n=function(b){if(typeof b!="undefined"){if(b.target!==b.currentTarget)return;a(b.target).unbind(o,arguments.callee)}a(this).css(k),g&&g.call(this)},e>0&&this.bind(o,n),setTimeout(function(){m.css(i),e<=0&&setTimeout(function(){m.each(function(){n.call(this)})},0)},0),this},i=null}(Zepto),function($){function triggerAndReturn(a,b,c){var d=$.Event(b);return $(a).trigger(d,c),!d.defaultPrevented}function triggerGlobal(a,b,c,d){if(a.global)return triggerAndReturn(b||document,c,d)}function ajaxStart(a){a.global&&$.active++===0&&triggerGlobal(a,null,"ajaxStart")}function ajaxStop(a){a.global&&!--$.active&&triggerGlobal(a,null,"ajaxStop")}function ajaxBeforeSend(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||triggerGlobal(b,c,"ajaxBeforeSend",[a,b])===!1)return!1;triggerGlobal(b,c,"ajaxSend",[a,b])}function ajaxSuccess(a,b,c){var d=c.context,e="success";c.success.call(d,a,e,b),triggerGlobal(c,d,"ajaxSuccess",[b,c,a]),ajaxComplete(e,b,c)}function ajaxError(a,b,c,d){var e=d.context;d.error.call(e,c,b,a),triggerGlobal(d,e,"ajaxError",[c,d,a]),ajaxComplete(b,c,d)}function ajaxComplete(a,b,c){var d=c.context;c.complete.call(d,b,a),triggerGlobal(c,d,"ajaxComplete",[b,c]),ajaxStop(c)}function empty(){}function mimeToDataType(a){return a&&(a==htmlType?"html":a==jsonType?"json":scriptTypeRE.test(a)?"script":xmlTypeRE.test(a)&&"xml")||"text"}function appendQuery(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function serializeData(a){isObject(a.data)&&(a.data=$.param(a.data)),a.data&&(!a.type||a.type.toUpperCase()=="GET")&&(a.url=appendQuery(a.url,a.data))}function serialize(a,b,c,d){var e=$.isArray(b);$.each(b,function(b,f){d&&(b=c?d:d+"["+(e?"":b)+"]"),!d&&e?a.add(f.name,f.value):(c?$.isArray(f):isObject(f))?serialize(a,f,c,b):a.add(b,f)})}var jsonpID=0,isObject=$.isObject,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(a){var b="jsonp"+ ++jsonpID,c=document.createElement("script"),d=function(){$(c).remove(),b in window&&(window[b]=empty),ajaxComplete("abort",e,a)},e={abort:d},f;return a.error&&(c.onerror=function(){e.abort(),a.error()}),window[b]=function(d){clearTimeout(f),$(c).remove(),delete window[b],ajaxSuccess(d,e,a)},serializeData(a),c.src=a.url.replace(/=\?/,"="+b),$("head").append(c),a.timeout>0&&(f=setTimeout(function(){e.abort(),ajaxComplete("timeout",e,a)},a.timeout)),e},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0},$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host);var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,"callback=?")),$.ajaxJSONP(settings);settings.url||(settings.url=window.location.toString()),serializeData(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=$.ajaxSettings.xhr(),abortTimeout;settings.crossDomain||(baseHeaders["X-Requested-With"]="XMLHttpRequest"),mime&&(baseHeaders.Accept=mime,mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime));if(settings.contentType||settings.data&&settings.type.toUpperCase()!="GET")baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded";settings.headers=$.extend(baseHeaders,settings.headers||{}),xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type")),result=xhr.responseText;try{dataType=="script"?(1,eval)(result):dataType=="xml"?result=xhr.responseXML:dataType=="json"&&(result=blankRE.test(result)?null:JSON.parse(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings):ajaxSuccess(result,xhr,settings)}else ajaxError(null,"error",xhr,settings)}};var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);return ajaxBeforeSend(xhr,settings)===!1?(xhr.abort(),!1):(settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr)},$.get=function(a,b){return $.ajax({url:a,success:b})},$.post=function(a,b,c,d){return $.isFunction(b)&&(d=d||c,c=b,b=null),$.ajax({type:"POST",url:a,data:b,success:c,dataType:d})},$.getJSON=function(a,b){return $.ajax({url:a,success:b,dataType:"json"})},$.fn.load=function(a,b){if(!this.length)return this;var c=this,d=a.split(/\s/),e;return d.length>1&&(a=d[0],e=d[1]),$.get(a,function(a){c.html(e?$(document.createElement("div")).html(a.replace(rscript,"")).find(e).html():a),b&&b.call(c)}),this};var escape=encodeURIComponent;$.param=function(a,b){var c=[];return c.add=function(a,b){this.push(escape(a)+"="+escape(b))},serialize(c,a,b),c.join("&").replace("%20","+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function(a){function d(a){return"tagName"in a?a:a.parentNode}function e(a,b,c,d){var e=Math.abs(a-b),f=Math.abs(c-d);return e>=f?a-b>0?"Left":"Right":c-d>0?"Up":"Down"}function h(){g=null,b.last&&(b.el.trigger("longTap"),b={})}function i(){g&&clearTimeout(g),g=null}var b={},c,f=750,g;a(document).ready(function(){var j,k;a(document.body).bind("touchstart",function(e){j=Date.now(),k=j-(b.last||j),b.el=a(d(e.touches[0].target)),c&&clearTimeout(c),b.x1=e.touches[0].pageX,b.y1=e.touches[0].pageY,k>0&&k<=250&&(b.isDoubleTap=!0),b.last=j,g=setTimeout(h,f)}).bind("touchmove",function(a){i(),b.x2=a.touches[0].pageX,b.y2=a.touches[0].pageY}).bind("touchend",function(a){i(),b.isDoubleTap?(b.el.trigger("doubleTap"),b={}):b.x2&&Math.abs(b.x1-b.x2)>30||b.y2&&Math.abs(b.y1-b.y2)>30?(b.el.trigger("swipe")&&b.el.trigger("swipe"+e(b.x1,b.x2,b.y1,b.y2)),b={}):"last"in b&&(b.el.trigger("tap"),c=setTimeout(function(){c=null,b.el.trigger("singleTap"),b={}},250))}).bind("touchcancel",function(){c&&clearTimeout(c),g&&clearTimeout(g),g=c=null,b={}})}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}})}(Zepto);

var HB_H5Menu = {}
window.onload = HB_H5Menu.menu = function() {	
	var _huobaogame_menupop_btn_num = 3; //菜单标签个数

	MenuPopClass = function() {
		this.bodyDom = '';
		this.popDom = '';
		this.a = 2;
		this.moveLock = false; 	//是移动还是点击
		this.menuType = false; 	// 菜单收缩状态
		this.maxLeft = 0; 		//最大letf
		this.maxTop = 0;		//最大top
		this._move = false; 	//移动标记
		this._x;
		this._y;
		this.touchY = 0;
		this.time =''; 			//等待2s 变0.3透明
		this.menupopLength = 0; //菜单长度
	};

	MenuPopClass.prototype = {
		init: function() {
			return this;
		},
		show: function() {	//调用此方法显示按钮
			var tmpl = '',
				show = false,
				defaults = defaults || ''; //外部参数

			this.menupopLength = _huobaogame_menupop_btn_num * 50; //计算菜单长度，每个标签50px

			tmpl = this.tmpl();
			$('body').append(tmpl);
			this.bodyDom = $('body');
			this.popDom = this.bodyDom.find('#huobaogame-menupop');

			this.bind();
		},

		bind:function() {
			var that = this;

			this.maxLeft = document.documentElement.clientWidth - this.popDom.find('div.huobaogame-menupop-btn').width();
			this.maxTop = document.documentElement.clientHeight - this.popDom.find('div.huobaogame-menupop-btn').height();

			this.bodyDom.on('touchstart', '.huobaogame-menupop-btn', function(e) {
				//that.__touchstart(e);
			}, false);
			this.bodyDom.on('touchmove', '.huobaogame-menupop-btn', function(e) {
				//that.__touchmove(e);
			}).on('touchend', '.huobaogame-menupop-btn', function() {
				// that.__touchend(e);
			});

			this.bodyDom.on('touchend', '.huobaogame-menupop-btn', function(e) {
				// that.__touchend(e);
			});
		},

		__touchstart: function(e) {
			e.stopPropagation();//禁用手机默认的触屏滚动行为
			e.preventDefault();
			this.popDom.css({"transition": "none"});

			clearTimeout(this.time);
			this.popDom.css({"opacity": "0.8", "transition": "opacity .2s", "-webkit-transition": "opacity .2s"});
			this.moveLock = false;
			this._move = true;

			var touch = e.touches[0]; //获取第一个触点
			var x = Number(touch.pageX); //页面触点X坐标
			var y = Number(touch.pageY); //页面触点Y坐标
			//记录触点初始位置
			this._x = x - parseInt(this.popDom.css("left")); 
			this._y = y - parseInt(this.popDom.css("top")); 
		},

		__touchmove: function(e) {
			this.moveLock = true;
			if(this._move) {
				var touch = e.touches[0]; //获取第一个触点
				var x = Number(touch.pageX); //页面触点X坐标
				var y = Number(touch.pageY); //页面触点Y坐标
				
				x = (x - this._x),//控件左上角到屏幕左上角的相对位置 
				y = y - this._y;

				x = x > this.maxLeft ? this.maxLeft : x;
				x = x < 0 ? 0 : x;
				y = y > this.maxTop ? this.maxTop : y;
				y = y < 0 ? 0 : y;

				this.touchY = y;

				this.popDom.css({"top":y,"left":x});
			}
		},

		__touchend: function(e) {
			var that = this;
			if(!this.moveLock) {
				if(!this.menuType) {
					this.menuType = true;
					var moveWidth = this.popDom.find('.huobaogame-menupop-content').width() + 50;
					this.popDom.css({"width": moveWidth, "transition": "width .3s ease-out", "-webkit-transition": "width .3s ease-out"});
					this.bodyDom.find('.huobaogame-menupop-btn').css({"background-image": "url(" + HB_H5Game.homeUrl + "api/images/meau/icon_02.png?v20150430001)"});
				} else {
					this.menuType = false;
					this.popDom.css({"width": 50, "transition": "width .3s ease-out", "-webkit-transition": "width .3s ease-out"});
					this.bodyDom.find('.huobaogame-menupop-btn').css({"background-image": "url(" + HB_H5Game.homeUrl + "api/images/meau/icon_01.png?v20150430001)"});
				}
			} else {
				this.popDom.css({"top":this.touchY,"left": 0, "transition": "left .2s ease-out"});   
				this._move = false;
			}
			if(!this.menuType) {
				this.time = setTimeout(function() {
					that.popDom.css({"opacity": "0.2", "transition": "opacity .2s", "-webkit-transition": "opacity .2s"});
				}, 2000);
			} else {
				this.time = setTimeout(function() {
					that.menuType = false;
					that.popDom.css({"opacity": "0.2", "width": 50, "transition": "all .3s ease-out", "-webkit-transition": "all .3s ease-out"});
					that.bodyDom.find('.huobaogame-menupop-btn').css({"background-image": "url(" + HB_H5Game.homeUrl + "api/images/meau/icon_01.png?v20150430001)"});
				}, 2000);
			}

		},

		tmpl: function() {
			var html = '';
			html += '<div class="huobaogame-menupop" id="huobaogame-menupop" style="position: fixed;background-color: #000;left: 0px; top: 60px; z-index: 9999; border-radius: 14px; opacity: 0.2; overflow: hidden; width: 50px; height: 50px;">';
			html += '<div class="huobaogame-menupop-btn" ontouchstart="huobaoGameMenupopObj.__touchstart(event)" ontouchmove="huobaoGameMenupopObj.__touchmove(event);" ontouchend="huobaoGameMenupopObj.__touchend(event);" style="width: 50px; height: 100%;background:#000 url(' + HB_H5Game.homeUrl + 'api/images/meau/icon_01.png?v20150430001) 50% 50% no-repeat;background-size: 60%; position: absolute; z-index: 2; border-radius: 14px"></div>';
			html += '<div class="huobaogame-menupop-content" style="position: absolute; top: 0; width: ' + this.menupopLength + 'px; height: 50px; right: 0px; padding-right: 10px">';
			html += 	'<div onclick=huobaoGameMenupopObj._locate(\"'+HB_H5Game.apiUrl + 'common/navigate!goHome?appId='+ HB_H5Game.params['id'] + '\") ontouchstart=huobaoGameMenupopObj._locate(\"' + HB_H5Game.apiUrl + 'common/navigate!goHome?appId='+ HB_H5Game.params['id'] + '\") class="huobaogame-menupop-icon1" style="position: relative; display: inline-block; width: 50px; height: 100%; background:url(' + HB_H5Game.homeUrl + 'api/images/meau/icon_03.png?v20150430001) 50% 6px no-repeat; background-size: 60%;"><p style="color: #FFF; font: 12px/1 \'microsoft yahei\';  position: absolute;left: 13px;top: 31px;margin: 0;">首页</p></div></a>';
			html += 	'<div onclick=huobaoGameMenupopObj._locate(\"'+HB_H5Game.apiUrl + 'common/navigate!moreGame?appId=' + HB_H5Game.params['id'] + '\") ontouchstart=huobaoGameMenupopObj._locate(\"'+ HB_H5Game.apiUrl + 'common/navigate!moreGame?appId='+ HB_H5Game.params['id'] + '\") class="huobaogame-menupop-icon2" style="position: relative; display: inline-block; width: 50px; height: 100%; background:url(' + HB_H5Game.homeUrl + 'api/images/meau/icon_04.png?v20150430001) 50% 6px no-repeat; background-size: 60%;"><p style="color: #FFF; font: 12px/1 \'microsoft yahei\';  position: absolute;left: 13px;top: 31px;margin: 0;">更多</p></div></a>';
			html += 	'<div onclick=huobaoGameMenupopObj._locate2(\"'+HB_H5Game.apiUrl + 'common/navigate!goPay?appId=' + HB_H5Game.params['id'] + '\") ontouchstart=huobaoGameMenupopObj._locate2(\"'+ HB_H5Game.apiUrl + 'common/navigate!goPay?appId='+ HB_H5Game.params['id'] + '\") class="huobaogame-menupop-icon6" style="position: relative; display: inline-block; width: 50px; height: 100%; background:url(' + HB_H5Game.homeUrl + 'api/images/meau/icon_06.png?v20150430001) 50% 6px no-repeat; background-size: 60%;"><p style="color: #FFF; font: 12px/1 \'microsoft yahei\';  position: absolute;left: 13px;top: 31px;margin: 0;">充值</p></div></a>';
			html += '</div>';
			html += '</div>';
			return html;
		},
		
		_locate: function(url){
			window.location.href=url;
		},
		_locate2: function(url){
			window.open(url, "_blank");
		},
		
		subS:function(){
			
		}
		
	}

	window.huobaoGameMenupopObj = new MenuPopClass();
	huobaoGameMenupopObj.show();
}

var isIe = /msie/i.test(navigator.userAgent);

var HB_H5Game = (function(){
	var HB_H5Login = (function () {
		var callback, callbackObject;
	    function HB_H5Login() {
	    }
	    /**对外提供的login方法*/
	    HB_H5Login.login = function(fun, funClass){
			console.info("对外提供login方法..");
			$("#msg").show();		
	    	callback = fun;
	    	callbackObject = funClass;
			HB_H5Login.checkLogin(checkLoginBack);
			function checkLoginBack(token){
				if(token){
					HB_H5Login.executeCallback(token);
					return;
				}
				HB_H5Login.show(this);
			}
		}
		/**检验是否已登录*/
	    HB_H5Login.checkLogin = function(callback) {
			
			var appId = HB_H5Game.params["id"];//获取appId
			var appKey = HB_H5Game.params["key"];//获取appKey
			var platform = HB_H5Game.params["platform"]?HB_H5Game.params["platform"]:'hb';//获取平台
			if(!appId || !appKey){
				$("#msg").hide();
				callback(false);
				return;
			}
			var postUrl = HB_H5Game.apiUrl + "open/passport!checkLogin?appId="+appId+"&appKey="+appKey+"&platform="+platform;
			HB_H5Game.sendUrl(postUrl, checkLoginBack);
			function checkLoginBack(data){
				if(!data){
					$("#msg").hide();
					callback(false);
					return;
				}
				if(data.code < 1){
					$("#msg").hide();
					callback(false);
					return;
				}
				$("#msg").hide();
				callback(data.data);
			}
		}
	    /**执行回调函数*/
	    HB_H5Login.executeCallback = function (param) {
	    	try{			
	    		HB_H5Login.close();				
	    		callback.call(callbackObject, param);
	    	}catch(e){
	    		console.info(e);
	    	}
	    };
	    /**弹出登录框*/
	    HB_H5Login.show = function(callback){
	    	HB_H5Login.loginBack = callback;
		    var height = HB_H5Game.getHeight();
		    var width = HB_H5Game.getWidth();
		    var scaleRatio = height;
		    if (height > width) {
		        scaleRatio = width;
		    }
		    var scale = scaleRatio / 400;
		    var hbLogin = document.getElementById("loginPanel");
		    if (hbLogin == null) {
		    	var random = Math.floor(Math.random() * ( 1000 + 1));
		    	HB_H5Game.createDiv('loginPanel', scale, '<link rel="stylesheet" type="text/css" href="'+HB_H5Game.homeUrl+'api/css/hb-open.css?'+random+'"><div id="hbLogindiv" class="loginBox"><h3>账号登录</h3><div class="login-id"><div class="li"><label><img src="'+HB_H5Game.homeUrl+'api/images/icon-id.png"></label><input placeholder="输入用户名" type="text" id="pasName" name="pasName"/></div><div class="li"><label><img src="'+HB_H5Game.homeUrl+'api/images/icon-pwd.png" /></label><input placeholder="输入密码" type="password" id="password" name="password"/></div></div><span id="hbLoginSubmit" class="btn btn-login">登录</span><p class="loginLink"><span id="gotoReg" class="color1 fs11">没有账号？注册一个＞</span></p></div><div id="hbRegdiv" class="loginBox"><h3>账号注册</h3><div class="login-id"><div class="li"><label><img src="'+HB_H5Game.homeUrl+'api/images/icon-id.png" /></label><input placeholder="输入手机号" type="text" id="regPhone" name="regPassword"/></div><div class="li"><label><img src="'+HB_H5Game.homeUrl+'api/images/icon-code.png" /></label><input placeholder="输入验证码" type="text" id="regCode" name="regCode" style="width: 35%;"/><span id="hbSendCode" class="btn btn-login">获取验证码</span></div><div class="li"><label><img src="'+HB_H5Game.homeUrl+'api/images/icon-pwd.png" /></label><input placeholder="输入密码" id="regPassword" name="regPassword" type="password"/></div></div><p class="rember-pwd"><input id="protocal" class="inputcheckbox" name="test" value="1" type="checkbox" checked="checked"><label>同意<span id="protocol">《火爆游戏用户协议书》</span></label></p><span id="hbRegSubmit" class="btn btn-login">注册</span><p class="loginLink"><span id="gotoLogin" class="color1 fs11">已有账号？登录＞</span></p></div>', 340, 340);
		    }
		    // 创建登录
	        HB_H5Login.init(callback);
			$("#msg").hide();
		}
	    HB_H5Login.init = function() {
	    	HB_H5Login.switchPanel(0);
	        
	    	// 登录
	    	
	    	
	    	
	    	
	    	var hbLogin = document.getElementById("hbLoginSubmit");
	    	hbLogin.onclick = function() {
	    		HB_H5Login.formSubmit(1);
	    	}
	    	
	    	// 登录跳到注册
	    	var gotoReg = document.getElementById("gotoReg"); 
	    	gotoReg.onclick = function() {
	    		HB_H5Login.switchPanel(2);
	    	}
	    	
	    	// 发送验证码
	    	var hbSendCode = document.getElementById("hbSendCode"); 
	    	hbSendCode.onclick = function() {
	    		HB_H5Login.formSubmit(3);
	    	}
	    	
	    	// 注册跳到登录
	    	var gotoLogin = document.getElementById("gotoLogin"); 
	    	gotoLogin.onclick = function() {
	    		HB_H5Login.switchPanel(1);
	    	}
	  	
	    	// 注册提交
	    	var hbRegSubmit = document.getElementById("hbRegSubmit"); 
	    	hbRegSubmit.onclick = function() {
	    		HB_H5Login.formSubmit(2);
	    	}
	    	
	    	// 协议书
	    	var protocol = document.getElementById("protocol"); 
	    	protocol.onclick = function() {
	    		window.open(HB_H5Game.apiUrl + "common/navigate!protocal", "_blank");
	    	}
	    };
	    
	    HB_H5Login.formSubmit = function(type) {
	    	var patrn=/^1[0-9][0-9]\d{8}$/;
	    	var appId = HB_H5Game.params["id"];//获取appId
			var appKey = HB_H5Game.params["key"];//获取appKey
			var platform = HB_H5Game.params["platform"]?HB_H5Game.params["platform"]:'hb';//获取平台
	    	if (type == 1) {//登录
	    		var pasName = document.getElementById("pasName").value;
	    		var password = document.getElementById("password").value;
	    		if (!pasName || !password) {
	    			alert("您输入的火爆账号或密码为空，请重新输入。");
	    			return;
	    		}
	    		if (!(patrn.test(pasName))) {
	    			alert("您输入的火爆帐号格式错误，请重新输入。");
	    			return;
	    		}
	    		if (!(/^(\w){6,31}$/.test(password))) {
	    			alert("您输入的密码格式错误，请重新输入。");
	    			return;
	    		}
	    		var postUrl = HB_H5Game.apiUrl + "open/passport!login?passportName="+pasName+"&password="+password+"&platform="+platform+"&appId="+appId+"&appKey="+appKey;
	    	} else if (type == 2) {//注册
	    		var phone = document.getElementById("regPhone").value;
	    		var code = document.getElementById("regCode").value;
	    		var password = document.getElementById("regPassword").value;
	    		if (!phone || !code || !password) {
	    			alert("您输入的手机号、验证码或密码为空，请重新输入。");
	    			return;
	    		}
	    		if (!(patrn.test(phone))) {
	    			alert("您输入的手机号格式错误，请重新输入。");
	    			return;
	    		}
	    		if (!(/^\d{4}$/.test(code))) {
	    			alert("您输入的手机验证码格式错误，请重新输入。");
	    			return;
	    		}
	    		if (!(/^(\w){6,31}$/.test(password))) {
	    			alert("您输入的密码格式错误，请输入6-31字符，仅支持字母、数字、下划线。");
	    			return;
	    		}
				var agree = document.getElementById("protocal").checked;
	    		if(!agree){
	    			alert("请阅读并同意用户协议");
	    			return;
	    		}
	    		var postUrl = HB_H5Game.apiUrl + "open/passport!registe?phone="+phone+"&code="+code+"&password="+password+"&platform="+platform+"&appId="+appId+"&appKey="+appKey;
	    	} else if (type == 3) {//发送验证码
	    		//禁用按钮
	    		var node = document.getElementById("hbSendCode");
	    		if(node.getAttribute("disabled")=="disabled"){
	    			return;
	    		}
	    		node.setAttribute("disabled","disabled");
	    		var phone = document.getElementById("regPhone").value;
	    		if (!phone) {
	    			alert("您输入的手机号为空，请重新输入。");
	    			//解除禁用按钮
		    		document.getElementById("hbSendCode").removeAttribute("disabled");
	    			return;
	    		}
	    		if (!(patrn.test(phone))) {
	    			alert("您输入的手机号格式错误，请重新输入。");
	    			//解除禁用按钮
		    		document.getElementById("hbSendCode").removeAttribute("disabled");
	    			return;
	    		}
	    		var postUrl = HB_H5Game.apiUrl + "open/passport!sendRegCode?phone="+phone+"&platform="+platform+"&appId="+appId+"&appKey="+appKey;
	    	} else {
	    		return;
	    	}
	    	if(type != 3){
	    		HB_H5Game.sendUrl(postUrl, loginBack);
	    	}else{
	    		HB_H5Game.sendUrl(postUrl, sendCode);
	    	}
			function loginBack(data) {
				$("#msg").hide();
				if (data.code < 1) {
					alert(data.message);
				} else {
					HB_H5Login.executeCallback(data.data);
				}
			}
			function sendCode(data){
				if (data.code < 1) {
					alert(data.message);
					//解除禁用按钮
		    		document.getElementById("hbSendCode").removeAttribute("disabled");
				} else {
					alert("验证码已发送，有效时间5分钟");
					var count = 60;
					var intId = window.setInterval(function(){
						if(document.getElementById("hbSendCode")){
							document.getElementById("hbSendCode").innerHTML = "("+count+"s)";
						}else{
							window.clearInterval(intId);
							return;
						}
						count-=1;
						if(count==0){
							window.clearInterval(intId);
							//解除禁用按钮
				    		document.getElementById("hbSendCode").removeAttribute("disabled");
				    		document.getElementById("hbSendCode").innerHTML = "获取验证码";
						}
					}, 1000);
				}
			}
	    };
	    HB_H5Login.switchPanel = function(type) {
	    	if (type == 1) {
	    		document.getElementById('hbRegdiv').style.display = "none";
	    		document.getElementById('hbLogindiv').style.display = "block";
	    	}else {
	    		document.getElementById('hbLogindiv').style.display = "none";
	    		document.getElementById('hbRegdiv').style.display = "block";
	    	}
	    };
	    HB_H5Login.close = function(){
	    	HB_H5Game.closeDiv("loginPanel");
	    }
	    return HB_H5Login;
	})();
	HB_H5Login.prototype.__class__ = "HB_H5Login";
	
	var HB_H5Pay = (function(){
		var callback, callbackObject;
		function HB_H5Pay() {
			
	    }
		HB_H5Pay.pay = function(uid, fee, orderId, extend, fun, funClass){
			callback = fun;
	    	callbackObject = funClass;
			if(!uid || !orderId || !fee){
				HB_H5Pay.executeCallback({'code': -101, 'message': 'uid/orderId/fee不可为null!'});
				return;
			}
			if(!/^\d+$/.test(fee)){
				HB_H5Pay.executeCallback({'code': -102, 'message': 'fee必须为整数!'});
				return;
			}
			if(orderId.length<5||orderId.length>80){
				HB_H5Pay.executeCallback({'code': -103, 'message': '订单号长度为5-80字符之间!'});
				return;
			}
			if(!extend && extend.length>125){
				HB_H5Pay.executeCallback({'code': -103, 'message': '透传信息长度为125字符以内!'});
				return;
			}
			var appId = HB_H5Game.params["id"];//获取appId
			var appKey = HB_H5Game.params["key"];//获取appKey
			var platform = HB_H5Game.params["platform"]?HB_H5Game.params["platform"]:'hb';//获取平台
			var postUrl = HB_H5Game.apiUrl + "open/pay!doPay?platform="+platform+"&appId="+appId+"&appKey="+appKey+"&userId="+uid+"&payfee="+fee+"&cpOrderId="+orderId+"&extendInfo="+encodeURIComponent(extend);
			HB_H5Game.sendUrl(postUrl, function(data){
				if(data&&data.code>=1){
					window.location.href=data.data+"&callback="+encodeURIComponent(window.location.href);
				}else{
					HB_H5Pay.executeCallback(data);
				}
			});
		}
		/**执行回调函数*/
		HB_H5Pay.executeCallback = function (param) {
	    	try{
	    		callback.call(callbackObject, param);
	    	}catch(e){
	    		console.info(e);
	    	}
	    };
	    return HB_H5Pay;
	})();
	HB_H5Pay.prototype.__class__ = "HB_H5Pay";
	
	var inited = false;
	function HB_H5Game() {
		
    }
	/**初始化*/
	HB_H5Game.init = function(id, key){
		HB_H5Game.params = HB_H5Game.getAllParam();
		HB_H5Game.params["id"] = id;
		HB_H5Game.params["key"] = key;
		if(!HB_H5Game.params["id"] || !HB_H5Game.params["key"]){
			console.error('参数配置错误！');
			return false;
		}
		inited = true;
		return true;
	}
	/**导航条初始化方法*/
	HB_H5Game.menu = function(){
		HB_H5Menu.menu();
	}
	/**对外提供的login方法*/
	HB_H5Game.login = function(fun, funClass){
		if(!inited){
			console.error('SDK未初始化，请先初始化！');
			return false;
		}
		HB_H5Login.login(fun, funClass);
	}
	/**对外提供的pay方法*/
	HB_H5Game.pay = function(uid, fee, orderId, extend, fun, funClass){
		if(!inited){
			console.error('SDK未初始化，请先初始化！');
			return false;
		}
		HB_H5Pay.pay(uid, fee, orderId, extend, fun, funClass);
	}
	/**工具类，发送请求*/
	HB_H5Game.sendUrl = function (postUrl, onResult, sl) {
		if(!sl){
			sl = 1;
		}
		if(postUrl.lastIndexOf('?')==-1){
			postUrl = postUrl + '?';
		}
	    this.doGet({
	        url: postUrl + "&sl="+sl,
	        onSuccess: function (data) {
	            try{
					var dataObj = eval("(" + data.response + ")");//转换为json对象
					onResult(dataObj);
				}catch(e){}
	        },
	        onFail: function () {
	            onResult(false);
	        }
	    });
	};
	/**工具类，创建XHR发送请求*/
	HB_H5Game.doGet = function (obj) {
	    var url = obj.url;
	    var onSuccess = obj.onSuccess;
	    if (!url) {
	        console.error("no url");
	        return;
	    }
	    if (!onSuccess) {
	        console.error("no onSuccess");
	        return;
	    }
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", url, true);
	    xhr.withCredentials = true;//发送HTTP Cookies和验证信息
	    xhr.send();
	    function onReadyStateChange() {
	        if (xhr.readyState == 4) {
	            if (xhr.status >= 400 || xhr.status == 0) {
	                console.error("404:" + url);
	            }
	            else {
	                var data = { "response": xhr.responseText};
	                onSuccess(data);
	            }
	        }
	    }
	    xhr.onreadystatechange = onReadyStateChange;
	};
	/**执行回调函数*/
	HB_H5Game.executeCallback = function (param) {
		HB_H5Game.callback.call(HB_H5Game.callbackObject, param);
    };
    /**获取所有的参数*/
	HB_H5Game.getAllParam = function () {
		var params = {};
		var nodes = document.getElementsByTagName("meta");
		if(!nodes || nodes.length==0){
			return params;
		}
		for(var i=0;i<nodes.length;i+=1){
			var name = nodes[i].getAttribute('name');
			if(name && name.indexOf('hb-')!=-1){
				param_name = name.substring(3);
				param_value = nodes[i].getAttribute('content');
				params[param_name] = param_value;
			}
		}
		return params;
	};
	/**获取高度*/
	HB_H5Game.getHeight = function () {
	    var winHeight = 0;
	    //获取窗口高度
	    if (window.innerHeight) {
	        winHeight = window.innerHeight;
	    } else if ((document.body) && (document.body.clientHeight)) {
	        winHeight = document.body.clientHeight;
	    }
	    //通过深入Document内部对body进行检测，获取窗口大小
	    if (document.documentElement && document.documentElement.clientHeight) {
	        winHeight = document.documentElement.clientHeight;
	    }
	    return winHeight;
	};
	/**获取宽度*/
	HB_H5Game.getWidth = function () {
	    var winWidth = 0;
	    //获取窗口宽度
	    if (window.innerWidth) {
	        winWidth = window.innerWidth;
	    } else if ((document.body) && (document.body.clientWidth)) {
	        winWidth = document.body.clientWidth;
	    }
	    //通过深入Document内部对body进行检测，获取窗口大小
	    if (document.documentElement && document.documentElement.clientWidth) {
	        winWidth = document.documentElement.clientWidth;
	    }
	    return winWidth;
	};
	/**获取浏览器类型*/
	HB_H5Game.getBrowserType = function () {
		var ua = navigator.userAgent.toLowerCase();
	    if(ua.match(/mqqbrowser/i)=="mqqbrowser") {
	        return 'qq';
	    } else if(ua.match(/MicroMessenger/i)=="micromessenger") {
	        return 'weixin';
	    } else if(ua.match(/chrome/i)=="chrome") {
	        return 'chrome';
	    } else {
	        return 'any';
	    }
	};
	/**添加Cookie*/
	HB_H5Game.addCookie = function (name, value, expiresHours) {
		var rs = HB_H5Game.getAllParam();
		if(window.localStorage && rs["isQQBrowser"]){
			window.localStorage[name] = value;
		} else {
			var cookieString = name + "=" + escape(value);
			//设置cookie时间
			if (expiresHours > 0) {
				var date = new Date();
				date.setTime(date.getTime + expiresHours * 3600 * 1000);
				cookieString = cookieString + "; expires=" + date.toGMTString();
			}
			document.cookie = cookieString;
		}
	};
	/**获取Cookie*/
	HB_H5Game.getCookie = function (name) {
		var rs = HB_H5Game.getAllParam();
		if(window.localStorage && rs["isQQBrowser"]){
			var cookieVal = window.localStorage[name];
			if (cookieVal != undefined) {
				return cookieVal
			}
		} else {
			var strCookie = document.cookie;
			var arrCookie = strCookie.split("; ");
			for (var i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split("=");
				if (arr[0] == name) {
					window.localStorage[name] = arr[1];
					return arr[1];
				}
			}
		}
	    return "";
	};
	/**异步加载JS文件*/
	HB_H5Game.loadjsfile = function (filename, type){
		var oHead = document.getElementsByTagName('HEAD').item(0);
		var oScript= document.createElement("script");
		oScript.type = "text/javascript";
		oScript.src = filename;
		if (type == 'load') {
			if (oScript.hasOwnProperty("async")) {
				oScript.async = false;
			}
	
			oScript.addEventListener('load', function () {
				this.removeEventListener('load', arguments.callee, false);
					HB_H5Game.loadjsfileCallback();
				}, false);
			}
			oHead.appendChild(oScript);
	};
	HB_H5Game.createDiv = function (id, scale, wbody, width, height, left, top) {
        var main = document.createElement("DIV");
        main.setAttribute("id", id);
        main.style.cssText = " -webkit-transform:scale(" + scale + ");width:100%;top:20%;position:absolute;overflow:hidden;padding:0px;z-index:9998;";
        document.body.appendChild(main);
        var inner = document.createElement("DIV");
        inner.style.cssText = "width:100%";
        main.appendChild(inner);
        var content = document.createElement("DIV");
        content.style.cssText = "margin: auto;filter:alpha(Opacity=95,style=0);opacity:1;overflow:hidden;padding:0px";
        content.innerHTML = wbody;
        inner.appendChild(content);
    };
    HB_H5Game.closeDiv = function (id) {
    	var node = document.getElementById(id);
    	if(node){
    		document.body.removeChild(document.getElementById(id));
    	}
    }
	return HB_H5Game;
})();
HB_H5Game.prototype.__class__ = "HB_H5Game";
HB_H5Game.callback;
HB_H5Game.callbackObject;
HB_H5Game.platform;
HB_H5Game.appId;
HB_H5Game.loginType;
HB_H5Game.params;
HB_H5Game.homeUrl="http://static.huobaoyx.com/";
HB_H5Game.apiUrl="http://api.huobaoyx.com/";