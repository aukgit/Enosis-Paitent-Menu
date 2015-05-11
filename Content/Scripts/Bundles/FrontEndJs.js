///#source 1 1 /Content/Scripts/DevOrgPlugins/faster-jQuery.js
/// <reference path="../jquery-2.1.3.js" />
/// <reference path="../jquery-2.1.3.intellisense.js" />

$.faster = {
    browserName: null,
    browserVersion: 0,
    isBrowsersDetected: false,
    isOpera: null,
    isInternetExplorer: null,
    isSafari: null,
    isChrome: null,
    isFirefox: null,
    getById: function (findElementById) {
        "use strict";
        /// <summary>
        /// Get your element by id, there is no need to use #.
        /// However if there is a hash then it will be removed.
        /// </summary>
        /// <param name="findElementById">Your element id, there is no need to use #</param>
        /// <returns>jQuery object , check length property to understand if any exist</returns>
        if (findElementById !== undefined && findElementById !== null && findElementById !== "") {
            var elementsById;
            if (findElementById.charAt(0) !== "#") {
                elementsById = document.getElementById(findElementById);
                return $(elementsById);
            } else {
                var newId = findElementById.slice(1, findElementById.length);
                elementsById = document.getElementById(newId);
                return $(elementsById);
            }
        }
        return $(null);
    },
    //http://jsperf.com/jquery-vs-queryselectorall-selection
    isQuerySelectorSupported: function () {
        if ($.faster.isChrome && $.faster.browserVersion >= 35) {
            return true;
        } else if ($.faster.isFirefox && $.faster.browserVersion >= 8) {
            return true;
        } else if ($.faster.isInternetExplorer && $.faster.browserVersion >= 10) {
            return true;
        } else if ($.faster.isSafari && $.faster.browserVersion >= 5) {
            return true;
        } else if ($.faster.isOpera && $.faster.browserVersion >= 8) {
            return true;
        }
        return false;
    },
    printBrowser: function () {
        var name = $.faster.browserName + " " + $.faster.browserVersion;
        console.log(name);
        return name;
    },

    setBrowserDetectedFlags: function () {
        $.faster.isBrowsersDetected = true;
        $.faster.isChrome = false;
        $.faster.isOpera = false;
        $.faster.isSafari = false;
        $.faster.isFirefox = false;
        $.faster.isInternetExplorer = false;

        if ($.faster.browserName === "Chrome") {
            $.faster.isChrome = true;
        } else if ($.faster.browserName === "Firefox") {
            $.faster.isFirefox = true;
        } else if ($.faster.browserName === "IE") {
            $.faster.isInternetExplorer = true;
        } else if ($.faster.browserName === "Safari") {
            $.faster.isSafari = true;
        } else if ($.faster.browserName === "Opera") {
            $.faster.isOpera = true;
        }

        //console.log("Chrome : " + $.faster.isChrome);
        //console.log("Firefox : " + $.faster.isFirefox);
        //console.log("IE : " + $.faster.isInternetExplorer);
        //console.log("Safari : " + $.faster.isSafari);
        //console.log("Opera : " + $.faster.isOpera);

    },
    detectBrowser: function () {
        if ($.faster.isBrowsersDetected) {
            return $.faster.printBrowser();
        }
        var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            //internet explorer
            $.faster.browserName = "IE";
            $.faster.browserVersion = tem[1] || '';
            //return 'IE ' + (tem[1] || '');

            // all browser flags : isOpera, isChrome..
            $.faster.setBrowserDetectedFlags();
            return $.faster.printBrowser();
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) {
                //opera
                // slice example 
                /**
                 * var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
                 * var citrus = fruits.slice(1, 3);
                 * citrus contains ['Orange','Lemon']
                 */
                var simpleBrowserName = tem.slice(1); // get browser name [0] = browser and [1] = version
                $.faster.browserName = simpleBrowserName[0].replace('OPR', 'Opera');
                $.faster.browserVersion = simpleBrowserName[1];
                // all browser flags : isOpera, isChrome..
                $.faster.setBrowserDetectedFlags();

                return $.faster.printBrowser();
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        var simpleBrowserName2 = M.join(' ').split(" ");
        $.faster.browserName = simpleBrowserName2[0];
        $.faster.browserVersion = simpleBrowserName2[1];
        // all browser flags : isOpera, isChrome..
        $.faster.setBrowserDetectedFlags();
        return $.faster.printBrowser();

    },
    queryAll: function (cssSelector) {
        "use strict";
        /// <summary>
        /// Find all elements and returns as jQuery element and
        /// carefully check which browser it supports and then 
        /// decide which one to choose.
        /// jQuery vs document.querySelector, querySelector is much more faster than jQuery selector. 
        /// In chrome 35 above has better performance so it checks
        /// https://jsperf.com/jquery-vs-document-queryselector
        /// </summary>
        /// <param name="cssSelector">Find all elements</param>
        /// <returns>jQuery object , check length property to understand if any exist</returns>
        if (cssSelector !== undefined && cssSelector !== null && cssSelector !== "") {
            if ($.faster.isQuerySelectorSupported()) {
                var elements;
                elements = document.querySelectorAll(cssSelector);
                return $(elements);
            } else {
                return $(cssSelector);
            }
        }
        return $(null);
    },
    queryFirst: function (cssSelector) {
        "use strict";
        /// <summary>
        /// Find only first element and returns as jQuery element,
        /// it will automatically add :first with your selector
        /// carefully check which browser it supports and then 
        /// decide which one to choose.
        /// jQuery vs document.querySelector, querySelector is much more faster than jQuery selector. 
        /// In chrome 35 above has better performance than jQuery so it checks and usages based on that.
        /// https://jsperf.com/jquery-vs-document-queryselector
        /// </summary>
        /// <param name="cssSelector">Find first element and add ":first" with your selector</param>
        /// <returns>jQuery object , check length property to understand if any exist</returns>
        if (cssSelector !== undefined && cssSelector !== null && cssSelector !== "") {
            if ($.faster.isQuerySelectorSupported) {
                var elements;
                elements = document.querySelector(cssSelector);
                return $(elements);
            } else {
                return $(cssSelector + ":first");
            }
        }
        return $(null);
    }

}
$.faster.detectBrowser();


$.queryAll = function (cssSelector) {
    /// <summary>
    /// Find all elements and returns as jQuery element,
    /// Carefully check which browser it supports and then 
    /// decide which one to choose.
    /// document.querySelectorAll is much more faster than jQuery selector 
    /// In chrome 35 above has better performance so it checks
    /// </summary>
    /// <param name="cssSelector">Find all elements</param>
    /// <returns>jQuery object , check length property to understand if any exist</returns>
    return $.faster.queryAll(cssSelector);
}

$.queryFirst = function (cssSelector) {
    /// <summary>
    /// Find only first element and returns as jQuery element
    /// it will automatically add :first with your selector
    /// Carefully check which browser it supports and then 
    /// decide which one to choose.
    /// document.querySelector is much more faster than jQuery selector 
    /// In chrome 35 above has better performance so it checks
    /// https://jsperf.com/jquery-vs-document-queryselector
    /// </summary>
    /// <param name="cssSelector">Find first element and add ":first" with your selector</param>
    /// <returns>jQuery object , check length property to understand if any exist</returns>
    return $.faster.queryFirst(cssSelector);
}
$.byId = function (findElementById) {
    /// <summary>
    /// Get your element by id, there is no need to use #.
    /// However if there is a hash then it will be removed.
    /// </summary>
    /// <param name="findElementById">Your element id, there is no need to use #</param>
    /// <returns>jQuery object , check length property to understand if any exist</returns>
    if (findElementById !== undefined && findElementById !== null && findElementById !== "") {
        var elementsById;
        if (findElementById.charAt(0) !== "#") {
            elementsById = document.getElementById(findElementById);
            return $(elementsById);
        } else {
            var newId = findElementById.slice(1, findElementById.length);
            elementsById = document.getElementById(newId);
            return $(elementsById);
        }
    }
    return $(null);
}

///#source 1 1 /Content/Scripts/bootstrap.min.js
if(typeof jQuery=="undefined")throw new Error("Bootstrap's JavaScript requires jQuery");+function(n){"use strict";var t=n.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||t[0]==1&&t[1]==9&&t[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");}(jQuery);+function(n){"use strict";function t(){var i=document.createElement("bootstrap"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var t in n)if(i.style[t]!==undefined)return{end:n[t]};return!1}n.fn.emulateTransitionEnd=function(t){var i=!1,u=this,r;n(this).one("bsTransitionEnd",function(){i=!0});return r=function(){i||n(u).trigger(n.support.transition.end)},setTimeout(r,t),this};n(function(){(n.support.transition=t(),n.support.transition)&&(n.event.special.bsTransitionEnd={bindType:n.support.transition.end,delegateType:n.support.transition.end,handle:function(t){if(n(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery);+function(n){"use strict";function u(i){return this.each(function(){var r=n(this),u=r.data("bs.alert");u||r.data("bs.alert",u=new t(this));typeof i=="string"&&u[i].call(r)})}var i='[data-dismiss="alert"]',t=function(t){n(t).on("click",i,this.close)},r;t.VERSION="3.3.4";t.TRANSITION_DURATION=150;t.prototype.close=function(i){function e(){r.detach().trigger("closed.bs.alert").remove()}var f=n(this),u=f.attr("data-target"),r;(u||(u=f.attr("href"),u=u&&u.replace(/.*(?=#[^\s]*$)/,"")),r=n(u),i&&i.preventDefault(),r.length||(r=f.closest(".alert")),r.trigger(i=n.Event("close.bs.alert")),i.isDefaultPrevented())||(r.removeClass("in"),n.support.transition&&r.hasClass("fade")?r.one("bsTransitionEnd",e).emulateTransitionEnd(t.TRANSITION_DURATION):e())};r=n.fn.alert;n.fn.alert=u;n.fn.alert.Constructor=t;n.fn.alert.noConflict=function(){return n.fn.alert=r,this};n(document).on("click.bs.alert.data-api",i,t.prototype.close)}(jQuery);+function(n){"use strict";function i(i){return this.each(function(){var u=n(this),r=u.data("bs.button"),f=typeof i=="object"&&i;r||u.data("bs.button",r=new t(this,f));i=="toggle"?r.toggle():i&&r.setState(i)})}var t=function(i,r){this.$element=n(i);this.options=n.extend({},t.DEFAULTS,r);this.isLoading=!1},r;t.VERSION="3.3.4";t.DEFAULTS={loadingText:"loading..."};t.prototype.setState=function(t){var r="disabled",i=this.$element,f=i.is("input")?"val":"html",u=i.data();t=t+"Text";u.resetText==null&&i.data("resetText",i[f]());setTimeout(n.proxy(function(){i[f](u[t]==null?this.options[t]:u[t]);t=="loadingText"?(this.isLoading=!0,i.addClass(r).attr(r,r)):this.isLoading&&(this.isLoading=!1,i.removeClass(r).removeAttr(r))},this),0)};t.prototype.toggle=function(){var t=!0,i=this.$element.closest('[data-toggle="buttons"]'),n;i.length?(n=this.$element.find("input"),n.prop("type")=="radio"&&(n.prop("checked")&&this.$element.hasClass("active")?t=!1:i.find(".active").removeClass("active")),t&&n.prop("checked",!this.$element.hasClass("active")).trigger("change")):this.$element.attr("aria-pressed",!this.$element.hasClass("active"));t&&this.$element.toggleClass("active")};r=n.fn.button;n.fn.button=i;n.fn.button.Constructor=t;n.fn.button.noConflict=function(){return n.fn.button=r,this};n(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var r=n(t.target);r.hasClass("btn")||(r=r.closest(".btn"));i.call(r,"toggle");t.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){n(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery);+function(n){"use strict";function i(i){return this.each(function(){var u=n(this),r=u.data("bs.carousel"),f=n.extend({},t.DEFAULTS,u.data(),typeof i=="object"&&i),e=typeof i=="string"?i:f.slide;r||u.data("bs.carousel",r=new t(this,f));typeof i=="number"?r.to(i):e?r[e]():f.interval&&r.pause().cycle()})}var t=function(t,i){this.$element=n(t);this.$indicators=this.$element.find(".carousel-indicators");this.options=i;this.paused=null;this.sliding=null;this.interval=null;this.$active=null;this.$items=null;this.options.keyboard&&this.$element.on("keydown.bs.carousel",n.proxy(this.keydown,this));this.options.pause!="hover"||"ontouchstart"in document.documentElement||this.$element.on("mouseenter.bs.carousel",n.proxy(this.pause,this)).on("mouseleave.bs.carousel",n.proxy(this.cycle,this))},u,r;t.VERSION="3.3.4";t.TRANSITION_DURATION=600;t.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0};t.prototype.keydown=function(n){if(!/input|textarea/i.test(n.target.tagName)){switch(n.which){case 37:this.prev();break;case 39:this.next();break;default:return}n.preventDefault()}};t.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(n.proxy(this.next,this),this.options.interval)),this};t.prototype.getItemIndex=function(n){return this.$items=n.parent().children(".item"),this.$items.index(n||this.$active)};t.prototype.getItemForDirection=function(n,t){var i=this.getItemIndex(t),f=n=="prev"&&i===0||n=="next"&&i==this.$items.length-1,r,u;return f&&!this.options.wrap?t:(r=n=="prev"?-1:1,u=(i+r)%this.$items.length,this.$items.eq(u))};t.prototype.to=function(n){var i=this,t=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(n>this.$items.length-1)&&!(n<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){i.to(n)}):t==n?this.pause().cycle():this.slide(n>t?"next":"prev",this.$items.eq(n))};t.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&n.support.transition&&(this.$element.trigger(n.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this};t.prototype.next=function(){if(!this.sliding)return this.slide("next")};t.prototype.prev=function(){if(!this.sliding)return this.slide("prev")};t.prototype.slide=function(i,r){var e=this.$element.find(".item.active"),u=r||this.getItemForDirection(i,e),l=this.interval,f=i=="next"?"left":"right",a=this,o,s,h,c;return u.hasClass("active")?this.sliding=!1:(o=u[0],s=n.Event("slide.bs.carousel",{relatedTarget:o,direction:f}),this.$element.trigger(s),s.isDefaultPrevented())?void 0:(this.sliding=!0,l&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),h=n(this.$indicators.children()[this.getItemIndex(u)]),h&&h.addClass("active")),c=n.Event("slid.bs.carousel",{relatedTarget:o,direction:f}),n.support.transition&&this.$element.hasClass("slide")?(u.addClass(i),u[0].offsetWidth,e.addClass(f),u.addClass(f),e.one("bsTransitionEnd",function(){u.removeClass([i,f].join(" ")).addClass("active");e.removeClass(["active",f].join(" "));a.sliding=!1;setTimeout(function(){a.$element.trigger(c)},0)}).emulateTransitionEnd(t.TRANSITION_DURATION)):(e.removeClass("active"),u.addClass("active"),this.sliding=!1,this.$element.trigger(c)),l&&this.cycle(),this)};u=n.fn.carousel;n.fn.carousel=i;n.fn.carousel.Constructor=t;n.fn.carousel.noConflict=function(){return n.fn.carousel=u,this};r=function(t){var o,r=n(this),u=n(r.attr("data-target")||(o=r.attr("href"))&&o.replace(/.*(?=#[^\s]+$)/,"")),e,f;u.hasClass("carousel")&&(e=n.extend({},u.data(),r.data()),f=r.attr("data-slide-to"),f&&(e.interval=!1),i.call(u,e),f&&u.data("bs.carousel").to(f),t.preventDefault())};n(document).on("click.bs.carousel.data-api","[data-slide]",r).on("click.bs.carousel.data-api","[data-slide-to]",r);n(window).on("load",function(){n('[data-ride="carousel"]').each(function(){var t=n(this);i.call(t,t.data())})})}(jQuery);+function(n){"use strict";function r(t){var i,r=t.attr("data-target")||(i=t.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return n(r)}function i(i){return this.each(function(){var u=n(this),r=u.data("bs.collapse"),f=n.extend({},t.DEFAULTS,u.data(),typeof i=="object"&&i);!r&&f.toggle&&/show|hide/.test(i)&&(f.toggle=!1);r||u.data("bs.collapse",r=new t(this,f));typeof i=="string"&&r[i]()})}var t=function(i,r){this.$element=n(i);this.options=n.extend({},t.DEFAULTS,r);this.$trigger=n('[data-toggle="collapse"][href="#'+i.id+'"],[data-toggle="collapse"][data-target="#'+i.id+'"]');this.transitioning=null;this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger);this.options.toggle&&this.toggle()},u;t.VERSION="3.3.4";t.TRANSITION_DURATION=350;t.DEFAULTS={toggle:!0};t.prototype.dimension=function(){var n=this.$element.hasClass("width");return n?"width":"height"};t.prototype.show=function(){var f,r,e,u,o,s;if(!this.transitioning&&!this.$element.hasClass("in")&&(r=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing"),!r||!r.length||(f=r.data("bs.collapse"),!f||!f.transitioning))&&(e=n.Event("show.bs.collapse"),this.$element.trigger(e),!e.isDefaultPrevented())){if(r&&r.length&&(i.call(r,"hide"),f||r.data("bs.collapse",null)),u=this.dimension(),this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1,o=function(){this.$element.removeClass("collapsing").addClass("collapse in")[u]("");this.transitioning=0;this.$element.trigger("shown.bs.collapse")},!n.support.transition)return o.call(this);s=n.camelCase(["scroll",u].join("-"));this.$element.one("bsTransitionEnd",n.proxy(o,this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s])}};t.prototype.hide=function(){var r,i,u;if(!this.transitioning&&this.$element.hasClass("in")&&(r=n.Event("hide.bs.collapse"),this.$element.trigger(r),!r.isDefaultPrevented())){if(i=this.dimension(),this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1,u=function(){this.transitioning=0;this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")},!n.support.transition)return u.call(this);this.$element[i](0).one("bsTransitionEnd",n.proxy(u,this)).emulateTransitionEnd(t.TRANSITION_DURATION)}};t.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};t.prototype.getParent=function(){return n(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(n.proxy(function(t,i){var u=n(i);this.addAriaAndCollapsedClass(r(u),u)},this)).end()};t.prototype.addAriaAndCollapsedClass=function(n,t){var i=n.hasClass("in");n.attr("aria-expanded",i);t.toggleClass("collapsed",!i).attr("aria-expanded",i)};u=n.fn.collapse;n.fn.collapse=i;n.fn.collapse.Constructor=t;n.fn.collapse.noConflict=function(){return n.fn.collapse=u,this};n(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var u=n(this);u.attr("data-target")||t.preventDefault();var f=r(u),e=f.data("bs.collapse"),o=e?"toggle":u.data();i.call(f,o)})}(jQuery);+function(n){"use strict";function r(t){t&&t.which===3||(n(e).remove(),n(i).each(function(){var r=n(this),i=u(r),f={relatedTarget:this};i.hasClass("open")&&((i.trigger(t=n.Event("hide.bs.dropdown",f)),t.isDefaultPrevented())||(r.attr("aria-expanded","false"),i.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function u(t){var i=t.attr("data-target"),r;return i||(i=t.attr("href"),i=i&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,"")),r=i&&n(i),r&&r.length?r:t.parent()}function o(i){return this.each(function(){var r=n(this),u=r.data("bs.dropdown");u||r.data("bs.dropdown",u=new t(this));typeof i=="string"&&u[i].call(r)})}var e=".dropdown-backdrop",i='[data-toggle="dropdown"]',t=function(t){n(t).on("click.bs.dropdown",this.toggle)},f;t.VERSION="3.3.4";t.prototype.toggle=function(t){var f=n(this),i,o,e;if(!f.is(".disabled, :disabled")){if(i=u(f),o=i.hasClass("open"),r(),!o){if("ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length)n('<div class="dropdown-backdrop"/>').insertAfter(n(this)).on("click",r);if(e={relatedTarget:this},i.trigger(t=n.Event("show.bs.dropdown",e)),t.isDefaultPrevented())return;f.trigger("focus").attr("aria-expanded","true");i.toggleClass("open").trigger("shown.bs.dropdown",e)}return!1}};t.prototype.keydown=function(t){var e,o,s,h,f,r;if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)&&(e=n(this),t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled"))){if(o=u(e),s=o.hasClass("open"),!s&&t.which!=27||s&&t.which==27)return t.which==27&&o.find(i).trigger("focus"),e.trigger("click");(h=" li:not(.disabled):visible a",f=o.find('[role="menu"]'+h+', [role="listbox"]'+h),f.length)&&(r=f.index(t.target),t.which==38&&r>0&&r--,t.which==40&&r<f.length-1&&r++,~r||(r=0),f.eq(r).trigger("focus"))}};f=n.fn.dropdown;n.fn.dropdown=o;n.fn.dropdown.Constructor=t;n.fn.dropdown.noConflict=function(){return n.fn.dropdown=f,this};n(document).on("click.bs.dropdown.data-api",r).on("click.bs.dropdown.data-api",".dropdown form",function(n){n.stopPropagation()}).on("click.bs.dropdown.data-api",i,t.prototype.toggle).on("keydown.bs.dropdown.data-api",i,t.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',t.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',t.prototype.keydown)}(jQuery);+function(n){"use strict";function i(i,r){return this.each(function(){var f=n(this),u=f.data("bs.modal"),e=n.extend({},t.DEFAULTS,f.data(),typeof i=="object"&&i);u||f.data("bs.modal",u=new t(this,e));typeof i=="string"?u[i](r):e.show&&u.show(r)})}var t=function(t,i){this.options=i;this.$body=n(document.body);this.$element=n(t);this.$dialog=this.$element.find(".modal-dialog");this.$backdrop=null;this.isShown=null;this.originalBodyPad=null;this.scrollbarWidth=0;this.ignoreBackdropClick=!1;this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,n.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))},r;t.VERSION="3.3.4";t.TRANSITION_DURATION=300;t.BACKDROP_TRANSITION_DURATION=150;t.DEFAULTS={backdrop:!0,keyboard:!0,show:!0};t.prototype.toggle=function(n){return this.isShown?this.hide():this.show(n)};t.prototype.show=function(i){var r=this,u=n.Event("show.bs.modal",{relatedTarget:i});if(this.$element.trigger(u),!this.isShown&&!u.isDefaultPrevented()){this.isShown=!0;this.checkScrollbar();this.setScrollbar();this.$body.addClass("modal-open");this.escape();this.resize();this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',n.proxy(this.hide,this));this.$dialog.on("mousedown.dismiss.bs.modal",function(){r.$element.one("mouseup.dismiss.bs.modal",function(t){n(t.target).is(r.$element)&&(r.ignoreBackdropClick=!0)})});this.backdrop(function(){var f=n.support.transition&&r.$element.hasClass("fade"),u;r.$element.parent().length||r.$element.appendTo(r.$body);r.$element.show().scrollTop(0);r.adjustDialog();f&&r.$element[0].offsetWidth;r.$element.addClass("in").attr("aria-hidden",!1);r.enforceFocus();u=n.Event("shown.bs.modal",{relatedTarget:i});f?r.$dialog.one("bsTransitionEnd",function(){r.$element.trigger("focus").trigger(u)}).emulateTransitionEnd(t.TRANSITION_DURATION):r.$element.trigger("focus").trigger(u)})}};t.prototype.hide=function(i){(i&&i.preventDefault(),i=n.Event("hide.bs.modal"),this.$element.trigger(i),this.isShown&&!i.isDefaultPrevented())&&(this.isShown=!1,this.escape(),this.resize(),n(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),n.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",n.proxy(this.hideModal,this)).emulateTransitionEnd(t.TRANSITION_DURATION):this.hideModal())};t.prototype.enforceFocus=function(){n(document).off("focusin.bs.modal").on("focusin.bs.modal",n.proxy(function(n){this.$element[0]===n.target||this.$element.has(n.target).length||this.$element.trigger("focus")},this))};t.prototype.escape=function(){if(this.isShown&&this.options.keyboard)this.$element.on("keydown.dismiss.bs.modal",n.proxy(function(n){n.which==27&&this.hide()},this));else this.isShown||this.$element.off("keydown.dismiss.bs.modal")};t.prototype.resize=function(){if(this.isShown)n(window).on("resize.bs.modal",n.proxy(this.handleUpdate,this));else n(window).off("resize.bs.modal")};t.prototype.hideModal=function(){var n=this;this.$element.hide();this.backdrop(function(){n.$body.removeClass("modal-open");n.resetAdjustments();n.resetScrollbar();n.$element.trigger("hidden.bs.modal")})};t.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove();this.$backdrop=null};t.prototype.backdrop=function(i){var e=this,f=this.$element.hasClass("fade")?"fade":"",r,u;if(this.isShown&&this.options.backdrop){r=n.support.transition&&f;this.$backdrop=n('<div class="modal-backdrop '+f+'" />').appendTo(this.$body);this.$element.on("click.dismiss.bs.modal",n.proxy(function(n){if(this.ignoreBackdropClick){this.ignoreBackdropClick=!1;return}n.target===n.currentTarget&&(this.options.backdrop=="static"?this.$element[0].focus():this.hide())},this));if(r&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!i)return;r?this.$backdrop.one("bsTransitionEnd",i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION):i()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),u=function(){e.removeBackdrop();i&&i()},n.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION):u()):i&&i()};t.prototype.handleUpdate=function(){this.adjustDialog()};t.prototype.adjustDialog=function(){var n=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&n?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!n?this.scrollbarWidth:""})};t.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})};t.prototype.checkScrollbar=function(){var n=window.innerWidth,t;n||(t=document.documentElement.getBoundingClientRect(),n=t.right-Math.abs(t.left));this.bodyIsOverflowing=document.body.clientWidth<n;this.scrollbarWidth=this.measureScrollbar()};t.prototype.setScrollbar=function(){var n=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";this.bodyIsOverflowing&&this.$body.css("padding-right",n+this.scrollbarWidth)};t.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)};t.prototype.measureScrollbar=function(){var n=document.createElement("div"),t;return n.className="modal-scrollbar-measure",this.$body.append(n),t=n.offsetWidth-n.clientWidth,this.$body[0].removeChild(n),t};r=n.fn.modal;n.fn.modal=i;n.fn.modal.Constructor=t;n.fn.modal.noConflict=function(){return n.fn.modal=r,this};n(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var r=n(this),f=r.attr("href"),u=n(r.attr("data-target")||f&&f.replace(/.*(?=#[^\s]+$)/,"")),e=u.data("bs.modal")?"toggle":n.extend({remote:!/#/.test(f)&&f},u.data(),r.data());r.is("a")&&t.preventDefault();u.one("show.bs.modal",function(n){if(!n.isDefaultPrevented())u.one("hidden.bs.modal",function(){r.is(":visible")&&r.trigger("focus")})});i.call(u,e,this)})}(jQuery);+function(n){"use strict";function r(i){return this.each(function(){var u=n(this),r=u.data("bs.tooltip"),f=typeof i=="object"&&i;(r||!/destroy|hide/.test(i))&&(r||u.data("bs.tooltip",r=new t(this,f)),typeof i=="string"&&r[i]())})}var t=function(n,t){this.type=null;this.options=null;this.enabled=null;this.timeout=null;this.hoverState=null;this.$element=null;this.init("tooltip",n,t)},i;t.VERSION="3.3.4";t.TRANSITION_DURATION=150;t.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}};t.prototype.init=function(t,i,r){var f,e,u,o,s;if(this.enabled=!0,this.type=t,this.$element=n(i),this.options=this.getOptions(r),this.$viewport=this.options.viewport&&n(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(f=this.options.trigger.split(" "),e=f.length;e--;)if(u=f[e],u=="click")this.$element.on("click."+this.type,this.options.selector,n.proxy(this.toggle,this));else if(u!="manual"){o=u=="hover"?"mouseenter":"focusin";s=u=="hover"?"mouseleave":"focusout";this.$element.on(o+"."+this.type,this.options.selector,n.proxy(this.enter,this));this.$element.on(s+"."+this.type,this.options.selector,n.proxy(this.leave,this))}this.options.selector?this._options=n.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()};t.prototype.getDefaults=function(){return t.DEFAULTS};t.prototype.getOptions=function(t){return t=n.extend({},this.getDefaults(),this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t};t.prototype.getDelegateOptions=function(){var t={},i=this.getDefaults();return this._options&&n.each(this._options,function(n,r){i[n]!=r&&(t[n]=r)}),t};t.prototype.enter=function(t){var i=t instanceof this.constructor?t:n(t.currentTarget).data("bs."+this.type);if(i&&i.$tip&&i.$tip.is(":visible")){i.hoverState="in";return}if(i||(i=new this.constructor(t.currentTarget,this.getDelegateOptions()),n(t.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="in",!i.options.delay||!i.options.delay.show)return i.show();i.timeout=setTimeout(function(){i.hoverState=="in"&&i.show()},i.options.delay.show)};t.prototype.leave=function(t){var i=t instanceof this.constructor?t:n(t.currentTarget).data("bs."+this.type);if(i||(i=new this.constructor(t.currentTarget,this.getDelegateOptions()),n(t.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="out",!i.options.delay||!i.options.delay.hide)return i.hide();i.timeout=setTimeout(function(){i.hoverState=="out"&&i.hide()},i.options.delay.hide)};t.prototype.show=function(){var c=n.Event("show.bs."+this.type),l,p,h;if(this.hasContent()&&this.enabled){if(this.$element.trigger(c),l=n.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]),c.isDefaultPrevented()||!l)return;var u=this,r=this.tip(),a=this.getUID(this.type);this.setContent();r.attr("id",a);this.$element.attr("aria-describedby",a);this.options.animation&&r.addClass("fade");var i=typeof this.options.placement=="function"?this.options.placement.call(this,r[0],this.$element[0]):this.options.placement,v=/\s?auto?\s?/i,y=v.test(i);y&&(i=i.replace(v,"")||"top");r.detach().css({top:0,left:0,display:"block"}).addClass(i).data("bs."+this.type,this);this.options.container?r.appendTo(this.options.container):r.insertAfter(this.$element);var f=this.getPosition(),o=r[0].offsetWidth,s=r[0].offsetHeight;if(y){var w=i,b=this.options.container?n(this.options.container):this.$element.parent(),e=this.getPosition(b);i=i=="bottom"&&f.bottom+s>e.bottom?"top":i=="top"&&f.top-s<e.top?"bottom":i=="right"&&f.right+o>e.width?"left":i=="left"&&f.left-o<e.left?"right":i;r.removeClass(w).addClass(i)}p=this.getCalculatedOffset(i,f,o,s);this.applyPlacement(p,i);h=function(){var n=u.hoverState;u.$element.trigger("shown.bs."+u.type);u.hoverState=null;n=="out"&&u.leave(u)};n.support.transition&&this.$tip.hasClass("fade")?r.one("bsTransitionEnd",h).emulateTransitionEnd(t.TRANSITION_DURATION):h()}};t.prototype.applyPlacement=function(t,i){var r=this.tip(),l=r[0].offsetWidth,e=r[0].offsetHeight,o=parseInt(r.css("margin-top"),10),s=parseInt(r.css("margin-left"),10),h,f,u;isNaN(o)&&(o=0);isNaN(s)&&(s=0);t.top=t.top+o;t.left=t.left+s;n.offset.setOffset(r[0],n.extend({using:function(n){r.css({top:Math.round(n.top),left:Math.round(n.left)})}},t),0);r.addClass("in");h=r[0].offsetWidth;f=r[0].offsetHeight;i=="top"&&f!=e&&(t.top=t.top+e-f);u=this.getViewportAdjustedDelta(i,t,h,f);u.left?t.left+=u.left:t.top+=u.top;var c=/top|bottom/.test(i),a=c?u.left*2-l+h:u.top*2-e+f,v=c?"offsetWidth":"offsetHeight";r.offset(t);this.replaceArrow(a,r[0][v],c)};t.prototype.replaceArrow=function(n,t,i){this.arrow().css(i?"left":"top",50*(1-n/t)+"%").css(i?"top":"left","")};t.prototype.setContent=function(){var n=this.tip(),t=this.getTitle();n.find(".tooltip-inner")[this.options.html?"html":"text"](t);n.removeClass("fade in top bottom left right")};t.prototype.hide=function(i){function e(){u.hoverState!="in"&&r.detach();u.$element.removeAttr("aria-describedby").trigger("hidden.bs."+u.type);i&&i()}var u=this,r=n(this.$tip),f=n.Event("hide.bs."+this.type);if(this.$element.trigger(f),!f.isDefaultPrevented())return r.removeClass("in"),n.support.transition&&r.hasClass("fade")?r.one("bsTransitionEnd",e).emulateTransitionEnd(t.TRANSITION_DURATION):e(),this.hoverState=null,this};t.prototype.fixTitle=function(){var n=this.$element;(n.attr("title")||typeof n.attr("data-original-title")!="string")&&n.attr("data-original-title",n.attr("title")||"").attr("title","")};t.prototype.hasContent=function(){return this.getTitle()};t.prototype.getPosition=function(t){t=t||this.$element;var u=t[0],r=u.tagName=="BODY",i=u.getBoundingClientRect();i.width==null&&(i=n.extend({},i,{width:i.right-i.left,height:i.bottom-i.top}));var f=r?{top:0,left:0}:t.offset(),e={scroll:r?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},o=r?{width:n(window).width(),height:n(window).height()}:null;return n.extend({},i,e,o,f)};t.prototype.getCalculatedOffset=function(n,t,i,r){return n=="bottom"?{top:t.top+t.height,left:t.left+t.width/2-i/2}:n=="top"?{top:t.top-r,left:t.left+t.width/2-i/2}:n=="left"?{top:t.top+t.height/2-r/2,left:t.left-i}:{top:t.top+t.height/2-r/2,left:t.left+t.width}};t.prototype.getViewportAdjustedDelta=function(n,t,i,r){var f={top:0,left:0},e,u,o,s,h,c;return this.$viewport?(e=this.options.viewport&&this.options.viewport.padding||0,u=this.getPosition(this.$viewport),/right|left/.test(n)?(o=t.top-e-u.scroll,s=t.top+e-u.scroll+r,o<u.top?f.top=u.top-o:s>u.top+u.height&&(f.top=u.top+u.height-s)):(h=t.left-e,c=t.left+e+i,h<u.left?f.left=u.left-h:c>u.width&&(f.left=u.left+u.width-c)),f):f};t.prototype.getTitle=function(){var t=this.$element,n=this.options;return t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title)};t.prototype.getUID=function(n){do n+=~~(Math.random()*1e6);while(document.getElementById(n));return n};t.prototype.tip=function(){return this.$tip=this.$tip||n(this.options.template)};t.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")};t.prototype.enable=function(){this.enabled=!0};t.prototype.disable=function(){this.enabled=!1};t.prototype.toggleEnabled=function(){this.enabled=!this.enabled};t.prototype.toggle=function(t){var i=this;t&&(i=n(t.currentTarget).data("bs."+this.type),i||(i=new this.constructor(t.currentTarget,this.getDelegateOptions()),n(t.currentTarget).data("bs."+this.type,i)));i.tip().hasClass("in")?i.leave(i):i.enter(i)};t.prototype.destroy=function(){var n=this;clearTimeout(this.timeout);this.hide(function(){n.$element.off("."+n.type).removeData("bs."+n.type)})};i=n.fn.tooltip;n.fn.tooltip=r;n.fn.tooltip.Constructor=t;n.fn.tooltip.noConflict=function(){return n.fn.tooltip=i,this}}(jQuery);+function(n){"use strict";function r(i){return this.each(function(){var u=n(this),r=u.data("bs.popover"),f=typeof i=="object"&&i;(r||!/destroy|hide/.test(i))&&(r||u.data("bs.popover",r=new t(this,f)),typeof i=="string"&&r[i]())})}var t=function(n,t){this.init("popover",n,t)},i;if(!n.fn.tooltip)throw new Error("Popover requires tooltip.js");t.VERSION="3.3.4";t.DEFAULTS=n.extend({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'});t.prototype=n.extend({},n.fn.tooltip.Constructor.prototype);t.prototype.constructor=t;t.prototype.getDefaults=function(){return t.DEFAULTS};t.prototype.setContent=function(){var n=this.tip(),i=this.getTitle(),t=this.getContent();n.find(".popover-title")[this.options.html?"html":"text"](i);n.find(".popover-content").children().detach().end()[this.options.html?typeof t=="string"?"html":"append":"text"](t);n.removeClass("fade top bottom left right in");n.find(".popover-title").html()||n.find(".popover-title").hide()};t.prototype.hasContent=function(){return this.getTitle()||this.getContent()};t.prototype.getContent=function(){var t=this.$element,n=this.options;return t.attr("data-content")||(typeof n.content=="function"?n.content.call(t[0]):n.content)};t.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};i=n.fn.popover;n.fn.popover=r;n.fn.popover.Constructor=t;n.fn.popover.noConflict=function(){return n.fn.popover=i,this}}(jQuery);+function(n){"use strict";function t(i,r){this.$body=n(document.body);this.$scrollElement=n(i).is(document.body)?n(window):n(i);this.options=n.extend({},t.DEFAULTS,r);this.selector=(this.options.target||"")+" .nav li > a";this.offsets=[];this.targets=[];this.activeTarget=null;this.scrollHeight=0;this.$scrollElement.on("scroll.bs.scrollspy",n.proxy(this.process,this));this.refresh();this.process()}function i(i){return this.each(function(){var u=n(this),r=u.data("bs.scrollspy"),f=typeof i=="object"&&i;r||u.data("bs.scrollspy",r=new t(this,f));typeof i=="string"&&r[i]()})}t.VERSION="3.3.4";t.DEFAULTS={offset:10};t.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)};t.prototype.refresh=function(){var t=this,i="offset",r=0;this.offsets=[];this.targets=[];this.scrollHeight=this.getScrollHeight();n.isWindow(this.$scrollElement[0])||(i="position",r=this.$scrollElement.scrollTop());this.$body.find(this.selector).map(function(){var f=n(this),u=f.data("target")||f.attr("href"),t=/^#./.test(u)&&n(u);return t&&t.length&&t.is(":visible")&&[[t[i]().top+r,u]]||null}).sort(function(n,t){return n[0]-t[0]}).each(function(){t.offsets.push(this[0]);t.targets.push(this[1])})};t.prototype.process=function(){var i=this.$scrollElement.scrollTop()+this.options.offset,f=this.getScrollHeight(),e=this.options.offset+f-this.$scrollElement.height(),t=this.offsets,r=this.targets,u=this.activeTarget,n;if(this.scrollHeight!=f&&this.refresh(),i>=e)return u!=(n=r[r.length-1])&&this.activate(n);if(u&&i<t[0])return this.activeTarget=null,this.clear();for(n=t.length;n--;)u!=r[n]&&i>=t[n]&&(t[n+1]===undefined||i<t[n+1])&&this.activate(r[n])};t.prototype.activate=function(t){this.activeTarget=t;this.clear();var r=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',i=n(r).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active"));i.trigger("activate.bs.scrollspy")};t.prototype.clear=function(){n(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var r=n.fn.scrollspy;n.fn.scrollspy=i;n.fn.scrollspy.Constructor=t;n.fn.scrollspy.noConflict=function(){return n.fn.scrollspy=r,this};n(window).on("load.bs.scrollspy.data-api",function(){n('[data-spy="scroll"]').each(function(){var t=n(this);i.call(t,t.data())})})}(jQuery);+function(n){"use strict";function r(i){return this.each(function(){var u=n(this),r=u.data("bs.tab");r||u.data("bs.tab",r=new t(this));typeof i=="string"&&r[i]()})}var t=function(t){this.element=n(t)},u,i;t.VERSION="3.3.4";t.TRANSITION_DURATION=150;t.prototype.show=function(){var t=this.element,f=t.closest("ul:not(.dropdown-menu)"),i=t.data("target"),u;if(i||(i=t.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var r=f.find(".active:last a"),e=n.Event("hide.bs.tab",{relatedTarget:t[0]}),o=n.Event("show.bs.tab",{relatedTarget:r[0]});(r.trigger(e),t.trigger(o),o.isDefaultPrevented()||e.isDefaultPrevented())||(u=n(i),this.activate(t.closest("li"),f),this.activate(u,u.parent(),function(){r.trigger({type:"hidden.bs.tab",relatedTarget:t[0]});t.trigger({type:"shown.bs.tab",relatedTarget:r[0]})}))}};t.prototype.activate=function(i,r,u){function o(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1);i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0);e?(i[0].offsetWidth,i.addClass("in")):i.removeClass("fade");i.parent(".dropdown-menu").length&&i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0);u&&u()}var f=r.find("> .active"),e=u&&n.support.transition&&(f.length&&f.hasClass("fade")||!!r.find("> .fade").length);f.length&&e?f.one("bsTransitionEnd",o).emulateTransitionEnd(t.TRANSITION_DURATION):o();f.removeClass("in")};u=n.fn.tab;n.fn.tab=r;n.fn.tab.Constructor=t;n.fn.tab.noConflict=function(){return n.fn.tab=u,this};i=function(t){t.preventDefault();r.call(n(this),"show")};n(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery);+function(n){"use strict";function i(i){return this.each(function(){var u=n(this),r=u.data("bs.affix"),f=typeof i=="object"&&i;r||u.data("bs.affix",r=new t(this,f));typeof i=="string"&&r[i]()})}var t=function(i,r){this.options=n.extend({},t.DEFAULTS,r);this.$target=n(this.options.target).on("scroll.bs.affix.data-api",n.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",n.proxy(this.checkPositionWithEventLoop,this));this.$element=n(i);this.affixed=null;this.unpin=null;this.pinnedOffset=null;this.checkPosition()},r;t.VERSION="3.3.4";t.RESET="affix affix-top affix-bottom";t.DEFAULTS={offset:0,target:window};t.prototype.getState=function(n,t,i,r){var u=this.$target.scrollTop(),f=this.$element.offset(),e=this.$target.height();if(i!=null&&this.affixed=="top")return u<i?"top":!1;if(this.affixed=="bottom")return i!=null?u+this.unpin<=f.top?!1:"bottom":u+e<=n-r?!1:"bottom";var o=this.affixed==null,s=o?u:f.top,h=o?e:t;return i!=null&&u<=i?"top":r!=null&&s+h>=n-r?"bottom":!1};t.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(t.RESET).addClass("affix");var n=this.$target.scrollTop(),i=this.$element.offset();return this.pinnedOffset=i.top-n};t.prototype.checkPositionWithEventLoop=function(){setTimeout(n.proxy(this.checkPosition,this),1)};t.prototype.checkPosition=function(){var i,e,o;if(this.$element.is(":visible")){var s=this.$element.height(),r=this.options.offset,f=r.top,u=r.bottom,h=n(document.body).height();if(typeof r!="object"&&(u=f=r),typeof f=="function"&&(f=r.top(this.$element)),typeof u=="function"&&(u=r.bottom(this.$element)),i=this.getState(h,s,f,u),this.affixed!=i){if(this.unpin!=null&&this.$element.css("top",""),e="affix"+(i?"-"+i:""),o=n.Event(e+".bs.affix"),this.$element.trigger(o),o.isDefaultPrevented())return;this.affixed=i;this.unpin=i=="bottom"?this.getPinnedOffset():null;this.$element.removeClass(t.RESET).addClass(e).trigger(e.replace("affix","affixed")+".bs.affix")}i=="bottom"&&this.$element.offset({top:h-s-u})}};r=n.fn.affix;n.fn.affix=i;n.fn.affix.Constructor=t;n.fn.affix.noConflict=function(){return n.fn.affix=r,this};n(window).on("load",function(){n('[data-spy="affix"]').each(function(){var r=n(this),t=r.data();t.offset=t.offset||{};t.offsetBottom!=null&&(t.offset.bottom=t.offsetBottom);t.offsetTop!=null&&(t.offset.top=t.offsetTop);i.call(r,t)})})}(jQuery);
/*
//# sourceMappingURL=bootstrap.min.js.map
*/
///#source 1 1 /Content/Scripts/star-rating.js
/*
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 3.0.0
 *
 * A simple yet powerful JQuery star rating plugin that allows rendering
 * fractional star ratings and supports Right to Left (RTL) input.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    var DEFAULT_MIN = 0;
    var DEFAULT_MAX = 5;
    var DEFAULT_STEP = 0.5;

    var isEmpty = function (value, trim) {
        return typeof value === 'undefined' || value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
    };

    var validateAttr = function ($input, vattr, options) {
        var chk = isEmpty($input.data(vattr)) ? $input.attr(vattr) : $input.data(vattr);
        if (chk) {
            return chk;
        }
        return options[vattr];
    };

    var getDecimalPlaces = function (num) {
        var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) {
            return 0;
        }
        return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    };

    var applyPrecision = function (val, precision) {
        return parseFloat(val.toFixed(precision));
    };

    // Rating public class definition
    var Rating = function (element, options) {
        this.$element = $(element);
        this.init(options);
    };

    Rating.prototype = {
        constructor: Rating,
        _parseAttr: function (vattr, options) {
            var self = this, $input = self.$element;
            if ($input.attr('type') === 'range' || $input.attr('type') === 'number') {
                var val = validateAttr($input, vattr, options);
                var chk = DEFAULT_STEP;
                if (vattr === 'min') {
                    chk = DEFAULT_MIN;
                }
                else if (vattr === 'max') {
                    chk = DEFAULT_MAX;
                }
                else if (vattr === 'step') {
                    chk = DEFAULT_STEP;
                }
                var final = isEmpty(val) ? chk : val;
                return parseFloat(final);
            }
            return parseFloat(options[vattr]);
        },
        /**
         * Listens to events
         */
        listen: function () {
            var self = this;
            self.$rating.on("click", function (e) {
                if (self.inactive) {
                    return;
                }
                var w = e.pageX - self.$rating.offset().left;
                self.setStars(w);
                self.$element.trigger('change');
                self.$element.trigger('rating.change', [self.$element.val(), self.$caption.html()]);
                self.starClicked = true
            });
            self.$rating.on("mousemove", function (e) {
                if (!self.hoverEnabled || self.inactive) {
                    return;
                }
                self.starClicked = false;
                var pos = e.pageX - self.$rating.offset().left, out = self.calculate(pos);
                self.toggleHover(out);
                self.$element.trigger('rating.hover', [out.val, out.caption, 'stars']);
            });
            self.$rating.on("mouseleave", function (e) {
                if (!self.hoverEnabled || self.inactive || self.starClicked) {
                    return;
                }
                var out = self.cache;
                self.toggleHover(out);
                self.$element.trigger('rating.hoverleave', ['stars']);
            });
            self.$clear.on("mousemove", function (e) {
                if (!self.hoverEnabled || self.inactive || !self.hoverOnClear) {
                    return;
                }
                self.clearClicked = false;
                var caption = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>',
                    val = self.clearValue, width = self.getWidthFromValue(val), out;
                out = { caption: caption, width: width, val: val };
                self.toggleHover(out);
                self.$element.trigger('rating.hover', [val, caption, 'clear']);
            });
            self.$clear.on("mouseleave", function (e) {
                if (!self.hoverEnabled || self.inactive || self.clearClicked || !self.hoverOnClear) {
                    return;
                }
                var out = self.cache;
                self.toggleHover(out);
                self.$element.trigger('rating.hoverleave', ['clear']);
            });
            self.$clear.on("click", function (e) {
                if (!self.inactive) {
                    self.clear();
                    self.clearClicked = true;
                }
            });
            $(self.$element[0].form).on("reset", function (e) {
                if (!self.inactive) {
                    self.reset();
                }
            });
        },
        initSlider: function (options) {
            var self = this;
            if (isEmpty(self.$element.val())) {
                self.$element.val(0);
            }
            self.initialValue = self.$element.val();
            self.min = (typeof options.min !== 'undefined') ? options.min : self._parseAttr('min', options);
            self.max = (typeof options.max !== 'undefined') ? options.max : self._parseAttr('max', options);
            self.step = (typeof options.step !== 'undefined') ? options.step : self._parseAttr('step', options);
            if (isNaN(self.min) || isEmpty(self.min)) {
                self.min = DEFAULT_MIN;
            }
            if (isNaN(self.max) || isEmpty(self.max)) {
                self.max = DEFAULT_MAX;
            }
            if (isNaN(self.step) || isEmpty(self.step) || self.step == 0) {
                self.step = DEFAULT_STEP;
            }
            self.diff = self.max - self.min;
        },
        /**
         * Initializes the plugin
         */
        init: function (options) {
            var self = this;
            self.options = options;
            self.hoverEnabled = options.hoverEnabled;
            self.hoverChangeCaption = options.hoverChangeCaption;
            self.hoverChangeStars = options.hoverChangeStars;
            self.hoverOnClear = options.hoverOnClear;
            self.starClicked = false;
            self.clearClicked = false;
            self.initSlider(options);
            self.checkDisabled();
            $element = self.$element;
            self.containerClass = options.containerClass;
            self.glyphicon = options.glyphicon;
            var defaultStar = (self.glyphicon) ? '\ue006' : '\u2605';
            self.symbol = isEmpty(options.symbol) ? defaultStar : options.symbol;
            self.rtl = options.rtl || self.$element.attr('dir');
            if (self.rtl) {
                self.$element.attr('dir', 'rtl');
            }
            self.showClear = options.showClear;
            self.showCaption = options.showCaption;
            self.size = options.size;
            self.stars = options.stars;
            self.defaultCaption = options.defaultCaption;
            self.starCaptions = options.starCaptions;
            self.starCaptionClasses = options.starCaptionClasses;
            self.clearButton = options.clearButton;
            self.clearButtonTitle = options.clearButtonTitle;
            self.clearButtonBaseClass = !isEmpty(options.clearButtonBaseClass) ? options.clearButtonBaseClass : 'clear-rating';
            self.clearButtonActiveClass = !isEmpty(options.clearButtonActiveClass) ? options.clearButtonActiveClass : 'clear-rating-active';
            self.clearCaption = options.clearCaption;
            self.clearCaptionClass = options.clearCaptionClass;
            self.clearValue = options.clearValue;
            self.$element.removeClass('form-control').addClass('form-control');
            self.$clearElement = isEmpty(options.clearElement) ? null : $(options.clearElement);
            self.$captionElement = isEmpty(options.captionElement) ? null : $(options.captionElement);
            if (typeof self.$rating == 'undefined' && typeof self.$container == 'undefined') {
                self.$rating = $(document.createElement("div")).html('<div class="rating-stars"></div>');
                self.$container = $(document.createElement("div"));
                self.$container.before(self.$rating);
                self.$container.append(self.$rating);
                self.$element.before(self.$container).appendTo(self.$rating);
            }
            self.$stars = self.$rating.find('.rating-stars');
            self.generateRating();
            self.$clear = !isEmpty(self.$clearElement) ? self.$clearElement : self.$container.find('.' + self.clearButtonBaseClass);
            self.$caption = !isEmpty(self.$captionElement) ? self.$captionElement : self.$container.find(".caption");
            self.setStars();
            self.$element.hide();
            self.listen();
            if (self.showClear) {
                self.$clear.attr({ "class": self.getClearClass() });
            }
            self.cache = {
                caption: self.$caption.html(),
                width: self.$stars.width(),
                val: self.$element.val()
            };
            self.$element.removeClass('rating-loading');
        },
        checkDisabled: function () {
            var self = this;
            self.disabled = validateAttr(self.$element, 'disabled', self.options);
            self.readonly = validateAttr(self.$element, 'readonly', self.options);
            self.inactive = (self.disabled || self.readonly);
        },
        getClearClass: function () {
            return this.clearButtonBaseClass + ' ' + ((this.inactive) ? '' : this.clearButtonActiveClass);
        },
        generateRating: function () {
            var self = this, clear = self.renderClear(), caption = self.renderCaption(),
                css = (self.rtl) ? 'rating-container-rtl' : 'rating-container',
                stars = self.getStars();
            css += (self.glyphicon) ? ((self.symbol == '\ue006') ? ' rating-gly-star' : ' rating-gly') : ' rating-uni';
            self.$rating.attr('class', css);
            self.$rating.attr('data-content', stars);
            self.$stars.attr('data-content', stars);
            var css = self.rtl ? 'star-rating-rtl' : 'star-rating';
            self.$container.attr('class', css + ' rating-' + self.size);

            if (self.inactive) {
                self.$container.removeClass('rating-active').addClass('rating-disabled');
            }
            else {
                self.$container.removeClass('rating-disabled').addClass('rating-active');
            }

            if (typeof self.$caption == 'undefined' && typeof self.$clear == 'undefined') {
                if (self.rtl) {
                    self.$container.prepend(caption).append(clear);
                }
                else {
                    self.$container.prepend(clear).append(caption);
                }
            }
            if (!isEmpty(self.containerClass)) {
                self.$container.removeClass(self.containerClass).addClass(self.containerClass);
            }
        },
        getStars: function () {
            var self = this, numStars = self.stars, stars = '';
            for (var i = 1; i <= numStars; i++) {
                stars += self.symbol;
            }
            return stars;
        },
        renderClear: function () {
            var self = this;
            if (!self.showClear) {
                return '';
            }
            var css = self.getClearClass();
            if (!isEmpty(self.$clearElement)) {
                self.$clearElement.removeClass(css).addClass(css).attr({ "title": self.clearButtonTitle });
                self.$clearElement.html(self.clearButton);
                return '';
            }
            return '<div class="' + css + '" title="' + self.clearButtonTitle + '">' + self.clearButton + '</div>';
        },
        renderCaption: function () {
            var self = this, val = self.$element.val();
            if (!self.showCaption) {
                return '';
            }
            var html = self.fetchCaption(val);
            if (!isEmpty(self.$captionElement)) {
                self.$captionElement.removeClass('caption').addClass('caption').attr({ "title": self.clearCaption });
                self.$captionElement.html(html);
                return '';
            }
            return '<div class="caption">' + html + '</div>';
        },
        fetchCaption: function (rating) {
            var self = this;
            var val = parseFloat(rating), css, cap;
            if (typeof (self.starCaptionClasses) == "function") {
                css = isEmpty(self.starCaptionClasses(val)) ? self.clearCaptionClass : self.starCaptionClasses(val);
            } else {
                css = isEmpty(self.starCaptionClasses[val]) ? self.clearCaptionClass : self.starCaptionClasses[val];
            }
            if (typeof (self.starCaptions) == "function") {
                var cap = isEmpty(self.starCaptions(val)) ? self.defaultCaption.replace(/\{rating\}/g, val) : self.starCaptions(val);
            } else {
                var cap = isEmpty(self.starCaptions[val]) ? self.defaultCaption.replace(/\{rating\}/g, val) : self.starCaptions[val];
            }
            var caption = (val == self.clearValue) ? self.clearCaption : cap;
            return '<span class="' + css + '">' + caption + '</span>';
        },
        getWidthFromValue: function (val) {
            var self = this, min = self.min, max = self.max, step = self.step;
            if (val <= min || min == max) {
                return 0;
            }
            if (val >= max) {
                return 100;
            }
            return (val - min) * 100 / (max - min);
        },
        getValueFromPosition: function (pos) {
            var self = this, precision = getDecimalPlaces(self.step),
                percentage, val, maxWidth = self.$rating.width();
            percentage = (pos / maxWidth);
            if (self.rtl) {
                val = (self.min + Math.floor(self.diff * percentage / self.step) * self.step);
            }
            else {
                val = (self.min + Math.ceil(self.diff * percentage / self.step) * self.step);
            }
            if (val < self.min) {
                val = self.min;
            }
            else if (val > self.max) {
                val = self.max;
            }
            val = applyPrecision(parseFloat(val), precision);
            if (self.rtl) {
                val = self.max - val;
            }
            return val;
        },
        toggleHover: function (out) {
            var self = this;
            if (self.hoverChangeCaption) {
                var caption = out.val <= self.clearValue ? self.fetchCaption(self.clearValue) : out.caption;
                self.$caption.html(caption);
            }
            if (self.hoverChangeStars) {
                var w = self.getWidthFromValue(self.clearValue),
                    width = out.val <= self.clearValue ? (self.rtl ? (100 - w) + '%' : w + '%') : out.width;
                self.$stars.css('width', width);
            }
        },
        calculate: function (pos) {
            var self = this, defaultVal = isEmpty(self.$element.val()) ? 0 : self.$element.val(),
                val = arguments.length ? self.getValueFromPosition(pos) : defaultVal,
                caption = self.fetchCaption(val), width = self.getWidthFromValue(val);
            if (self.rtl) {
                width = 100 - width;
            }
            width += '%';
            return { caption: caption, width: width, val: val };
        },
        setStars: function (pos) {
            var self = this, out = arguments.length ? self.calculate(pos) : self.calculate();
            self.$element.val(out.val);
            self.$stars.css('width', out.width);
            self.$caption.html(out.caption);
            self.cache = out
        },
        clear: function () {
            var self = this;
            var title = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>';
            self.$stars.removeClass('rated');
            if (!self.inactive) {
                self.$caption.html(title);
            }
            self.$element.val(self.clearValue);
            self.setStars();
            self.$element.trigger('rating.clear');
        },
        reset: function () {
            var self = this;
            self.$element.val(self.initialValue);
            self.setStars();
            self.$element.trigger('rating.reset');
        },
        update: function (val) {
            if (arguments.length > 0) {
                var self = this;
                self.$element.val(val);
                self.setStars();
            }
        },
        refresh: function (options) {
            var self = this;
            if (arguments.length) {
                var cap = '';
                self.init($.extend(self.options, options));
                if (self.showClear) {
                    self.$clear.show();
                }
                else {
                    self.$clear.hide();
                }
                if (self.showCaption) {
                    self.$caption.show();
                }
                else {
                    self.$caption.hide();
                }
            }
        }
    };

    //Star rating plugin definition
    $.fn.rating = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('rating'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('rating', (data = new Rating(this, $.extend({}, $.fn.rating.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.rating.defaults = {
        stars: 5,
        glyphicon: true,
        symbol: null,
        disabled: false,
        readonly: false,
        rtl: false,
        size: 'md',
        showClear: true,
        showCaption: true,
        defaultCaption: '{rating} Stars',
        starCaptions: {
            0.5: 'Half Star',
            1: 'One Star',
            1.5: 'One & Half Star',
            2: 'Two Stars',
            2.5: 'Two & Half Stars',
            3: 'Three Stars',
            3.5: 'Three & Half Stars',
            4: 'Four Stars',
            4.5: 'Four & Half Stars',
            5: 'Five Stars'
        },
        starCaptionClasses: {
            0.5: 'label label-danger',
            1: 'label label-danger',
            1.5: 'label label-warning',
            2: 'label label-warning',
            2.5: 'label label-info',
            3: 'label label-info',
            3.5: 'label label-primary',
            4: 'label label-primary',
            4.5: 'label label-success',
            5: 'label label-success'
        },
        clearButton: '<i class="glyphicon glyphicon-minus-sign"></i>',
        clearButtonTitle: 'Clear',
        clearButtonBaseClass: 'clear-rating',
        clearButtonActiveClass: 'clear-rating-active',
        //clearCaption: 'Not Rated',
        clearCaption: '0',
        clearCaptionClass: 'label label-default',
        clearValue: 0,
        captionElement: null,
        clearElement: null,
        containerClass: null,
        hoverEnabled: true,
        hoverChangeCaption: true,
        hoverChangeStars: true,
        hoverOnClear: true
    };


    /**
     * Convert automatically number inputs with class 'rating'
     * into the star rating control.
     */
    $('input.rating').addClass('rating-loading');

    $(document).ready(function () {
        var $input = $('input.rating'), count = Object.keys($input).length;
        if (count > 0) {
            $input.rating();
        }
    });
}(jQuery));
///#source 1 1 /Content/Scripts/underscore.js
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function () {

    // Baseline setup
    // --------------

    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;

    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

    // Create quick reference variables for speed access to core prototypes.
    var
      push = ArrayProto.push,
      slice = ArrayProto.slice,
      concat = ArrayProto.concat,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var
      nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeBind = FuncProto.bind;

    // Create a safe reference to the Underscore object for use below.
    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    // Current version.
    _.VERSION = '1.7.0';

    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
    var createCallback = function (func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function (value) {
                return func.call(context, value);
            };
            case 2: return function (value, other) {
                return func.call(context, value, other);
            };
            case 3: return function (value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function (accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };

    // A mostly-internal function to generate callbacks that can be applied
    // to each element in a collection, returning the desired result — either
    // identity, an arbitrary callback, a property matcher, or a property accessor.
    _.iteratee = function (value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return createCallback(value, context, argCount);
        if (_.isObject(value)) return _.matches(value);
        return _.property(value);
    };

    // Collection Functions
    // --------------------

    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles raw objects in addition to array-likes. Treats all
    // sparse array-likes as if they were dense.
    _.each = _.forEach = function (obj, iteratee, context) {
        if (obj == null) return obj;
        iteratee = createCallback(iteratee, context);
        var i, length = obj.length;
        if (length === +length) {
            for (i = 0; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };

    // Return the results of applying the iteratee to each element.
    _.map = _.collect = function (obj, iteratee, context) {
        if (obj == null) return [];
        iteratee = _.iteratee(iteratee, context);
        var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length),
            currentKey;
        for (var index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    var reduceError = 'Reduce of empty array with no initial value';

    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`.
    _.reduce = _.foldl = _.inject = function (obj, iteratee, memo, context) {
        if (obj == null) obj = [];
        iteratee = createCallback(iteratee, context, 4);
        var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index = 0, currentKey;
        if (arguments.length < 3) {
            if (!length) throw new TypeError(reduceError);
            memo = obj[keys ? keys[index++] : index++];
        }
        for (; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
    };

    // The right-associative version of reduce, also known as `foldr`.
    _.reduceRight = _.foldr = function (obj, iteratee, memo, context) {
        if (obj == null) obj = [];
        iteratee = createCallback(iteratee, context, 4);
        var keys = obj.length !== +obj.length && _.keys(obj),
            index = (keys || obj).length,
            currentKey;
        if (arguments.length < 3) {
            if (!index) throw new TypeError(reduceError);
            memo = obj[keys ? keys[--index] : --index];
        }
        while (index--) {
            currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
    };

    // Return the first value which passes a truth test. Aliased as `detect`.
    _.find = _.detect = function (obj, predicate, context) {
        var result;
        predicate = _.iteratee(predicate, context);
        _.some(obj, function (value, index, list) {
            if (predicate(value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };

    // Return all the elements that pass a truth test.
    // Aliased as `select`.
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        if (obj == null) return results;
        predicate = _.iteratee(predicate, context);
        _.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    };

    // Return all the elements for which a truth test fails.
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(_.iteratee(predicate)), context);
    };

    // Determine whether all of the elements match a truth test.
    // Aliased as `all`.
    _.every = _.all = function (obj, predicate, context) {
        if (obj == null) return true;
        predicate = _.iteratee(predicate, context);
        var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index, currentKey;
        for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    };

    // Determine if at least one element in the object matches a truth test.
    // Aliased as `any`.
    _.some = _.any = function (obj, predicate, context) {
        if (obj == null) return false;
        predicate = _.iteratee(predicate, context);
        var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index, currentKey;
        for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
    };

    // Determine if the array or object contains a given value (using `===`).
    // Aliased as `include`.
    _.contains = _.include = function (obj, target) {
        if (obj == null) return false;
        if (obj.length !== +obj.length) obj = _.values(obj);
        return _.indexOf(obj, target) >= 0;
    };

    // Invoke a method (with arguments) on every item in a collection.
    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    };

    // Convenience version of a common use case of `map`: fetching a property.
    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    };

    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    _.where = function (obj, attrs) {
        return _.filter(obj, _.matches(attrs));
    };

    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matches(attrs));
    };

    // Return the maximum element (or element-based computation).
    _.max = function (obj, iteratee, context) {
        var result = -Infinity, lastComputed = -Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = obj.length === +obj.length ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Return the minimum element (or element-based computation).
    _.min = function (obj, iteratee, context) {
        var result = Infinity, lastComputed = Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = obj.length === +obj.length ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Shuffle a collection, using the modern version of the
    // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    _.shuffle = function (obj) {
        var set = obj && obj.length === +obj.length ? obj : _.values(obj);
        var length = set.length;
        var shuffled = Array(length);
        for (var index = 0, rand; index < length; index++) {
            rand = _.random(0, index);
            if (rand !== index) shuffled[index] = shuffled[rand];
            shuffled[rand] = set[index];
        }
        return shuffled;
    };

    // Sample **n** random values from a collection.
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `map`.
    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (obj.length !== +obj.length) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    };

    // Sort the object's values by a criterion produced by an iteratee.
    _.sortBy = function (obj, iteratee, context) {
        iteratee = _.iteratee(iteratee, context);
        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            };
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };

    // An internal function used for aggregate "group by" operations.
    var group = function (behavior) {
        return function (obj, iteratee, context) {
            var result = {};
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    };

    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    _.groupBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key].push(value); else result[key] = [value];
    });

    // Indexes the object's values by a criterion, similar to `groupBy`, but for
    // when you know that your index values will be unique.
    _.indexBy = group(function (result, value, key) {
        result[key] = value;
    });

    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    _.countBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key]++; else result[key] = 1;
    });

    // Use a comparator function to figure out the smallest index at which
    // an object should be inserted so as to maintain order. Uses binary search.
    _.sortedIndex = function (array, obj, iteratee, context) {
        iteratee = _.iteratee(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = low + high >>> 1;
            if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
        }
        return low;
    };

    // Safely create a real, live array from anything iterable.
    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
    };

    // Return the number of elements in an object.
    _.size = function (obj) {
        if (obj == null) return 0;
        return obj.length === +obj.length ? obj.length : _.keys(obj).length;
    };

    // Split a collection into two arrays: one whose elements all satisfy the given
    // predicate, and one whose elements all do not satisfy the predicate.
    _.partition = function (obj, predicate, context) {
        predicate = _.iteratee(predicate, context);
        var pass = [], fail = [];
        _.each(obj, function (value, key, obj) {
            (predicate(value, key, obj) ? pass : fail).push(value);
        });
        return [pass, fail];
    };

    // Array Functions
    // ---------------

    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. Aliased as `head` and `take`. The **guard** check
    // allows it to work with `_.map`.
    _.first = _.head = _.take = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[0];
        if (n < 0) return [];
        return slice.call(array, 0, n);
    };

    // Returns everything but the last entry of the array. Especially useful on
    // the arguments object. Passing **n** will return all the values in
    // the array, excluding the last N. The **guard** check allows it to work with
    // `_.map`.
    _.initial = function (array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };

    // Get the last element of an array. Passing **n** will return the last N
    // values in the array. The **guard** check allows it to work with `_.map`.
    _.last = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return slice.call(array, Math.max(array.length - n, 0));
    };

    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array. The **guard**
    // check allows it to work with `_.map`.
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };

    // Trim out all falsy values from an array.
    _.compact = function (array) {
        return _.filter(array, _.identity);
    };

    // Internal implementation of a recursive `flatten` function.
    var flatten = function (input, shallow, strict, output) {
        if (shallow && _.every(input, _.isArray)) {
            return concat.apply(output, input);
        }
        for (var i = 0, length = input.length; i < length; i++) {
            var value = input[i];
            if (!_.isArray(value) && !_.isArguments(value)) {
                if (!strict) output.push(value);
            } else if (shallow) {
                push.apply(output, value);
            } else {
                flatten(value, shallow, strict, output);
            }
        }
        return output;
    };

    // Flatten out an array, either recursively (by default), or just one level.
    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false, []);
    };

    // Return a version of the array that does not contain the specified value(s).
    _.without = function (array) {
        return _.difference(array, slice.call(arguments, 1));
    };

    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // Aliased as `unique`.
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
        if (array == null) return [];
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = _.iteratee(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            if (isSorted) {
                if (!i || seen !== value) result.push(value);
                seen = value;
            } else if (iteratee) {
                var computed = iteratee(value, i, array);
                if (_.indexOf(seen, computed) < 0) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (_.indexOf(result, value) < 0) {
                result.push(value);
            }
        }
        return result;
    };

    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    _.union = function () {
        return _.uniq(flatten(arguments, true, true, []));
    };

    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    _.intersection = function (array) {
        if (array == null) return [];
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = array.length; i < length; i++) {
            var item = array[i];
            if (_.contains(result, item)) continue;
            for (var j = 1; j < argsLength; j++) {
                if (!_.contains(arguments[j], item)) break;
            }
            if (j === argsLength) result.push(item);
        }
        return result;
    };

    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = function (array) {
        var rest = flatten(slice.call(arguments, 1), true, true, []);
        return _.filter(array, function (value) {
            return !_.contains(rest, value);
        });
    };

    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    _.zip = function (array) {
        if (array == null) return [];
        var length = _.max(arguments, 'length').length;
        var results = Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = _.pluck(arguments, i);
        }
        return results;
    };

    // Converts lists into objects. Pass either a single array of `[key, value]`
    // pairs, or two parallel arrays of the same length -- one of keys, and one of
    // the corresponding values.
    _.object = function (list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, length = list.length; i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };

    // Return the position of the first occurrence of an item in an array,
    // or -1 if the item is not included in the array.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    _.indexOf = function (array, item, isSorted) {
        if (array == null) return -1;
        var i = 0, length = array.length;
        if (isSorted) {
            if (typeof isSorted == 'number') {
                i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
            } else {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        for (; i < length; i++) if (array[i] === item) return i;
        return -1;
    };

    _.lastIndexOf = function (array, item, from) {
        if (array == null) return -1;
        var idx = array.length;
        if (typeof from == 'number') {
            idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
        }
        while (--idx >= 0) if (array[idx] === item) return idx;
        return -1;
    };

    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](http://docs.python.org/library/functions.html#range).
    _.range = function (start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = step || 1;

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }

        return range;
    };

    // Function (ahem) Functions
    // ------------------

    // Reusable constructor function for prototype setting.
    var Ctor = function () { };

    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
    // available.
    _.bind = function (func, context) {
        var args, bound;
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        args = slice.call(arguments, 2);
        bound = function () {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            Ctor.prototype = func.prototype;
            var self = new Ctor;
            Ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (_.isObject(result)) return result;
            return self;
        };
        return bound;
    };

    // Partially apply a function by creating a version that has had some of its
    // arguments pre-filled, without changing its dynamic `this` context. _ acts
    // as a placeholder, allowing any combination of arguments to be pre-filled.
    _.partial = function (func) {
        var boundArgs = slice.call(arguments, 1);
        return function () {
            var position = 0;
            var args = boundArgs.slice();
            for (var i = 0, length = args.length; i < length; i++) {
                if (args[i] === _) args[i] = arguments[position++];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return func.apply(this, args);
        };
    };

    // Bind a number of an object's methods to that object. Remaining arguments
    // are the method names to be bound. Useful for ensuring that all callbacks
    // defined on an object belong to it.
    _.bindAll = function (obj) {
        var i, length = arguments.length, key;
        if (length <= 1) throw new Error('bindAll must be passed function names');
        for (i = 1; i < length; i++) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
        }
        return obj;
    };

    // Memoize an expensive function by storing its results.
    _.memoize = function (func, hasher) {
        var memoize = function (key) {
            var cache = memoize.cache;
            var address = hasher ? hasher.apply(this, arguments) : key;
            if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait);
    };

    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    _.defer = function (func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    _.throttle = function (func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function () {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function () {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    _.debounce = function (func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function () {
            var last = _.now() - timestamp;

            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    _.wrap = function (func, wrapper) {
        return _.partial(wrapper, func);
    };

    // Returns a negated version of the passed-in predicate.
    _.negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        };
    };

    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    _.compose = function () {
        var args = arguments;
        var start = args.length - 1;
        return function () {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) result = args[i].call(this, result);
            return result;
        };
    };

    // Returns a function that will only be executed after being called N times.
    _.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };

    // Returns a function that will only be executed before being called N times.
    _.before = function (times, func) {
        var memo;
        return function () {
            if (--times > 0) {
                memo = func.apply(this, arguments);
            } else {
                func = null;
            }
            return memo;
        };
    };

    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    _.once = _.partial(_.before, 2);

    // Object Functions
    // ----------------

    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        return keys;
    };

    // Retrieve the values of an object's properties.
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    // Convert an object into a list of `[key, value]` pairs.
    _.pairs = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };

    // Invert the keys and values of an object. The values must be serializable.
    _.invert = function (obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

    // Return a sorted list of the function names available on the object.
    // Aliased as `methods`
    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    // Extend a given object with all the properties in passed-in object(s).
    _.extend = function (obj) {
        if (!_.isObject(obj)) return obj;
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    };

    // Return a copy of the object only containing the whitelisted properties.
    _.pick = function (obj, iteratee, context) {
        var result = {}, key;
        if (obj == null) return result;
        if (_.isFunction(iteratee)) {
            iteratee = createCallback(iteratee, context);
            for (key in obj) {
                var value = obj[key];
                if (iteratee(value, key, obj)) result[key] = value;
            }
        } else {
            var keys = concat.apply([], slice.call(arguments, 1));
            obj = new Object(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                key = keys[i];
                if (key in obj) result[key] = obj[key];
            }
        }
        return result;
    };

    // Return a copy of the object without the blacklisted properties.
    _.omit = function (obj, iteratee, context) {
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
        } else {
            var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
            iteratee = function (value, key) {
                return !_.contains(keys, key);
            };
        }
        return _.pick(obj, iteratee, context);
    };

    // Fill in a given object with default properties.
    _.defaults = function (obj) {
        if (!_.isObject(obj)) return obj;
        for (var i = 1, length = arguments.length; i < length; i++) {
            var source = arguments[i];
            for (var prop in source) {
                if (obj[prop] === void 0) obj[prop] = source[prop];
            }
        }
        return obj;
    };

    // Create a (shallow-cloned) duplicate of an object.
    _.clone = function (obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };

    // Invokes interceptor with the obj, and then returns obj.
    // The primary purpose of this method is to "tap into" a method chain, in
    // order to perform operations on intermediate results within the chain.
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj;
    };

    // Internal recursive comparison function for `isEqual`.
    var eq = function (a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;
        // Unwrap any wrapped objects.
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {
            // Strings, numbers, regular expressions, dates, and booleans are compared by value.
            case '[object RegExp]':
                // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
            case '[object String]':
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return '' + a === '' + b;
            case '[object Number]':
                // `NaN`s are equivalent, but non-reflexive.
                // Object(NaN) is equivalent to NaN
                if (+a !== +a) return +b !== +b;
                // An `egal` comparison is performed for other numeric values.
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a === +b;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] === a) return bStack[length] === b;
        }
        // Objects with different constructors are not equivalent, but `Object`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (
          aCtor !== bCtor &&
            // Handle Object.create(x) cases
          'constructor' in a && 'constructor' in b &&
          !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
            _.isFunction(bCtor) && bCtor instanceof bCtor)
        ) {
            return false;
        }
        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);
        var size, result;
        // Recursively compare objects and arrays.
        if (className === '[object Array]') {
            // Compare array lengths to determine if a deep comparison is necessary.
            size = a.length;
            result = size === b.length;
            if (result) {
                // Deep compare the contents, ignoring non-numeric properties.
                while (size--) {
                    if (!(result = eq(a[size], b[size], aStack, bStack))) break;
                }
            }
        } else {
            // Deep compare objects.
            var keys = _.keys(a), key;
            size = keys.length;
            // Ensure that both objects contain the same number of properties before comparing deep equality.
            result = _.keys(b).length === size;
            if (result) {
                while (size--) {
                    // Deep compare each member
                    key = keys[size];
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            }
        }
        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return result;
    };

    // Perform a deep comparison to check if two objects are equal.
    _.isEqual = function (a, b) {
        return eq(a, b, [], []);
    };

    // Is a given array, string, or object empty?
    // An "empty" object has no enumerable own-properties.
    _.isEmpty = function (obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
    };

    // Is a given value a DOM element?
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };

    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };

    // Is a given variable an object?
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });

    // Define a fallback version of the method in browsers (ahem, IE), where
    // there isn't any inspectable "Arguments" type.
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return _.has(obj, 'callee');
        };
    }

    // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
    if (typeof /./ !== 'function') {
        _.isFunction = function (obj) {
            return typeof obj == 'function' || false;
        };
    }

    // Is a given object a finite number?
    _.isFinite = function (obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };

    // Is the given value `NaN`? (NaN is the only number which does not equal itself).
    _.isNaN = function (obj) {
        return _.isNumber(obj) && obj !== +obj;
    };

    // Is a given value a boolean?
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    // Is a given value equal to null?
    _.isNull = function (obj) {
        return obj === null;
    };

    // Is a given variable undefined?
    _.isUndefined = function (obj) {
        return obj === void 0;
    };

    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    // Utility Functions
    // -----------------

    // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
    // previous owner. Returns a reference to the Underscore object.
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    };

    // Keep the identity function around for default iteratees.
    _.identity = function (value) {
        return value;
    };

    // Predicate-generating functions. Often useful outside of Underscore.
    _.constant = function (value) {
        return function () {
            return value;
        };
    };

    _.noop = function () { };

    _.property = function (key) {
        return function (obj) {
            return obj[key];
        };
    };

    // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
    _.matches = function (attrs) {
        var pairs = _.pairs(attrs), length = pairs.length;
        return function (obj) {
            if (obj == null) return !length;
            obj = new Object(obj);
            for (var i = 0; i < length; i++) {
                var pair = pairs[i], key = pair[0];
                if (pair[1] !== obj[key] || !(key in obj)) return false;
            }
            return true;
        };
    };

    // Run a function **n** times.
    _.times = function (n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = createCallback(iteratee, context, 1);
        for (var i = 0; i < n; i++) accum[i] = iteratee(i);
        return accum;
    };

    // Return a random integer between min and max (inclusive).
    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    // A (possibly faster) way to get the current timestamp as an integer.
    _.now = Date.now || function () {
        return new Date().getTime();
    };

    // List of HTML entities for escaping.
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function (map) {
        var escaper = function (match) {
            return map[match];
        };
        // Regexes for identifying a key that needs to be escaped
        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);

    // If the value of the named `property` is a function then invoke it with the
    // `object` as context; otherwise, return it.
    _.result = function (object, property) {
        if (object == null) return void 0;
        var value = object[property];
        return _.isFunction(value) ? object[property]() : value;
    };

    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };

    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;

    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

    var escapeChar = function (match) {
        return '\\' + escapes[match];
    };

    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    // NB: `oldSettings` only exists for backwards compatibility.
    _.template = function (text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings);

        // Combine delimiters into one regular expression via alternation.
        var matcher = RegExp([
          (settings.escape || noMatch).source,
          (settings.interpolate || noMatch).source,
          (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }

            // Adobe VMs need the match returned to produce the correct offest.
            return match;
        });
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
          "print=function(){__p+=__j.call(arguments,'');};\n" +
          source + 'return __p;\n';

        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        var template = function (data) {
            return render.call(this, data, _);
        };

        // Provide the compiled source as a convenience for precompilation.
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';

        return template;
    };

    // Add a "chain" function. Start chaining a wrapped Underscore object.
    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };

    // OOP
    // ---------------
    // If Underscore is called as a function, it returns a wrapped object that
    // can be used OO-style. This wrapper holds altered versions of all the
    // underscore functions. Wrapped objects may be chained.

    // Helper function to continue chaining intermediate results.
    var result = function (obj) {
        return this._chain ? _(obj).chain() : obj;
    };

    // Add your own custom functions to the Underscore object.
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };

    // Add all of the Underscore functions to the wrapper object.
    _.mixin(_);

    // Add all mutator Array functions to the wrapper.
    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
            return result.call(this, obj);
        };
    });

    // Add all accessor Array functions to the wrapper.
    _.each(['concat', 'join', 'slice'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });

    // Extracts the result from a wrapped and chained object.
    _.prototype.value = function () {
        return this._wrapped;
    };

    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function () {
            return _;
        });
    }
}.call(this));
///#source 1 1 /Content/Scripts/FrontEnd/wow.min.js
/* WOW - v1.0.1 - 2014-09-03
* Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else{for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)}return this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],g.push(function(){var a,b,e,f;for(e=d.addedNodes||[],f=[],a=0,b=e.length;b>a;a++)c=e[a],f.push(this.doSync(c));return f}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(!this.stopped){if(null==a&&(a=this.element),1!==a.nodeType)return;for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.applyStyle(b,!0),this.boxes.push(b),this.all.push(b),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=""+a.className+" "+this.config.animateClass},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.setAttribute("style","visibility: visible;"));return e},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;f=[];for(c in b)d=b[c],a[""+c]=d,f.push(function(){var b,f,g,h;for(g=this.vendors,h=[],b=0,f=g.length;f>b;b++)e=g[b],h.push(a[""+e+c.charAt(0).toUpperCase()+c.substr(1)]=d);return h}.call(this));return f},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(e=d(a),c=e.getPropertyCSSValue(b),i=this.vendors,g=0,h=i.length;h>g;g++)f=i[g],c=c||e.getPropertyCSSValue("-"+f+"-"+b);return c},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);
///#source 1 1 /Content/Scripts/FrontEnd/jquery.sticky.js
// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: ''
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css('position', '')
              .css('top', '');
            s.stickyElement.parent().removeClass(s.className);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop != newTop) {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop);

            if (typeof s.getWidthFrom !== 'undefined') {
              s.stickyElement.css('width', $(s.getWidthFrom).width());
            }

            s.stickyElement.parent().addClass(s.className);
            s.currentTop = newTop;
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();
    },
    methods = {
      init: function(options) {
        var o = $.extend(defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapper = $('<div></div>')
            .attr('id', stickyId + '-sticky-wrapper')
            .addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);

          if (o.center) {
            stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css('height', stickyElement.outerHeight());
          sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom
          });
        });
      },
      update: scroller
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);

///#source 1 1 /Content/Scripts/FrontEnd/jquery.stellar.js
/*
 * Stellar.js v0.6.2
 * http://markdalgleish.com/projects/stellar.js
 *
 * Copyright 2014, Mark Dalgleish
 * This content is released under the MIT license
 * http://markdalgleish.mit-license.org
 */

;(function($, window, document, undefined) {

	var pluginName = 'stellar',
		defaults = {
			scrollProperty: 'scroll',
			positionProperty: 'position',
			horizontalScrolling: true,
			verticalScrolling: true,
			horizontalOffset: 0,
			verticalOffset: 0,
			responsive: false,
			parallaxBackgrounds: true,
			parallaxElements: true,
			hideDistantElements: true,
			hideElement: function($elem) { $elem.hide(); },
			showElement: function($elem) { $elem.show(); }
		},

		scrollProperty = {
			scroll: {
				getLeft: function($elem) { return $elem.scrollLeft(); },
				setLeft: function($elem, val) { $elem.scrollLeft(val); },

				getTop: function($elem) { return $elem.scrollTop();	},
				setTop: function($elem, val) { $elem.scrollTop(val); }
			},
			position: {
				getLeft: function($elem) { return parseInt($elem.css('left'), 10) * -1; },
				getTop: function($elem) { return parseInt($elem.css('top'), 10) * -1; }
			},
			margin: {
				getLeft: function($elem) { return parseInt($elem.css('margin-left'), 10) * -1; },
				getTop: function($elem) { return parseInt($elem.css('margin-top'), 10) * -1; }
			},
			transform: {
				getLeft: function($elem) {
					var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
					return (computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0);
				},
				getTop: function($elem) {
					var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
					return (computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0);
				}
			}
		},

		positionProperty = {
			position: {
				setLeft: function($elem, left) { $elem.css('left', left); },
				setTop: function($elem, top) { $elem.css('top', top); }
			},
			transform: {
				setPosition: function($elem, left, startingLeft, top, startingTop) {
					$elem[0].style[prefixedTransform] = 'translate3d(' + (left - startingLeft) + 'px, ' + (top - startingTop) + 'px, 0)';
				}
			}
		},

		// Returns a function which adds a vendor prefix to any CSS property name
		vendorPrefix = (function() {
			var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
				style = $('script')[0].style,
				prefix = '',
				prop;

			for (prop in style) {
				if (prefixes.test(prop)) {
					prefix = prop.match(prefixes)[0];
					break;
				}
			}

			if ('WebkitOpacity' in style) { prefix = 'Webkit'; }
			if ('KhtmlOpacity' in style) { prefix = 'Khtml'; }

			return function(property) {
				return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
			};
		}()),

		prefixedTransform = vendorPrefix('transform'),

		supportsBackgroundPositionXY = $('<div />', { style: 'background:#fff' }).css('background-position-x') !== undefined,

		setBackgroundPosition = (supportsBackgroundPositionXY ?
			function($elem, x, y) {
				$elem.css({
					'background-position-x': x,
					'background-position-y': y
				});
			} :
			function($elem, x, y) {
				$elem.css('background-position', x + ' ' + y);
			}
		),

		getBackgroundPosition = (supportsBackgroundPositionXY ?
			function($elem) {
				return [
					$elem.css('background-position-x'),
					$elem.css('background-position-y')
				];
			} :
			function($elem) {
				return $elem.css('background-position').split(' ');
			}
		),

		requestAnimFrame = (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback) {
				setTimeout(callback, 1000 / 60);
			}
		);

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			this.options.name = pluginName + '_' + Math.floor(Math.random() * 1e9);

			this._defineElements();
			this._defineGetters();
			this._defineSetters();
			this._handleWindowLoadAndResize();
			this._detectViewport();

			this.refresh({ firstLoad: true });

			if (this.options.scrollProperty === 'scroll') {
				this._handleScrollEvent();
			} else {
				this._startAnimationLoop();
			}
		},
		_defineElements: function() {
			if (this.element === document.body) this.element = window;
			this.$scrollElement = $(this.element);
			this.$element = (this.element === window ? $('body') : this.$scrollElement);
			this.$viewportElement = (this.options.viewportElement !== undefined ? $(this.options.viewportElement) : (this.$scrollElement[0] === window || this.options.scrollProperty === 'scroll' ? this.$scrollElement : this.$scrollElement.parent()) );
		},
		_defineGetters: function() {
			var self = this,
				scrollPropertyAdapter = scrollProperty[self.options.scrollProperty];

			this._getScrollLeft = function() {
				return scrollPropertyAdapter.getLeft(self.$scrollElement);
			};

			this._getScrollTop = function() {
				return scrollPropertyAdapter.getTop(self.$scrollElement);
			};
		},
		_defineSetters: function() {
			var self = this,
				scrollPropertyAdapter = scrollProperty[self.options.scrollProperty],
				positionPropertyAdapter = positionProperty[self.options.positionProperty],
				setScrollLeft = scrollPropertyAdapter.setLeft,
				setScrollTop = scrollPropertyAdapter.setTop;

			this._setScrollLeft = (typeof setScrollLeft === 'function' ? function(val) {
				setScrollLeft(self.$scrollElement, val);
			} : $.noop);

			this._setScrollTop = (typeof setScrollTop === 'function' ? function(val) {
				setScrollTop(self.$scrollElement, val);
			} : $.noop);

			this._setPosition = positionPropertyAdapter.setPosition ||
				function($elem, left, startingLeft, top, startingTop) {
					if (self.options.horizontalScrolling) {
						positionPropertyAdapter.setLeft($elem, left, startingLeft);
					}

					if (self.options.verticalScrolling) {
						positionPropertyAdapter.setTop($elem, top, startingTop);
					}
				};
		},
		_handleWindowLoadAndResize: function() {
			var self = this,
				$window = $(window);

			if (self.options.responsive) {
				$window.bind('load.' + this.name, function() {
					self.refresh();
				});
			}

			$window.bind('resize.' + this.name, function() {
				self._detectViewport();

				if (self.options.responsive) {
					self.refresh();
				}
			});
		},
		refresh: function(options) {
			var self = this,
				oldLeft = self._getScrollLeft(),
				oldTop = self._getScrollTop();

			if (!options || !options.firstLoad) {
				this._reset();
			}

			this._setScrollLeft(0);
			this._setScrollTop(0);

			this._setOffsets();
			this._findParticles();
			this._findBackgrounds();

			// Fix for WebKit background rendering bug
			if (options && options.firstLoad && /WebKit/.test(navigator.userAgent)) {
				$(window).load(function() {
					var oldLeft = self._getScrollLeft(),
						oldTop = self._getScrollTop();

					self._setScrollLeft(oldLeft + 1);
					self._setScrollTop(oldTop + 1);

					self._setScrollLeft(oldLeft);
					self._setScrollTop(oldTop);
				});
			}

			this._setScrollLeft(oldLeft);
			this._setScrollTop(oldTop);
		},
		_detectViewport: function() {
			var viewportOffsets = this.$viewportElement.offset(),
				hasOffsets = viewportOffsets !== null && viewportOffsets !== undefined;

			this.viewportWidth = this.$viewportElement.width();
			this.viewportHeight = this.$viewportElement.height();

			this.viewportOffsetTop = (hasOffsets ? viewportOffsets.top : 0);
			this.viewportOffsetLeft = (hasOffsets ? viewportOffsets.left : 0);
		},
		_findParticles: function() {
			var self = this,
				scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop();

			if (this.particles !== undefined) {
				for (var i = this.particles.length - 1; i >= 0; i--) {
					this.particles[i].$element.data('stellar-elementIsActive', undefined);
				}
			}

			this.particles = [];

			if (!this.options.parallaxElements) return;

			this.$element.find('[data-stellar-ratio]').each(function(i) {
				var $this = $(this),
					horizontalOffset,
					verticalOffset,
					positionLeft,
					positionTop,
					marginLeft,
					marginTop,
					$offsetParent,
					offsetLeft,
					offsetTop,
					parentOffsetLeft = 0,
					parentOffsetTop = 0,
					tempParentOffsetLeft = 0,
					tempParentOffsetTop = 0;

				// Ensure this element isn't already part of another scrolling element
				if (!$this.data('stellar-elementIsActive')) {
					$this.data('stellar-elementIsActive', this);
				} else if ($this.data('stellar-elementIsActive') !== this) {
					return;
				}

				self.options.showElement($this);

				// Save/restore the original top and left CSS values in case we refresh the particles or destroy the instance
				if (!$this.data('stellar-startingLeft')) {
					$this.data('stellar-startingLeft', $this.css('left'));
					$this.data('stellar-startingTop', $this.css('top'));
				} else {
					$this.css('left', $this.data('stellar-startingLeft'));
					$this.css('top', $this.data('stellar-startingTop'));
				}

				positionLeft = $this.position().left;
				positionTop = $this.position().top;

				// Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
				marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
				marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

				offsetLeft = $this.offset().left - marginLeft;
				offsetTop = $this.offset().top - marginTop;

				// Calculate the offset parent
				$this.parents().each(function() {
					var $this = $(this);

					if ($this.data('stellar-offset-parent') === true) {
						parentOffsetLeft = tempParentOffsetLeft;
						parentOffsetTop = tempParentOffsetTop;
						$offsetParent = $this;

						return false;
					} else {
						tempParentOffsetLeft += $this.position().left;
						tempParentOffsetTop += $this.position().top;
					}
				});

				// Detect the offsets
				horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
				verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

				// Add our object to the particles collection
				self.particles.push({
					$element: $this,
					$offsetParent: $offsetParent,
					isFixed: $this.css('position') === 'fixed',
					horizontalOffset: horizontalOffset,
					verticalOffset: verticalOffset,
					startingPositionLeft: positionLeft,
					startingPositionTop: positionTop,
					startingOffsetLeft: offsetLeft,
					startingOffsetTop: offsetTop,
					parentOffsetLeft: parentOffsetLeft,
					parentOffsetTop: parentOffsetTop,
					stellarRatio: ($this.data('stellar-ratio') !== undefined ? $this.data('stellar-ratio') : 1),
					width: $this.outerWidth(true),
					height: $this.outerHeight(true),
					isHidden: false
				});
			});
		},
		_findBackgrounds: function() {
			var self = this,
				scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop(),
				$backgroundElements;

			this.backgrounds = [];

			if (!this.options.parallaxBackgrounds) return;

			$backgroundElements = this.$element.find('[data-stellar-background-ratio]');

			if (this.$element.data('stellar-background-ratio')) {
                $backgroundElements = $backgroundElements.add(this.$element);
			}

			$backgroundElements.each(function() {
				var $this = $(this),
					backgroundPosition = getBackgroundPosition($this),
					horizontalOffset,
					verticalOffset,
					positionLeft,
					positionTop,
					marginLeft,
					marginTop,
					offsetLeft,
					offsetTop,
					$offsetParent,
					parentOffsetLeft = 0,
					parentOffsetTop = 0,
					tempParentOffsetLeft = 0,
					tempParentOffsetTop = 0;

				// Ensure this element isn't already part of another scrolling element
				if (!$this.data('stellar-backgroundIsActive')) {
					$this.data('stellar-backgroundIsActive', this);
				} else if ($this.data('stellar-backgroundIsActive') !== this) {
					return;
				}

				// Save/restore the original top and left CSS values in case we destroy the instance
				if (!$this.data('stellar-backgroundStartingLeft')) {
					$this.data('stellar-backgroundStartingLeft', backgroundPosition[0]);
					$this.data('stellar-backgroundStartingTop', backgroundPosition[1]);
				} else {
					setBackgroundPosition($this, $this.data('stellar-backgroundStartingLeft'), $this.data('stellar-backgroundStartingTop'));
				}

				// Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
				marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
				marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

				offsetLeft = $this.offset().left - marginLeft - scrollLeft;
				offsetTop = $this.offset().top - marginTop - scrollTop;
				
				// Calculate the offset parent
				$this.parents().each(function() {
					var $this = $(this);

					if ($this.data('stellar-offset-parent') === true) {
						parentOffsetLeft = tempParentOffsetLeft;
						parentOffsetTop = tempParentOffsetTop;
						$offsetParent = $this;

						return false;
					} else {
						tempParentOffsetLeft += $this.position().left;
						tempParentOffsetTop += $this.position().top;
					}
				});

				// Detect the offsets
				horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
				verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

				self.backgrounds.push({
					$element: $this,
					$offsetParent: $offsetParent,
					isFixed: $this.css('background-attachment') === 'fixed',
					horizontalOffset: horizontalOffset,
					verticalOffset: verticalOffset,
					startingValueLeft: backgroundPosition[0],
					startingValueTop: backgroundPosition[1],
					startingBackgroundPositionLeft: (isNaN(parseInt(backgroundPosition[0], 10)) ? 0 : parseInt(backgroundPosition[0], 10)),
					startingBackgroundPositionTop: (isNaN(parseInt(backgroundPosition[1], 10)) ? 0 : parseInt(backgroundPosition[1], 10)),
					startingPositionLeft: $this.position().left,
					startingPositionTop: $this.position().top,
					startingOffsetLeft: offsetLeft,
					startingOffsetTop: offsetTop,
					parentOffsetLeft: parentOffsetLeft,
					parentOffsetTop: parentOffsetTop,
					stellarRatio: ($this.data('stellar-background-ratio') === undefined ? 1 : $this.data('stellar-background-ratio'))
				});
			});
		},
		_reset: function() {
			var particle,
				startingPositionLeft,
				startingPositionTop,
				background,
				i;

			for (i = this.particles.length - 1; i >= 0; i--) {
				particle = this.particles[i];
				startingPositionLeft = particle.$element.data('stellar-startingLeft');
				startingPositionTop = particle.$element.data('stellar-startingTop');

				this._setPosition(particle.$element, startingPositionLeft, startingPositionLeft, startingPositionTop, startingPositionTop);

				this.options.showElement(particle.$element);

				particle.$element.data('stellar-startingLeft', null).data('stellar-elementIsActive', null).data('stellar-backgroundIsActive', null);
			}

			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				background.$element.data('stellar-backgroundStartingLeft', null).data('stellar-backgroundStartingTop', null);

				setBackgroundPosition(background.$element, background.startingValueLeft, background.startingValueTop);
			}
		},
		destroy: function() {
			this._reset();

			this.$scrollElement.unbind('resize.' + this.name).unbind('scroll.' + this.name);
			this._animationLoop = $.noop;

			$(window).unbind('load.' + this.name).unbind('resize.' + this.name);
		},
		_setOffsets: function() {
			var self = this,
				$window = $(window);

			$window.unbind('resize.horizontal-' + this.name).unbind('resize.vertical-' + this.name);

			if (typeof this.options.horizontalOffset === 'function') {
				this.horizontalOffset = this.options.horizontalOffset();
				$window.bind('resize.horizontal-' + this.name, function() {
					self.horizontalOffset = self.options.horizontalOffset();
				});
			} else {
				this.horizontalOffset = this.options.horizontalOffset;
			}

			if (typeof this.options.verticalOffset === 'function') {
				this.verticalOffset = this.options.verticalOffset();
				$window.bind('resize.vertical-' + this.name, function() {
					self.verticalOffset = self.options.verticalOffset();
				});
			} else {
				this.verticalOffset = this.options.verticalOffset;
			}
		},
		_repositionElements: function() {
			var scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop(),
				horizontalOffset,
				verticalOffset,
				particle,
				fixedRatioOffset,
				background,
				bgLeft,
				bgTop,
				isVisibleVertical = true,
				isVisibleHorizontal = true,
				newPositionLeft,
				newPositionTop,
				newOffsetLeft,
				newOffsetTop,
				i;

			// First check that the scroll position or container size has changed
			if (this.currentScrollLeft === scrollLeft && this.currentScrollTop === scrollTop && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
				return;
			} else {
				this.currentScrollLeft = scrollLeft;
				this.currentScrollTop = scrollTop;
				this.currentWidth = this.viewportWidth;
				this.currentHeight = this.viewportHeight;
			}

			// Reposition elements
			for (i = this.particles.length - 1; i >= 0; i--) {
				particle = this.particles[i];

				fixedRatioOffset = (particle.isFixed ? 1 : 0);

				// Calculate position, then calculate what the particle's new offset will be (for visibility check)
				if (this.options.horizontalScrolling) {
					newPositionLeft = (scrollLeft + particle.horizontalOffset + this.viewportOffsetLeft + particle.startingPositionLeft - particle.startingOffsetLeft + particle.parentOffsetLeft) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionLeft;
					newOffsetLeft = newPositionLeft - particle.startingPositionLeft + particle.startingOffsetLeft;
				} else {
					newPositionLeft = particle.startingPositionLeft;
					newOffsetLeft = particle.startingOffsetLeft;
				}

				if (this.options.verticalScrolling) {
					newPositionTop = (scrollTop + particle.verticalOffset + this.viewportOffsetTop + particle.startingPositionTop - particle.startingOffsetTop + particle.parentOffsetTop) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionTop;
					newOffsetTop = newPositionTop - particle.startingPositionTop + particle.startingOffsetTop;
				} else {
					newPositionTop = particle.startingPositionTop;
					newOffsetTop = particle.startingOffsetTop;
				}

				// Check visibility
				if (this.options.hideDistantElements) {
					isVisibleHorizontal = !this.options.horizontalScrolling || newOffsetLeft + particle.width > (particle.isFixed ? 0 : scrollLeft) && newOffsetLeft < (particle.isFixed ? 0 : scrollLeft) + this.viewportWidth + this.viewportOffsetLeft;
					isVisibleVertical = !this.options.verticalScrolling || newOffsetTop + particle.height > (particle.isFixed ? 0 : scrollTop) && newOffsetTop < (particle.isFixed ? 0 : scrollTop) + this.viewportHeight + this.viewportOffsetTop;
				}

				if (isVisibleHorizontal && isVisibleVertical) {
					if (particle.isHidden) {
						this.options.showElement(particle.$element);
						particle.isHidden = false;
					}

					this._setPosition(particle.$element, newPositionLeft, particle.startingPositionLeft, newPositionTop, particle.startingPositionTop);
				} else {
					if (!particle.isHidden) {
						this.options.hideElement(particle.$element);
						particle.isHidden = true;
					}
				}
			}

			// Reposition backgrounds
			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				fixedRatioOffset = (background.isFixed ? 0 : 1);
				bgLeft = (this.options.horizontalScrolling ? (scrollLeft + background.horizontalOffset - this.viewportOffsetLeft - background.startingOffsetLeft + background.parentOffsetLeft - background.startingBackgroundPositionLeft) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueLeft);
				bgTop = (this.options.verticalScrolling ? (scrollTop + background.verticalOffset - this.viewportOffsetTop - background.startingOffsetTop + background.parentOffsetTop - background.startingBackgroundPositionTop) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueTop);

				setBackgroundPosition(background.$element, bgLeft, bgTop);
			}
		},
		_handleScrollEvent: function() {
			var self = this,
				ticking = false;

			var update = function() {
				self._repositionElements();
				ticking = false;
			};

			var requestTick = function() {
				if (!ticking) {
					requestAnimFrame(update);
					ticking = true;
				}
			};
			
			this.$scrollElement.bind('scroll.' + this.name, requestTick);
			requestTick();
		},
		_startAnimationLoop: function() {
			var self = this;

			this._animationLoop = function() {
				requestAnimFrame(self._animationLoop);
				self._repositionElements();
			};
			this._animationLoop();
		}
	};

	$.fn[pluginName] = function (options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			return this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
				if (options === 'destroy') {
					$.data(this, 'plugin_' + pluginName, null);
				}
			});
		}
	};

	$[pluginName] = function(options) {
		var $window = $(window);
		return $window.stellar.apply($window, Array.prototype.slice.call(arguments, 0));
	};

	// Expose the scroll and position property function hashes so they can be extended
	$[pluginName].scrollProperty = scrollProperty;
	$[pluginName].positionProperty = positionProperty;

	// Expose the plugin class so it can be modified
	window.Stellar = Plugin;
}(jQuery, this, document));
///#source 1 1 /Content/Scripts/FrontEnd/base-theme.js
/* Superslides - v0.6.2 - 2013-07-10
* https://github.com/nicinabox/superslides
* Copyright (c) 2013 Nic Aitch; Licensed MIT */
//(function (i, t) { var n, e = "superslides"; n = function (n, e) { this.options = t.extend({ play: !1, animation_speed: 600, animation_easing: "swing", animation: "slide", inherit_width_from: i, inherit_height_from: i, pagination: !0, hashchange: !1, scrollable: !0, elements: { preserve: ".preserve", nav: ".slides-navigation", container: ".slides-container", pagination: ".slides-pagination" } }, e); var s = this, o = t("<div>", { "class": "slides-control" }), a = 1; this.$el = t(n), this.$container = this.$el.find(this.options.elements.container); var r = function () { return a = s._findMultiplier(), s.$el.on("click", s.options.elements.nav + " a", function (i) { i.preventDefault(), s.stop(), t(this).hasClass("next") ? s.animate("next", function () { s.start() }) : s.animate("prev", function () { s.start() }) }), t(document).on("keyup", function (i) { 37 === i.keyCode && s.animate("prev"), 39 === i.keyCode && s.animate("next") }), t(i).on("resize", function () { setTimeout(function () { var i = s.$container.children(); s.width = s._findWidth(), s.height = s._findHeight(), i.css({ width: s.width, left: s.width }), s.css.containers(), s.css.images() }, 10) }), t(i).on("hashchange", function () { var i, t = s._parseHash(); i = t && !isNaN(t) ? s._upcomingSlide(t - 1) : s._upcomingSlide(t), i >= 0 && i !== s.current && s.animate(i) }), s.pagination._events(), s.start(), s }, h = { containers: function () { s.init ? (s.$el.css({ height: s.height }), s.$control.css({ width: s.width * a, left: -s.width }), s.$container.css({})) : (t("body").css({ margin: 0 }), s.$el.css({ position: "relative", overflow: "hidden", width: "100%", height: s.height }), s.$control.css({ position: "relative", transform: "translate3d(0)", height: "100%", width: s.width * a, left: -s.width }), s.$container.css({ display: "none", margin: "0", padding: "0", listStyle: "none", position: "relative", height: "100%" })), 1 === s.size() && s.$el.find(s.options.elements.nav).hide() }, images: function () { var i = s.$container.find("img").not(s.options.elements.preserve); i.removeAttr("width").removeAttr("height").css({ "-webkit-backface-visibility": "hidden", "-ms-interpolation-mode": "bicubic", position: "absolute", left: "0", top: "0", "z-index": "-1", "max-width": "none" }), i.each(function () { var i = s.image._aspectRatio(this), n = this; if (t.data(this, "processed")) s.image._scale(n, i), s.image._center(n, i); else { var e = new Image; e.onload = function () { s.image._scale(n, i), s.image._center(n, i), t.data(n, "processed", !0) }, e.src = this.src } }) }, children: function () { var i = s.$container.children(); i.is("img") && (i.each(function () { if (t(this).is("img")) { t(this).wrap("<div>"); var i = t(this).attr("id"); t(this).removeAttr("id"), t(this).parent().attr("id", i) } }), i = s.$container.children()), s.init || i.css({ display: "none", left: 2 * s.width }), i.css({ position: "absolute", overflow: "hidden", height: "100%", width: s.width, top: 0, zIndex: 0 }) } }, c = { slide: function (i, t) { var n = s.$container.children(), e = n.eq(i.upcoming_slide); e.css({ left: i.upcoming_position, display: "block" }), s.$control.animate({ left: i.offset }, s.options.animation_speed, s.options.animation_easing, function () { s.size() > 1 && (s.$control.css({ left: -s.width }), n.eq(i.upcoming_slide).css({ left: s.width, zIndex: 2 }), i.outgoing_slide >= 0 && n.eq(i.outgoing_slide).css({ left: s.width, display: "none", zIndex: 0 })), t() }) }, fade: function (i, t) { var n = this, e = n.$container.children(), s = e.eq(i.outgoing_slide), o = e.eq(i.upcoming_slide); o.css({ left: this.width, opacity: 1, display: "block" }), i.outgoing_slide >= 0 ? s.animate({ opacity: 0 }, n.options.animation_speed, n.options.animation_easing, function () { n.size() > 1 && (e.eq(i.upcoming_slide).css({ zIndex: 2 }), i.outgoing_slide >= 0 && e.eq(i.outgoing_slide).css({ opacity: 1, display: "none", zIndex: 0 })), t() }) : (o.css({ zIndex: 2 }), t()) } }; c = t.extend(c, t.fn.superslides.fx); var d = { _centerY: function (i) { var n = t(i); n.css({ top: (s.height - n.height()) / 2 }) }, _centerX: function (i) { var n = t(i); n.css({ left: (s.width - n.width()) / 2 }) }, _center: function (i) { s.image._centerX(i), s.image._centerY(i) }, _aspectRatio: function (i) { if (!i.naturalHeight && !i.naturalWidth) { var t = new Image; t.src = i.src, i.naturalHeight = t.height, i.naturalWidth = t.width } return i.naturalHeight / i.naturalWidth }, _scale: function (i, n) { n = n || s.image._aspectRatio(i); var e = s.height / s.width, o = t(i); e > n ? o.css({ height: s.height, width: s.height / n }) : o.css({ height: s.width * n, width: s.width }) } }, l = { _setCurrent: function (i) { if (s.$pagination) { var t = s.$pagination.children(); t.removeClass("current"), t.eq(i).addClass("current") } }, _addItem: function (i) { var n = i + 1, e = n, o = s.$container.children().eq(i), a = o.attr("id"); a && (e = a); var r = t("<a>", { href: "#" + e, text: e }); r.appendTo(s.$pagination) }, _setup: function () { if (s.options.pagination && 1 !== s.size()) { var i = t("<nav>", { "class": s.options.elements.pagination.replace(/^\./, "") }); s.$pagination = i.appendTo(s.$el); for (var n = 0; s.size() > n; n++) s.pagination._addItem(n) } }, _events: function () { s.$el.on("click", s.options.elements.pagination + " a", function (i) { i.preventDefault(); var t = s._parseHash(this.hash), n = s._upcomingSlide(t - 1); n !== s.current && s.animate(n, function () { s.start() }) }) } }; return this.css = h, this.image = d, this.pagination = l, this.fx = c, this.animation = this.fx[this.options.animation], this.$control = this.$container.wrap(o).parent(".slides-control"), s._findPositions(), s.width = s._findWidth(), s.height = s._findHeight(), this.css.children(), this.css.containers(), this.css.images(), this.pagination._setup(), r() }, n.prototype = { _findWidth: function () { return t(this.options.inherit_width_from).width() }, _findHeight: function () { return t(this.options.inherit_height_from).height() }, _findMultiplier: function () { return 1 === this.size() ? 1 : 3 }, _upcomingSlide: function (i) { if (/next/.test(i)) return this._nextInDom(); if (/prev/.test(i)) return this._prevInDom(); if (/\d/.test(i)) return +i; if (i && /\w/.test(i)) { var t = this._findSlideById(i); return t >= 0 ? t : 0 } return 0 }, _findSlideById: function (i) { return this.$container.find("#" + i).index() }, _findPositions: function (i, t) { t = t || this, void 0 === i && (i = -1), t.current = i, t.next = t._nextInDom(), t.prev = t._prevInDom() }, _nextInDom: function () { var i = this.current + 1; return i === this.size() && (i = 0), i }, _prevInDom: function () { var i = this.current - 1; return 0 > i && (i = this.size() - 1), i }, _parseHash: function (t) { return t = t || i.location.hash, t = t.replace(/^#/, ""), t && !isNaN(+t) && (t = +t), t }, size: function () { return this.$container.children().length }, destroy: function () { return this.$el.removeData() }, update: function () { this.css.children(), this.css.containers(), this.css.images(), this.pagination._addItem(this.size()), this._findPositions(this.current), this.$el.trigger("updated.slides") }, stop: function () { clearInterval(this.play_id), delete this.play_id, this.$el.trigger("stopped.slides") }, start: function () { var n = this; n.options.hashchange ? t(i).trigger("hashchange") : this.animate(), this.options.play && (this.play_id && this.stop(), this.play_id = setInterval(function () { n.animate() }, this.options.play)), this.$el.trigger("started.slides") }, animate: function (t, n) { var e = this, s = {}; if (!(this.animating || (this.animating = !0, void 0 === t && (t = "next"), s.upcoming_slide = this._upcomingSlide(t), s.upcoming_slide >= this.size()))) { if (s.outgoing_slide = this.current, s.upcoming_position = 2 * this.width, s.offset = -s.upcoming_position, ("prev" === t || s.outgoing_slide > t) && (s.upcoming_position = 0, s.offset = 0), e.size() > 1 && e.pagination._setCurrent(s.upcoming_slide), e.options.hashchange) { var o = s.upcoming_slide + 1, a = e.$container.children(":eq(" + s.upcoming_slide + ")").attr("id"); i.location.hash = a ? a : o } e.$el.trigger("animating.slides", [s]), e.animation(s, function () { e._findPositions(s.upcoming_slide, e), "function" == typeof n && n(), e.animating = !1, e.$el.trigger("animated.slides"), e.init || (e.$el.trigger("init.slides"), e.init = !0, e.$container.fadeIn("fast")) }) } } }, t.fn[e] = function (i, s) { var o = []; return this.each(function () { var a, r, h; return a = t(this), r = a.data(e), h = "object" == typeof i && i, r || (o = a.data(e, r = new n(this, h))), "string" == typeof i && (o = r[i], "function" == typeof o) ? o = o.call(r, s) : void 0 }), o }, t.fn[e].fx = {} })(this, jQuery);



(function ($) {
    jQuery.fn.jetmenu = function (options) {
        var settings = {
            indicator: true     			// indicator that indicates a submenu
        , speed: 100     			// submenu speed
        , delay: 0					// submenu show delay
        , hideClickOut: true     			// hide submenus when click outside menu
        , align: "left"				// menu alignment (left/right)
        , submenuTrigger: "hover"			// defines if submenu appears after hover/click
        }
        $.extend(settings, options);
        var menu = $(".jetmenu");
        var lastScreenWidth = windowWidth();
        var bigScreen = false;
        $(menu).prepend("<li class='showhide'><span class='title'></span><i class='fa fa-bars'></i></li>");
        if (settings.indicator == true) {
            $(menu).find("a").each(function () {
                if ($(this).siblings(".dropdown, .megamenu").length > 0) {
                    $(this).append("<span class='indicator'><i class='fa fa-angle-right'></i></span>");
                }
            });
        }

        function bindHover() {
            if (navigator.userAgent.match(/Mobi/i) || window.navigator.msMaxTouchPoints > 0 || settings.submenuTrigger == "click") {
                $(menu).find("a").on("click touchstart", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(this).parent("li").siblings("li").find(".dropdown, .megamenu").stop(true, true).fadeOut(settings.speed);
                    if ($(this).siblings(".dropdown, .megamenu").css("display") == "none") {
                        $(this).siblings(".dropdown, .megamenu").stop(true, true).delay(settings.delay).fadeIn(settings.speed);
                        return false;
                    }
                    else {
                        $(this).siblings(".dropdown, .megamenu").stop(true, true).fadeOut(settings.speed);
                        $(this).siblings(".dropdown").find(".dropdown").stop(true, true).fadeOut(settings.speed);
                    }
                    window.location.href = $(this).attr("href");
                });

                $(menu).find("li").bind("mouseleave", function () {
                    $(this).children(".dropdown, .megamenu").stop(true, true).fadeOut(settings.speed);
                });

                if (settings.hideClickOut == true) {
                    $(document).bind("click.menu touchstart.menu", function (ev) {
                        if ($(ev.target).closest(menu).length == 0) {
                            $(menu).find(".dropdown, .megamenu").fadeOut(settings.speed);
                        }
                    });
                }
            }
            else {
                $(menu).find("li").bind("mouseenter", function () {
                    $(this).children(".dropdown, .megamenu").stop(true, true).delay(settings.delay).fadeIn(settings.speed);
                }).bind("mouseleave", function () {
                    $(this).children(".dropdown, .megamenu").stop(true, true).fadeOut(settings.speed);
                });
            }
        }

        function bindClick() {
            $(menu).find("li:not(.showhide)").each(function () {
                if ($(this).children(".dropdown, .megamenu").length > 0) {
                    $(this).children("a").bind("click", function (e) {
                        if ($(this).siblings(".dropdown, .megamenu").css("display") == "none") {
                            $(this).siblings(".dropdown, .megamenu").delay(settings.delay).slideDown(settings.speed).focus();
                            $(this).parent("li").siblings("li").find(".dropdown, .megamenu").slideUp(settings.speed);
                            return false;
                        }
                        else {
                            $(this).siblings(".dropdown, .megamenu").slideUp(settings.speed).focus();
                            firstItemClick = 1;
                        }
                    });
                }
            });
        }

        function showCollapse() {
            $(menu).children("li:not(.showhide)").hide(0);
            $(menu).children("li.showhide").show(0);
            $(menu).children("li.showhide").bind("click", function () {
                if ($(menu).children("li").is(":hidden")) {
                    $(menu).children("li").slideDown(settings.speed);
                }
                else {
                    $(menu).children("li:not(.showhide)").slideUp(settings.speed);
                    $(menu).children("li.showhide").show(0);
                    $(menu).find(".dropdown, .megamenu").hide(settings.speed);
                }
            });
        }

        function hideCollapse() {
            $(menu).children("li").show(0);
            $(menu).children("li.showhide").hide(0);
        }

        function rightAlignMenu() {
            $(menu).children("li").addClass("jsright");
            var items = $(menu).children("li");
            $(menu).children("li:not(.showhide)").detach();
            for (var i = items.length; i >= 1; i--) {
                $(menu).append(items[i]);
            }
            fixSubmenuRight();
        }

        function fixSubmenuRight() {
            $(menu).children("li").removeClass("last");
            var items = $(menu).children("li");
            for (var i = 1; i <= items.length; i++) {
                if ($(items[i]).children(".dropdown, .megamenu").length > 0) {
                    var lastItemsWidth = 0;
                    for (var y = 1; y <= i; y++) {
                        lastItemsWidth = lastItemsWidth + $(items[y]).outerWidth();
                    }
                    if ($(items[i]).children(".dropdown, .megamenu").outerWidth() > lastItemsWidth) {
                        $(items[i]).addClass("last");
                    }
                }
            }
        }

        function fixSubmenuLeft() {
            $(menu).children("li").removeClass("fix-sub");
            var items = $(menu).children("li");
            var menuWidth = $(menu).outerWidth();
            var itemsWidth = 0;
            for (var i = 1; i <= items.length; i++) {
                if ($(items[i]).children(".dropdown, .megamenu").length > 0) {
                    if ($(items[i]).position().left + $(items[i]).children(".dropdown, .megamenu").outerWidth() > menuWidth) {
                        $(items[i]).addClass("fix-sub");
                    }
                }
            }
        }

        function unbindEvents() {
            $(menu).find("li, a").unbind();
            $(document).unbind("click.menu touchstart.menu");
            $(menu).find(".dropdown, .megamenu").hide(0);
        }

        function windowWidth() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        }


        $(window).resize(function () {
            if (lastScreenWidth <= 768 && windowWidth() > 768) {
                unbindEvents();
                hideCollapse();
                bindHover();
                if (settings.align == "right" && bigScreen == false) {
                    rightAlignMenu();
                    bigScreen = true;
                }
            }
            if (lastScreenWidth > 768 && windowWidth() <= 768) {
                unbindEvents();
                showCollapse();
                bindClick();
                if (bigScreen == true) {
                    rightAlignMenu();
                    bigScreen = false;
                }
            }
            if (settings.align == "right") {
                if (lastScreenWidth > 768 && windowWidth() > 768)
                    fixSubmenuRight();
            }
            else {
                if (lastScreenWidth > 768 && windowWidth() > 768)
                    fixSubmenuLeft();
            }
            lastScreenWidth = windowWidth();
        });

        function screenSize() {
            if (windowWidth() <= 768) {
                showCollapse();
                bindClick();
                if (bigScreen == true) {
                    rightAlignMenu();
                    bigScreen = false;
                }
            }
            else {
                hideCollapse();
                bindHover();
                if (settings.align == "right") {
                    rightAlignMenu();
                    bigScreen = true;
                }
                else {
                    fixSubmenuLeft();
                }
            }
        }
        screenSize();

    }

}(jQuery));
///#source 1 1 /Content/Scripts/FrontEnd/jquery.isotope.min.js
/**
 * Isotope v1.5.21
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2012 David DeSandro / Metafizzy
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",t&&clearTimeout(t),t=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var u=["width","height"],v=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=u.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&v.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),v.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var w=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){w("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){w("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);





/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
 
 
 
 
 /*
 * Isotope PACKAGED v2.0.1
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

(function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function n(e,i){t.fn[e]=function(n){if("string"==typeof n){for(var s=o.call(arguments,1),a=0,u=this.length;u>a;a++){var p=this[a],h=t.data(p,e);if(h)if(t.isFunction(h[n])&&"_"!==n.charAt(0)){var f=h[n].apply(h,s);if(void 0!==f)return f}else r("no such method '"+n+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+n+"'")}return this}return this.each(function(){var o=t.data(this,e);o?(o.option(n),o._init()):(o=new i(this,n),t.data(this,e,o))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),n(t,e)},t.bridget}}var o=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i(t.jQuery)})(window),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,o=function(){};i.addEventListener?o=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(o=function(t,i,o){t[i+o]=o.handleEvent?function(){var i=e(t);o.handleEvent.call(o,i)}:function(){var i=e(t);o.call(t,i)},t.attachEvent("on"+i,t[i+o])});var n=function(){};i.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(o){t[e+i]=void 0}});var r={bind:o,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(this),function(t){function e(t){"function"==typeof t&&(e.isReady?t():r.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==n.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var o=0,s=r.length;s>o;o++){var a=r[o];a()}}}function o(o){return o.bind(n,"DOMContentLoaded",i),o.bind(n,"readystatechange",i),o.bind(t,"load",i),e}var n=t.document,r=[];e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],o)):t.docReady=o(t.eventie)}(this),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var o=t.prototype,n=this,r=n.EventEmitter;o.getListeners=function(t){var e,i,o=this._getEvents();if(t instanceof RegExp){e={};for(i in o)o.hasOwnProperty(i)&&t.test(i)&&(e[i]=o[i])}else e=o[t]||(o[t]=[]);return e},o.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},o.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},o.addListener=function(t,i){var o,n=this.getListenersAsObject(t),r="object"==typeof i;for(o in n)n.hasOwnProperty(o)&&-1===e(n[o],i)&&n[o].push(r?i:{listener:i,once:!1});return this},o.on=i("addListener"),o.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},o.once=i("addOnceListener"),o.defineEvent=function(t){return this.getListeners(t),this},o.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},o.removeListener=function(t,i){var o,n,r=this.getListenersAsObject(t);for(n in r)r.hasOwnProperty(n)&&(o=e(r[n],i),-1!==o&&r[n].splice(o,1));return this},o.off=i("removeListener"),o.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},o.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},o.manipulateListeners=function(t,e,i){var o,n,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(o=i.length;o--;)r.call(this,e,i[o]);else for(o in e)e.hasOwnProperty(o)&&(n=e[o])&&("function"==typeof n?r.call(this,o,n):s.call(this,o,n));return this},o.removeEvent=function(t){var e,i=typeof t,o=this._getEvents();if("string"===i)delete o[t];else if(t instanceof RegExp)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];else delete this._events;return this},o.removeAllListeners=i("removeEvent"),o.emitEvent=function(t,e){var i,o,n,r,s=this.getListenersAsObject(t);for(n in s)if(s.hasOwnProperty(n))for(o=s[n].length;o--;)i=s[n][o],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},o.trigger=i("emitEvent"),o.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},o.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},o._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return n.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof o[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,n=0,r=i.length;r>n;n++)if(e=i[n]+t,"string"==typeof o[e])return e}}var i="Webkit Moz ms Ms O".split(" "),o=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var o=s[e];t[o]=0}return t}function o(t){function o(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var o=r(t);if("none"===o.display)return i();var n={};n.width=t.offsetWidth,n.height=t.offsetHeight;for(var h=n.isBorderBox=!(!p||!o[p]||"border-box"!==o[p]),f=0,d=s.length;d>f;f++){var l=s[f],c=o[l];c=a(t,c);var y=parseFloat(c);n[l]=isNaN(y)?0:y}var m=n.paddingLeft+n.paddingRight,g=n.paddingTop+n.paddingBottom,v=n.marginLeft+n.marginRight,_=n.marginTop+n.marginBottom,I=n.borderLeftWidth+n.borderRightWidth,L=n.borderTopWidth+n.borderBottomWidth,z=h&&u,S=e(o.width);S!==!1&&(n.width=S+(z?0:m+I));var b=e(o.height);return b!==!1&&(n.height=b+(z?0:g+L)),n.innerWidth=n.width-(m+I),n.innerHeight=n.height-(g+L),n.outerWidth=n.width+v,n.outerHeight=n.height+_,n}}function a(t,e){if(n||-1===e.indexOf("%"))return e;var i=t.style,o=i.left,r=t.runtimeStyle,s=r&&r.left;return s&&(r.left=t.currentStyle.left),i.left=e,e=i.pixelLeft,i.left=o,s&&(r.left=s),e}var u,p=t("boxSizing");return function(){if(p){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[p]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var o=r(t);u=200===e(o.width),i.removeChild(t)}}(),o}var n=t.getComputedStyle,r=n?function(t){return n(t,null)}:function(t){return t.currentStyle},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],o):"object"==typeof exports?module.exports=o(require("get-style-property")):t.getSize=o(t.getStyleProperty)}(window),function(t,e){function i(t,e){return t[a](e)}function o(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function n(t,e){o(t);for(var i=t.parentNode.querySelectorAll(e),n=0,r=i.length;r>n;n++)if(i[n]===t)return!0;return!1}function r(t,e){return o(t),i(t,e)}var s,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,o=t.length;o>i;i++){var n=t[i],r=n+"MatchesSelector";if(e[r])return r}}();if(a){var u=document.createElement("div"),p=i(u,"div");s=p?i:r}else s=n;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return s}):window.matchesSelector=s}(this,Element.prototype),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){for(var e in t)return!1;return e=null,!0}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function n(t,n,r){function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var u=r("transition"),p=r("transform"),h=u&&p,f=!!r("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[u],l=["transform","transition","transitionDuration","transitionProperty"],c=function(){for(var t={},e=0,i=l.length;i>e;e++){var o=l[e],n=r(o);n&&n!==o&&(t[o]=n)}return t}();e(a.prototype,t.prototype),a.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=n(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var o=c[i]||i;e[o]=t[i]}},a.prototype.getPosition=function(){var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,o=e.isOriginTop,n=parseInt(t[i?"left":"right"],10),r=parseInt(t[o?"top":"bottom"],10);n=isNaN(n)?0:n,r=isNaN(r)?0:r;var a=this.layout.size;n-=i?a.paddingLeft:a.paddingRight,r-=o?a.paddingTop:a.paddingBottom,this.position.x=n,this.position.y=r},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var y=f?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),r=parseInt(e,10),s=n===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,u=e-o,p={},h=this.layout.options;a=h.isOriginLeft?a:-a,u=h.isOriginTop?u:-u,p.transform=y(a,u),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=h?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var m=p&&o(p)+",opacity";a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:m,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(d,this,!1))},a.prototype.transition=a.prototype[u?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=g[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(v)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!u||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}var r=t.getComputedStyle,s=r?function(t){return r(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],n):(t.Outlayer={},t.Outlayer.Item=n(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===f.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=l(e,t);-1!==i&&e.splice(i,1)}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,f,l,c,y){function m(t,i){if("string"==typeof t&&(t=a.querySelector(t)),!t||!d(t))return u&&u.error("Bad "+this.constructor.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.constructor.defaults),this.option(i);var o=++g;this.element.outlayerGUID=o,v[o]=this,this._create(),this.options.isInitLayout&&this.layout()}var g=0,v={};return m.namespace="outlayer",m.Item=y,m.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(m.prototype,f.prototype),m.prototype.option=function(t){e(this.options,t)},m.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},m.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},m.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0,r=e.length;r>n;n++){var s=e[n],a=new i(s,this);o.push(a)}return o},m.prototype._filterFindItemElements=function(t){t=o(t);for(var e=this.options.itemSelector,i=[],n=0,r=t.length;r>n;n++){var s=t[n];if(d(s))if(e){c(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),u=0,p=a.length;p>u;u++)i.push(a[u])}else i.push(s)}return i},m.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},m.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},m.prototype._init=m.prototype.layout,m.prototype._resetLayout=function(){this.getSize()},m.prototype.getSize=function(){this.size=l(this.element)},m.prototype._getMeasurement=function(t,e){var i,o=this.options[t];o?("string"==typeof o?i=this.element.querySelector(o):d(o)&&(i=o),this[t]=i?l(i)[e]:o):this[t]=0},m.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},m.prototype._getItemsForLayout=function(t){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i];n.isIgnored||e.push(n)}return e},m.prototype._layoutItems=function(t,e){function i(){o.emitEvent("layoutComplete",[o,t])}var o=this;if(!t||!t.length)return i(),void 0;this._itemsOn(t,"layout",i);for(var n=[],r=0,s=t.length;s>r;r++){var a=t[r],u=this._getItemLayoutPosition(a);u.item=a,u.isInstant=e||a.isLayoutInstant,n.push(u)}this._processLayoutQueue(n)},m.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},m.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];this._positionItem(o.item,o.x,o.y,o.isInstant)}},m.prototype._positionItem=function(t,e,i,o){o?t.goTo(e,i):t.moveTo(e,i)},m.prototype._postLayout=function(){this.resizeContainer()},m.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},m.prototype._getContainerSize=h,m.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},m.prototype._itemsOn=function(t,e,i){function o(){return n++,n===r&&i.call(s),!0}for(var n=0,r=t.length,s=this,a=0,u=t.length;u>a;a++){var p=t[a];p.on(e,o)}},m.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},m.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},m.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var o=t[e];this.ignore(o)}}},m.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var o=t[e];n(o,this.stamps),this.unignore(o)}},m.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o(t)):void 0},m.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},m.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},m.prototype._manageStamp=h,m.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,o=l(t),n={left:e.left-i.left-o.marginLeft,top:e.top-i.top-o.marginTop,right:i.right-e.right-o.marginRight,bottom:i.bottom-e.bottom-o.marginBottom};return n},m.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},m.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},m.prototype.unbindResize=function(){this.isResizeBound&&i.unbind(t,"resize",this),this.isResizeBound=!1},m.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},m.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},m.prototype.needsResizeLayout=function(){var t=l(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},m.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},m.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},m.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},m.prototype.reveal=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.reveal()}},m.prototype.hide=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.hide()}},m.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];if(o.element===t)return o}},m.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i],r=this.getItem(n);r&&e.push(r)}return e}},m.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,r=e.length;r>i;i++){var s=e[i];s.remove(),n(s,this.items)}}},m.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];o.destroy()}this.unbindResize(),delete this.element.outlayerGUID,p&&p.removeData(this.element,this.constructor.namespace)},m.data=function(t){var e=t&&t.outlayerGUID;return e&&v[e]},m.create=function(t,i){function o(){m.apply(this,arguments)}return Object.create?o.prototype=Object.create(m.prototype):e(o.prototype,m.prototype),o.prototype.constructor=o,o.defaults=e({},m.defaults),e(o.defaults,i),o.prototype.settings={},o.namespace=t,o.data=m.data,o.Item=function(){y.apply(this,arguments)},o.Item.prototype=new y,s(function(){for(var e=r(t),i=a.querySelectorAll(".js-"+e),n="data-"+e+"-options",s=0,h=i.length;h>s;s++){var f,d=i[s],l=d.getAttribute(n);try{f=l&&JSON.parse(l)}catch(c){u&&u.error("Error parsing "+n+" on "+d.nodeName.toLowerCase()+(d.id?"#"+d.id:"")+": "+c);continue}var y=new o(d,f);p&&p.data(d,t,y)}}),p&&p.bridget&&p.bridget(t,o),o},m.Item=y,m}var a=t.document,u=t.console,p=t.jQuery,h=function(){},f=Object.prototype.toString,d="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},l=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){function e(t){function e(){t.Item.apply(this,arguments)}e.prototype=new t.Item,e.prototype._create=function(){this.id=this.layout.itemGUID++,t.Item.prototype._create.call(this),this.sortData={}},e.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var i=e.prototype.destroy;return e.prototype.destroy=function(){i.apply(this,arguments),this.css({display:""})},e}"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window),function(t){function e(t,e){function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}return function(){function t(t){return function(){return e.prototype[t].apply(this.isotope,arguments)}}for(var o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],n=0,r=o.length;r>n;n++){var s=o[n];i.prototype[s]=t(s)}}(),i.prototype.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!==this.isotope.size.innerHeight},i.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},i.prototype.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},i.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=new i,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window),function(t){function e(t,e){var o=t.create("masonry");return o.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},o.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},o.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},o.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,o=e&&1>e?"round":"ceil",n=Math[o](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var r=this._getColGroup(n),s=Math.min.apply(Math,r),a=i(r,s),u={x:this.columnWidth*a,y:s},p=s+t.size.outerHeight,h=this.cols+1-r.length,f=0;h>f;f++)this.colYs[a+f]=p;return u},o.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;i>o;o++){var n=this.colYs.slice(o,o+t);e[o]=Math.max.apply(Math,n)}return e},o.prototype._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this.options.isOriginLeft?o.left:o.right,r=n+i.outerWidth,s=Math.floor(n/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?o.top:o.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(u,this.colYs[p])},o.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},o.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},o}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++){var n=t[i];if(n===e)return i}return-1};"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,i){var o=t.create("masonry"),n=o.prototype._getElementOffset,r=o.prototype.layout,s=o.prototype._getMeasurement;e(o.prototype,i.prototype),o.prototype._getElementOffset=n,o.prototype.layout=r,o.prototype._getMeasurement=s;var a=o.prototype.measureColumns;o.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,a.call(this)};var u=o.prototype._manageStamp;return o.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,u.apply(this,arguments)},o}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],i):i(t.Isotope.LayoutMode,t.Masonry)}(window),function(t){function e(t){var e=t.create("fitRows");return e.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0},e.prototype._getItemLayoutPosition=function(t){t.getSize(),0!==this.x&&t.size.outerWidth+this.x>this.isotope.size.innerWidth&&(this.x=0,this.y=this.maxY);var e={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=t.size.outerWidth,e},e.prototype._getContainerSize=function(){return{height:this.maxY}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t){var e=t.create("vertical",{horizontalAlignment:0});return e.prototype._resetLayout=function(){this.y=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},e.prototype._getContainerSize=function(){return{height:this.y}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===h.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=f(e,t);-1!==i&&e.splice(i,1)}function r(t,i,r,u,h){function f(t,e){return function(i,o){for(var n=0,r=t.length;r>n;n++){var s=t[n],a=i.sortData[s],u=o.sortData[s];if(a>u||u>a){var p=void 0!==e[s]?e[s]:e,h=p?1:-1;return(a>u?1:-1)*h}}return 0}}var d=t.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=u,d.LayoutMode=h,d.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),t.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var e in h.modes)this._initLayoutMode(e)},d.prototype.reloadItems=function(){this.itemGUID=0,t.prototype.reloadItems.call(this)},d.prototype._itemize=function(){for(var e=t.prototype._itemize.apply(this,arguments),i=0,o=e.length;o>i;i++){var n=e[i];n.id=this.itemGUID++}return this._updateItemsSortData(e),e},d.prototype._initLayoutMode=function(t){var i=h.modes[t],o=this.options[t]||{};this.options[t]=i.options?e(i.options,o):o,this.modes[t]=new i(this)},d.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?(this.arrange(),void 0):(this._layout(),void 0)},d.prototype._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},d.prototype.arrange=function(t){this.option(t),this._getIsInstant(),this.filteredItems=this._filter(this.items),this._sort(),this._layout()},d.prototype._init=d.prototype.arrange,d.prototype._getIsInstant=function(){var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=t,t},d.prototype._filter=function(t){function e(){f.reveal(n),f.hide(r)}var i=this.options.filter;i=i||"*";for(var o=[],n=[],r=[],s=this._getFilterTest(i),a=0,u=t.length;u>a;a++){var p=t[a];if(!p.isIgnored){var h=s(p);h&&o.push(p),h&&p.isHidden?n.push(p):h||p.isHidden||r.push(p)}}var f=this;return this._isInstant?this._noTransition(e):e(),o},d.prototype._getFilterTest=function(t){return s&&this.options.isJQueryFiltering?function(e){return s(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return r(e.element,t)}},d.prototype.updateSortData=function(t){this._getSorters(),t=o(t);
var e=this.getItems(t);e=e.length?e:this.items,this._updateItemsSortData(e)},d.prototype._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=l(i)}},d.prototype._updateItemsSortData=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];o.updateSortData()}};var l=function(){function t(t){if("string"!=typeof t)return t;var i=a(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),r=n&&n[1],s=e(r,o),u=d.sortDataParsers[i[1]];return t=u?function(t){return t&&u(s(t))}:function(t){return t&&s(t)}}function e(t,e){var i;return i=t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&p(i)}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},d.prototype._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=f(e,this.options.sortAscending);this.filteredItems.sort(i),t!==this.sortHistory[0]&&this.sortHistory.unshift(t)}},d.prototype._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw Error("No layout mode: "+t);return e.options=this.options[t],e},d.prototype._resetLayout=function(){t.prototype._resetLayout.call(this),this._mode()._resetLayout()},d.prototype._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},d.prototype._manageStamp=function(t){this._mode()._manageStamp(t)},d.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},d.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},d.prototype.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},d.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps();var o=this._filterRevealAdded(e);this.layoutItems(i),this.filteredItems=o.concat(this.filteredItems)}},d.prototype._filterRevealAdded=function(t){var e=this._noTransition(function(){return this._filter(t)});return this.layoutItems(e,!0),this.reveal(e),t},d.prototype.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;n>i;i++)o=e[i],this.element.appendChild(o.element);var r=this._filter(e);for(this._noTransition(function(){this.hide(r)}),i=0;n>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;n>i;i++)delete e[i].isLayoutInstant;this.reveal(r)}};var c=d.prototype.remove;return d.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(c.call(this,t),e&&e.length)for(var i=0,r=e.length;r>i;i++){var s=e[i];n(s,this.filteredItems)}},d.prototype.shuffle=function(){for(var t=0,e=this.items.length;e>t;t++){var i=this.items[t];i.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},d.prototype._noTransition=function(t){var e=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.call(this);return this.options.transitionDuration=e,i},d.prototype.getFilteredItemElements=function(){for(var t=[],e=0,i=this.filteredItems.length;i>e;e++)t.push(this.filteredItems[e].element);return t},d}var s=t.jQuery,a=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},u=document.documentElement,p=u.textContent?function(t){return t.textContent}:function(t){return t.innerText},h=Object.prototype.toString,f=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],r):t.Isotope=r(t.Outlayer,t.getSize,t.matchesSelector,t.Isotope.Item,t.Isotope.LayoutMode)}(window);
///#source 1 1 /Content/Scripts/FrontEnd/owl.carousel.min.js
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);
///#source 1 1 /Content/Scripts/FrontEnd/jquery.number.js
/**
 * jQuery number plug-in 2.1.0
 * Copyright 2012, Digital Fusion
 * Licensed under the MIT license.
 * http://opensource.teamdf.com/license/
 *
 * A jQuery plugin which implements a permutation of phpjs.org's number_format to provide
 * simple number formatting, insertion, and as-you-type masking of a number.
 * 
 * @author	Sam Sehnert
 * @docs	http://www.teamdf.com/web/jquery-number-format-redux/196/
 */
(function($){
	
	/**
	 * Method for selecting a range of characters in an input/textarea.
	 *
	 * @param int rangeStart			: Where we want the selection to start.
	 * @param int rangeEnd				: Where we want the selection to end.
	 *
	 * @return void;
	 */
	function setSelectionRange( rangeStart, rangeEnd )
	{
		// Check which way we need to define the text range.
		if( this.createTextRange )
		{
			var range = this.createTextRange();
				range.collapse( true );
				range.moveStart( 'character',	rangeStart );
				range.moveEnd( 'character',		rangeEnd-rangeStart );
				range.select();
		}
		
		// Alternate setSelectionRange method for supporting browsers.
		else if( this.setSelectionRange )
		{
			this.focus();
			this.setSelectionRange( rangeStart, rangeEnd );
		}
	}
	
	/**
	 * Get the selection position for the given part.
	 * 
	 * @param string part			: Options, 'Start' or 'End'. The selection position to get.
	 *
	 * @return int : The index position of the selection part.
	 */
	function getSelection( part )
	{
		var pos	= this.value.length;
		
		// Work out the selection part.
		part = ( part.toLowerCase() == 'start' ? 'Start' : 'End' );
		
		if( document.selection ){
			// The current selection
			var range = document.selection.createRange(), stored_range, selectionStart, selectionEnd;
			// We'll use this as a 'dummy'
			stored_range = range.duplicate();
			// Select all text
			//stored_range.moveToElementText( this );
			stored_range.expand('textedit');
			// Now move 'dummy' end point to end point of original range
			stored_range.setEndPoint( 'EndToEnd', range );
			// Now we can calculate start and end points
			selectionStart = stored_range.text.length - range.text.length;
			selectionEnd = selectionStart + range.text.length;
			return part == 'Start' ? selectionStart : selectionEnd;
		}
		
		else if(typeof(this['selection'+part])!="undefined")
		{
		 	pos = this['selection'+part];
		}
		return pos;
	}
	
	/**
	 * Substitutions for keydown keycodes.
	 * Allows conversion from e.which to ascii characters.
	 */
	var _keydown = {
		codes : {
			188 : 44,
			109 : 45,
			190 : 46,
			191 : 47,
			192 : 96,
			220 : 92,
			222 : 39,
			221 : 93,
			219 : 91,
			173 : 45,
			187 : 61, //IE Key codes
			186 : 59, //IE Key codes
			189 : 45, //IE Key codes
			110 : 46  //IE Key codes
        },
        shifts : {
			96 : "~",
			49 : "!",
			50 : "@",
			51 : "#",
			52 : "$",
			53 : "%",
			54 : "^",
			55 : "&",
			56 : "*",
			57 : "(",
			48 : ")",
			45 : "_",
			61 : "+",
			91 : "{",
			93 : "}",
			92 : "|",
			59 : ":",
			39 : "\"",
			44 : "<",
			46 : ">",
			47 : "?"
        }
    };
	
	/**
	 * jQuery number formatter plugin. This will allow you to format numbers on an element.
	 *
	 * @params proxied for format_number method.
	 *
	 * @return : The jQuery collection the method was called with.
	 */
	$.fn.number = function( number, decimals, dec_point, thousands_sep ){
	    
	    // Enter the default thousands separator, and the decimal placeholder.
	    thousands_sep	= (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
	    dec_point		= (typeof dec_point === 'undefined') ? '.' : dec_point;
	    decimals		= (typeof decimals === 'undefined' ) ? 0 : decimals;
	    	    
	    // Work out the unicode character for the decimal placeholder.
	    var u_dec			= ('\\u'+('0000'+(dec_point.charCodeAt(0).toString(16))).slice(-4)),
	    	regex_dec_num	= new RegExp('[^'+u_dec+'0-9]','g'),
	    	regex_dec		= new RegExp(u_dec,'g');
	    
	    // If we've specified to take the number from the target element,
	    // we loop over the collection, and get the number.
	    if( number === true )
	    {
	    	// If this element is a number, then we add a keyup
	    	if( this.is('input:text') )
	    	{
	    		// Return the jquery collection.
	    		return this.on({
	    			
	    			/**
	    			 * Handles keyup events, re-formatting numbers.
	    			 *
	    			 * @param object e			: the keyup event object.s
	    			 *
	    			 * @return void;
	    			 */
	    			'keydown.format' : function(e){
	    				
	    				// Define variables used in the code below.
	    				var $this	= $(this),
	    					data	= $this.data('numFormat'),
	    					code	= (e.keyCode ? e.keyCode : e.which),
							chara	= '', //unescape(e.originalEvent.keyIdentifier.replace('U+','%u')),
	    					start	= getSelection.apply(this,['start']),
	    					end		= getSelection.apply(this,['end']),
	    					val		= '',
	    					setPos	= false;
	    				
	    				// Webkit (Chrome & Safari) on windows screws up the keyIdentifier detection
	    				// for numpad characters. I've disabled this for now, because while keyCode munging
	    				// below is hackish and ugly, it actually works cross browser & platform.
	    				
//	    				if( typeof e.originalEvent.keyIdentifier !== 'undefined' )
//	    				{
//	    					chara = unescape(e.originalEvent.keyIdentifier.replace('U+','%u'));
//	    				}
//	    				else
//	    				{
	    					if (_keydown.codes.hasOwnProperty(code)) {
					            code = _keydown.codes[code];
					        }
					        if (!e.shiftKey && (code >= 65 && code <= 90)){
					        	code += 32;
					        } else if (!e.shiftKey && (code >= 69 && code <= 105)){
					        	code -= 48;
					        } else if (e.shiftKey && _keydown.shifts.hasOwnProperty(code)){
					            //get shifted keyCode value
					            chara = _keydown.shifts[code];
					        }
					        
					        if( chara == '' ) chara = String.fromCharCode(code);
//	    				}
	    				
	    				// Stop executing if the user didn't type a number key, a decimal character, or backspace.
	    				if( code !== 8 && chara != dec_point && !chara.match(/[0-9]/) )
	    				{
	    					// We need the original keycode now...
	    					var key = (e.keyCode ? e.keyCode : e.which);
	    					if( // Allow control keys to go through... (delete, etc)
	    						key == 46 || key == 8 || key == 9 || key == 27 || key == 13 || 
	    						// Allow: Ctrl+A, Ctrl+R
	    						( (key == 65 || key == 82 ) && ( e.ctrlKey || e.metaKey ) === true ) || 
	    						// Allow: home, end, left, right
	    						( (key >= 35 && key <= 39) )
							){
								return;
							}
							// But prevent all other keys.
							e.preventDefault();
							return false;
	    				}
	    				
	    				//console.log('Continuing on: ', code, chara);
	    				
	    				// The whole lot has been selected, or if the field is empty, and the character
	    				if( ( start == 0 && end == this.value.length || $this.val() == 0 ) && !e.metaKey && !e.ctrlKey && !e.altKey && chara.length === 1 && chara != 0 )
	    				{
	    					// Blank out the field, but only if the data object has already been instanciated.
    						start = end = 1;
    						this.value = '';
    						
    						// Reset the cursor position.
	    					data.init = (decimals>0?-1:0);
	    					data.c = (decimals>0?-(decimals+1):0);
	    					setSelectionRange.apply(this, [0,0]);
	    				}
	    				
	    				// Otherwise, we need to reset the caret position
	    				// based on the users selection.
	    				else
	    				{
	    					data.c = end-this.value.length;
	    				}
	    				
	    				// If the start position is before the decimal point,
	    				// and the user has typed a decimal point, we need to move the caret
	    				// past the decimal place.
	    				if( decimals > 0 && chara == dec_point && start == this.value.length-decimals-1 )
	    				{
	    					data.c++;
	    					data.init = Math.max(0,data.init);
	    					e.preventDefault();
	    					
	    					// Set the selection position.
	    					setPos = this.value.length+data.c;
	    				}
	    				
	    				// If the user is just typing the decimal place,
	    				// we simply ignore it.
	    				else if( chara == dec_point )
	    				{
	    					data.init = Math.max(0,data.init);
	    					e.preventDefault();
	    				}
	    				
	    				// If hitting the delete key, and the cursor is behind a decimal place,
	    				// we simply move the cursor to the other side of the decimal place.
	    				else if( decimals > 0 && code == 8 && start == this.value.length-decimals )
	    				{
	    					e.preventDefault();
	    					data.c--;
	    					
	    					// Set the selection position.
	    					setPos = this.value.length+data.c;
	    				}
	    				
	    				// If hitting the delete key, and the cursor is to the right of the decimal
	    				// (but not directly to the right) we replace the character preceeding the
	    				// caret with a 0.
	    				else if( decimals > 0 && code == 8 && start > this.value.length-decimals )
	    				{
	    					if( this.value === '' ) return;
	    					
	    					// If the character preceeding is not already a 0,
	    					// replace it with one.
	    					if( this.value.slice(start-1, start) != '0' )
	    					{
	    						val = this.value.slice(0, start-1) + '0' + this.value.slice(start);
	    						$this.val(val.replace(regex_dec_num,'').replace(regex_dec,dec_point));
	    					}
	    					
	    					e.preventDefault();
	    					data.c--;
	    					
	    					// Set the selection position.
	    					setPos = this.value.length+data.c;
	    				}
	    				
	    				// If the delete key was pressed, and the character immediately
	    				// before the caret is a thousands_separator character, simply
	    				// step over it.
	    				else if( code == 8 && this.value.slice(start-1, start) == thousands_sep )
	    				{
	    					e.preventDefault();
	    					data.c--;
	    					
	    					// Set the selection position.
	    					setPos = this.value.length+data.c;
	    				}
	    				
	    				// If the caret is to the right of the decimal place, and the user is entering a
	    				// number, remove the following character before putting in the new one. 
	    				else if(
	    					decimals > 0 &&
	    					start == end &&
	    					this.value.length > decimals+1 &&
	    					start > this.value.length-decimals-1 && isFinite(+chara) &&
		    				!e.metaKey && !e.ctrlKey && !e.altKey && chara.length === 1
	    				)
	    				{
	    					// If the character preceeding is not already a 0,
	    					// replace it with one.
	    					if( end === this.value.length )
	    					{
	    						val = this.value.slice(0, start-1);
	    					}
	    					else
	    					{
	    						val = this.value.slice(0, start)+this.value.slice(start+1);
	    					}
	    					
	    					// Reset the position.
	    					this.value = val;
	    					setPos = start;
	    				}
	    				
	    				// If we need to re-position the characters.
	    				if( setPos !== false )
	    				{
	    					//console.log('Setpos keydown: ', setPos );
	    					setSelectionRange.apply(this, [setPos, setPos]);
	    				}
	    				
	    				// Store the data on the element.
	    				$this.data('numFormat', data);
	    				
	    			},
	    			
	    			/**
	    			 * Handles keyup events, re-formatting numbers.
	    			 *
	    			 * @param object e			: the keyup event object.s
	    			 *
	    			 * @return void;
	    			 */
	    			'keyup.format' : function(e){
	    				
	    				// Store these variables for use below.
	    				var $this	= $(this),
	    					data	= $this.data('numFormat'),
	    					code	= (e.keyCode ? e.keyCode : e.which),
	    					start	= getSelection.apply(this,['start']),
	    					setPos;
	    				    				    			
	    				// Stop executing if the user didn't type a number key, a decimal, or a comma.
	    				if( this.value === '' || (code < 48 || code > 57) && (code < 96 || code > 105 ) && code !== 8 ) return;
	    				
	    				// Re-format the textarea.
	    				$this.val($this.val());
	    				
	    				if( decimals > 0 )
	    				{
		    				// If we haven't marked this item as 'initialised'
		    				// then do so now. It means we should place the caret just 
		    				// before the decimal. This will never be un-initialised before
		    				// the decimal character itself is entered.
		    				if( data.init < 1 )
		    				{
		    					start		= this.value.length-decimals-( data.init < 0 ? 1 : 0 );
		    					data.c		= start-this.value.length;
		    					data.init	= 1;
		    					
		    					$this.data('numFormat', data);
		    				}
		    				
		    				// Increase the cursor position if the caret is to the right
		    				// of the decimal place, and the character pressed isn't the delete key.
		    				else if( start > this.value.length-decimals && code != 8 )
		    				{
		    					data.c++;
		    					
		    					// Store the data, now that it's changed.
		    					$this.data('numFormat', data);
		    				}
	    				}
	    				
	    				//console.log( 'Setting pos: ', start, decimals, this.value.length + data.c, this.value.length, data.c );
	    				
	    				// Set the selection position.
	    				setPos = this.value.length+data.c;
	    				setSelectionRange.apply(this, [setPos, setPos]);
	    			},
	    			
	    			/**
	    			 * Reformat when pasting into the field.
	    			 *
	    			 * @param object e 		: jQuery event object.
	    			 *
	    			 * @return false : prevent default action.
	    			 */
	    			'paste.format' : function(e){
	    				
	    				// Defint $this. It's used twice!.
	    				var $this		= $(this),
	    					original	= e.originalEvent,
	    					val		= null;
						
						// Get the text content stream.
						if (window.clipboardData && window.clipboardData.getData) { // IE
							val = window.clipboardData.getData('Text');
						} else if (original.clipboardData && original.clipboardData.getData) {
							val = original.clipboardData.getData('text/plain');
						}
						
	    				// Do the reformat operation.
	    				$this.val(val);
	    				
	    				// Stop the actual content from being pasted.
	    				e.preventDefault();
	    				return false;
	    			}
	    		
	    		})
	    		
	    		// Loop each element (which isn't blank) and do the format.
    			.each(function(){
    			
    				var $this = $(this).data('numFormat',{
    					c				: -(decimals+1),
    					decimals		: decimals,
    					thousands_sep	: thousands_sep,
    					dec_point		: dec_point,
    					regex_dec_num	: regex_dec_num,
    					regex_dec		: regex_dec,
    					init			: false
    				});
    				
    				// Return if the element is empty.
    				if( this.value === '' ) return;
    				
    				// Otherwise... format!!
    				$this.val($this.val());
    			});
	    	}
	    	else
	    	{
		    	// return the collection.
		    	return this.each(function(){
		    		var $this = $(this), num = +$this.text().replace(regex_dec_num,'').replace(regex_dec,'.');
		    		$this.number( !isFinite(num) ? 0 : +num, decimals, dec_point, thousands_sep );
		    	});
	    	}
	    }
	    
	    // Add this number to the element as text.
	    return this.text( $.number.apply(window,arguments) );
	};
	
	//
	// Create .val() hooks to get and set formatted numbers in inputs.
	//
	
	// We check if any hooks already exist, and cache
	// them in case we need to re-use them later on.
	var origHookGet = null, origHookSet = null;
	 
	// Check if a text valHook already exists.
	if( $.valHooks.text )
	{
	    // Preserve the original valhook function
	    // we'll call this for values we're not 
	    // explicitly handling.
	    origHookGet = $.valHooks.text.get;
	    origHookSet = $.valHooks.text.set;
	}
	else
	{
	    // Define an object for the new valhook.
	    $.valHooks.text = {};
	} 
	
	/**
	 * Define the valHook to return normalised field data against an input
	 * which has been tagged by the number formatter.
	 *
	 * @param object el			: The raw DOM element that we're getting the value from.
	 *
	 * @return mixed : Returns the value that was written to the element as a
	 *				   javascript number, or undefined to let jQuery handle it normally.
	 */
	$.valHooks.text.get = function( el ){
		
		// Get the element, and its data.
		var $this	= $(el), num,
			data	= $this.data('numFormat');
		
        // Does this element have our data field?
        if( !data )
        {
            // Check if the valhook function already existed
            if( $.isFunction( origHookGet ) )
            {
                // There was, so go ahead and call it
                return origHookGet(el);
            }
            else
            {
                // No previous function, return undefined to have jQuery
                // take care of retrieving the value
                return undefined;
			}
		}
		else
		{			
			// Remove formatting, and return as number.
			if( el.value === '' ) return '';
			
			// Convert to a number.
			num = +(el.value
				.replace( data.regex_dec_num, '' )
				.replace( data.regex_dec, '.' ));
			
			// If we've got a finite number, return it.
			// Otherwise, simply return 0.
			// Return as a string... thats what we're
			// used to with .val()
			return ''+( isFinite( num ) ? num : 0 );
		}
	};
	
	/**
	 * A valhook which formats a number when run against an input
	 * which has been tagged by the number formatter.
	 *
	 * @param object el		: The raw DOM element (input element).
	 * @param float			: The number to set into the value field.
	 *
	 * @return mixed : Returns the value that was written to the element,
	 *				   or undefined to let jQuery handle it normally. 
	 */
	$.valHooks.text.set = function( el, val )
	{
		// Get the element, and its data.
		var $this	= $(el),
			data	= $this.data('numFormat');
		
		// Does this element have our data field?
		if( !data )
		{
		    // Check if the valhook function already existed
		    if( $.isFunction( origHookSet ) )
		    {
		        // There was, so go ahead and call it
		        return origHookSet(el,val);
		    }
		    else
		    {
		        // No previous function, return undefined to have jQuery
		        // take care of retrieving the value
		        return undefined;
			}
		}
		else
		{
			return el.value = $.number( val, data.decimals, data.dec_point, data.thousands_sep )
		}
	};
	
	/**
	 * The (modified) excellent number formatting method from PHPJS.org.
	 * http://phpjs.org/functions/number_format/
	 *
	 * @modified by Sam Sehnert (teamdf.com)
	 *	- don't redefine dec_point, thousands_sep... just overwrite with defaults.
	 *	- don't redefine decimals, just overwrite as numeric.
	 *	- Generate regex for normalizing pre-formatted numbers.
	 *
	 * @param float number			: The number you wish to format, or TRUE to use the text contents
	 *								  of the element as the number. Please note that this won't work for
	 *								  elements which have child nodes with text content.
	 * @param int decimals			: The number of decimal places that should be displayed. Defaults to 0.
	 * @param string dec_point		: The character to use as a decimal point. Defaults to '.'.
	 * @param string thousands_sep	: The character to use as a thousands separator. Defaults to ','.
	 *
	 * @return string : The formatted number as a string.
	 */
	$.number = function( number, decimals, dec_point, thousands_sep ){
		
		// Set the default values here, instead so we can use them in the replace below.
		thousands_sep	= (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
		dec_point		= (typeof dec_point === 'undefined') ? '.' : dec_point;
		decimals		= !isFinite(+decimals) ? 0 : Math.abs(decimals);
		
		// Work out the unicode representation for the decimal place.	
		var u_dec = ('\\u'+('0000'+(dec_point.charCodeAt(0).toString(16))).slice(-4));
		
		// Fix the number, so that it's an actual number.
		number = (number + '')
			.replace(new RegExp(u_dec,'g'),'.')
			.replace(new RegExp('[^0-9+\-Ee.]','g'),'');
		
		var n = !isFinite(+number) ? 0 : +number,
		    s = '',
		    toFixedFix = function (n, decimals) {
		        var k = Math.pow(10, decimals);
		        return '' + Math.round(n * k) / k;
		    };
		
		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (decimals ? toFixedFix(n, decimals) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
		    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
		}
		if ((s[1] || '').length < decimals) {
		    s[1] = s[1] || '';
		    s[1] += new Array(decimals - s[1].length + 1).join('0');
		}
		return s.join(dec_point);
	}
	
})(jQuery);

///#source 1 1 /Content/Scripts/DevOrgPlugins/developers-organism.component.js
/// <reference path="faster-jQuery.js" />
/// <reference path="../jquery-2.1.3.js" />
/// <reference path="../jquery-2.1.3.intellisense.js" />
/// <reference path="../bootstrap.min.js" />
/// <reference path="../bootstrap-table.js" />
/// <reference path="../jquery.validate.js" />
/// <reference path="../modernizr-2.8.3.js" />
/// <reference path="../star-rating.js" />
/// <reference path="../moment.js" />
/// <reference path="../underscore.js" />
/// <reference path="developers-organism.component.js" />


/*!
 * Written by Alim Ul Karim
 * Developers Organism
 * https://www.facebook.com/DevelopersOrganism
 * mailto:info@developers-organism.com
*/


$.fn.extend({
    // jQuery element get all classes
    getAllClasses: function () {
        if (this.length === 1) {
            return this.attr("class").split(/\s+/);
        }
        return null;
    }
});


$.devOrg = {

    genericComboClass: "devCombo",

    // get all the classes from an jQuery element
    getAllClasses: function (jQueryHtmlElement) {
        return jQueryHtmlElement.getAllClasses();
    },

    // allClassesArray = ['a','b','c'] , exceptClassesArray=['b','c'], results=['a']
    getClassesExcept: function (allClassesArray, exceptClassesArray) {
        if (allClassesArray === null || allClassesArray === undefined) {
            return [];
        }

        if (exceptClassesArray === null || exceptClassesArray === undefined) {
            return allClassesArray;
        }
        var len = allClassesArray.length;
        var results = [];
        for (var i = 0; i < len; i++) {
            if (exceptClassesArray.indexOf(allClassesArray[i]) === -1) {
                // not found
                results.push(allClassesArray[i]);
            }
        }
        return results;
    },
    // all Selectors are jQuery Selector Text  only.
    // selectpicker will be called inside function, no need to call outside.
    countryFlagRefresh: function (countrySelector, dropDownItemsSelector, dropDownBtnSelector) {
        /// <summary>
        /// Make country selector to selector
        /// and get refresh flag 
        /// </summary>
        /// <param name="countrySelector">Select country and make it selectpicker()</param>
        /// <param name="dropDownItemsSelector"></param>
        /// <param name="dropDownBtnSelector"></param>
        var countryBox = $.queryAll(countrySelector).selectpicker(); // only select a select element then apply the custom bootstrap selector
        var dropDownItems = $.queryAll(dropDownItemsSelector); // getting generated dropdown items from the custom bootstrap selector
        var dropDownBtn = $.queryAll(dropDownBtnSelector); // generated new button from the selectpicker option
        var skippingClassesAnchor = ["flag-country-combo", "flag"];
        var skippingClassesForBtn = ["btn", "dropdown-toggle", "selectpicker", "btn-success", "flag-combo"];
        // console.log(dropDownItems.length);
        countryBox.change(function (e) {
            var listItem = dropDownItems.find("li.selected");
            var anchorItem = listItem.find("a");
            var listOfAllAnchorClasses = anchorItem.getAllClasses();
            var listOfAllClassesdropDownBtn = dropDownBtn.getAllClasses();
            var flagClass = $.devOrg.getClassesExcept(listOfAllAnchorClasses, skippingClassesAnchor);
            var btnFlagClass = $.devOrg.getClassesExcept(listOfAllClassesdropDownBtn, skippingClassesForBtn);
            for (var i = 0; i < btnFlagClass.length; i++) {
                dropDownBtn.removeClass(btnFlagClass[i]);
            }
            dropDownBtn.addClass("fc-" + flagClass[0]);
        });
    },
    // countryFlagRefresh must be called first or selectpicker must be called first
    // all Selectors are jQuery Selector Text  only.
    countryRelatedToPhone: function (countrySelector, dropDownItemsSelector, dropDownBtnSelector, phoneNumberInputSelector) {
        var countryBox = $.queryAll(countrySelector);
        var dropDownItems = $.queryAll(dropDownItemsSelector);
        //var dropDownBtn = $.queryAll(dropDownBtnSelector);
        var phoneNumberBox = $.queryAll(phoneNumberInputSelector);
        var previousCallingCode = "";

        function selectChangeState() {
            // console.log("executed");
            var listItem = dropDownItems.find("li.selected");
            var spanText = listItem.find("a > span").text().toString();
            var newCallingCode = $.devOrg.getTextBetween(spanText, "(", ")");
            var getWrittenPhoneNumber = phoneNumberBox.val();
            // console.log(listItem);
            newCallingCode = $.devOrg.replaceStartsWith(newCallingCode, "+", "");
            if ((!_.isEmpty(getWrittenPhoneNumber) && !_.isEmpty(previousCallingCode))
                && $.devOrg.isStartsWith(getWrittenPhoneNumber, previousCallingCode)) {
                getWrittenPhoneNumber = $.devOrg.replaceStartsWith(getWrittenPhoneNumber, previousCallingCode, newCallingCode);
            } else {
                getWrittenPhoneNumber = newCallingCode + getWrittenPhoneNumber;
            }
            previousCallingCode = newCallingCode;
            phoneNumberBox.val(getWrittenPhoneNumber);
        }

        countryBox.ready(selectChangeState).change(selectChangeState);
        //phoneNumberBox.keyup(selectChangeState);
        // $("#selectID option")[index].selected = true;
    },

    getTextBetween: function (givenString, startSequence, endingSequence) {
        if (_.isString(givenString)) {
            var index1 = givenString.indexOf(startSequence);
            if (index1 > -1) {
                var index2 = givenString.indexOf(endingSequence);
                if (index2 > -1) {
                    // exist
                    return givenString.substr(index1 + 1, index2 - index1 - 1);
                }
            }
        }
        return null;
    },
    
    getComboString: function (comboName, comboClass, comboId, stringOptionItems, additionalAttributes) {
        /// <summary>
        /// returns a select/combo making string
        /// </summary>
        /// <param name="comboName">Name of the combo/select</param>
        /// <param name="comboClass">Class for the combo/select</param>
        /// <param name="comboId">Just pass the id or give null, it will automatically formatted</param>
        /// <param name="stringOptionItems">Option items passed as an string</param>
        /// <param name="additionalAttributes">Add additional attributes with the select, however user have to format it. Eg. id='hello' </param>
        if (!_.isEmpty(comboId)) {
            comboId = " id='" + comboId + "' ";
        } else {
            comboId = "";
        }
        if (_.isEmpty(comboClass)) {
            comboClass = "";
        }
        if (_.isEmpty(stringOptionItems)) {
            stringOptionItems = "";
        }
        if (_.isEmpty(comboName)) {
            comboName = "";
        } else {
            comboName = " name='" + comboName + "' ";
        }
        var comboString = "<select " + comboName +
                              " class='" + $.devOrg.genericComboClass +
                              " form-control " + comboClass +
                              " selectpicker'" + comboId +
                              " data-style='" + comboClass + "' " +
                              additionalAttributes +
                              " data-live-search='true'>" +
                              stringOptionItems +
                              " </select>";

        return comboString;
    },
    getComboOptionsStringFromJson: function (jsonItems, extraHtmlWithEachElement, itemClasses) {
        /// <summary>
        /// Generates and append "option" items to the given $select. 
        /// </summary>
        /// <param name="jsonItems">must contain display and id value for every 'option' item.</param>
        /// <param name="extraHtmlWithEachElement">add the extra html content with option display value</param>
        /// <param name="itemClasses">add classes with each option.</param>
        if (_.isEmpty(itemClasses)) {
            itemClasses = "";
        }
        if (_.isEmpty(extraHtmlWithEachElement)) {
            extraHtmlWithEachElement = "";
        }
        if (jsonItems.length > 0) {
            var length = jsonItems.length;
            var options = new Array(length + 5);
            var selected = " selected='selected' ";
            var optionStarting = "<option class='" + itemClasses + "'";
            var optionEnding = "</option>";
            for (var i = 0; i < length; i++) {
                if (i !== 0 && selected !== "") {
                    selected = ""; //only first one will be selected
                }
                options[i] = optionStarting +
                             selected +
                             " value='" +
                             jsonItems[i].id +
                             "'>" +
                             extraHtmlWithEachElement +
                             jsonItems[i].display +
                             optionEnding;
            }
            return options.join("");
        }
        return "";
    },
    getWholeComboStringWithJsonItems: function (jsonItems, comboName, comboClass, comboId, additionalAttributesWithCombo, extraHtmlWithEachElement, eachOptionItemClasses) {
        /// <summary>
        /// Returns a full combo/select based on json items
        /// Developer should inject this into document
        /// </summary>
        /// <param name="comboName">Name of the combo/select</param>
        /// <param name="comboClass">Class for the combo/select</param>
        /// <param name="comboId">Just pass the id or give null, it will automatically formatted</param>
        /// <param name="stringOptionItems">Option items passed as an string</param>
        /// <param name="additionalAttributes">Add additional attributes with the select, however user have to format it. Eg. id='hello' </param>
        /// <param name="jsonItems">must contain display and id value for every 'option' item.</param>
        /// <param name="extraHtmlWithEachElement">add the extra html content with option display value</param>
        /// <param name="itemClasses">add classes with each option.</param>
        var optionsString = $.devOrg.getComboOptionsStringFromJson(jsonItems, extraHtmlWithEachElement, eachOptionItemClasses);
        var comboString = $.devOrg.getComboString(comboName, comboClass, comboId, optionsString, additionalAttributesWithCombo);
        return comboString;
    },
    smartDependableCombo: function (parentSelectsjQuerySelector,
                                    mainDivContainerSelector,
                                    innerDivSelectorForPlacingCombo,
                                    receivingJsonUrl,
                                    placingComboName,
                                    placedComboId,
                                    placedComboClass,
                                    placedComboAdditionalAttributes,
                                    placedComboAdditionalClassesWithEachItem,
                                    placedComboAdditionalHtmlWithEachItem) {
        /// <summary>
        /// Create dependable combo based on parent and given url to get json list.
        /// Warning: No combo/select will appear , even the main div will disappear if no item is received from the receivingJsonUrl.
        /// </summary>
        /// <param name="parentSelectsjQuerySelector">Write jQuery selector for only the parent combo/select</param>
        /// <param name="mainDivContainerSelector">Main container div of that select/combo. Reason is to hide all including labels when no items found from url.</param>
        /// <param name="innerDivSelectorForPlacingCombo">Where to place the combo/slect</param>
        /// <param name="receivingJsonUrl">Url to get json list, data must contain at least {display= value to display, id = value to put}</param>
        /// <param name="placingComboName">Name of the select/combo</param>
        /// <param name="placedComboId">Id of the select/combo</param>
        /// <param name="placedComboClass">classes of the select/combo</param>
        /// <param name="placedComboAdditionalAttributes">Add additional attributes with the select, however user have to format it. Eg. id='hello'</param>
        /// <param name="placedComboAdditionalClassesWithEachItem">Add extra classes with every option, only write the class names with space.</param>
        /// <param name="placedComboAdditionalHtmlWithEachItem">Add extra html content with each option item</param>
        var $parentCombo = $.queryAll(parentSelectsjQuerySelector);
        if (_.isEmpty($parentCombo)) {
            console.error.log("error raised from developers organism component's smartDependableCombo that no parent is detected.");
            return; // nothing exist in parent.
        }
        // row container
        var $mainDiv = $.queryAll(mainDivContainerSelector);
        // container for  the select
        var $innerDiv = $mainDiv.find(innerDivSelectorForPlacingCombo);

        function hideDiv() {
            if ($mainDiv.length > 0) {
                $mainDiv.hide();
            } else {
                console.error.log("devOrg->smartDependableCombo: main div not found for '" + mainDivContainerSelector + "'");
            }
        }

        hideDiv();

        function removeSelectIfExist() {
            var options = $innerDiv.find("select, div.bootstrap-select");
            if (options.length > 0) {
                options.remove();
            }
        }

        function createCombo(responseJson) {
            //(comboName, comboClass, comboId, additionalAttributes, jsonItems, extraHtmlWithEachElement, itemClasses)
            var comboString = $.devOrg.getWholeComboStringWithJsonItems(responseJson, placingComboName, placedComboClass, placedComboId, placedComboAdditionalAttributes, placedComboAdditionalHtmlWithEachItem, placedComboAdditionalClassesWithEachItem);
            //var insideDivHtml = $innerDiv.html();
            //var wholeCombo = comboString + insideDivHtml;
            $innerDiv.prepend(comboString);

            var $combo = $innerDiv.find("select");
            $combo.selectpicker();
        }
        //when parent combo/select is changed
        $parentCombo.change(function () {
            /// <summary>
            /// What will happen when parent combo/select changes item.
            /// </summary>
            var parentComboValue = $parentCombo.val();
            var actualUrl = receivingJsonUrl + "/" + parentComboValue;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: actualUrl,
                success: function (response) {
                    if (response.length === 0) {
                        hideDiv();
                        return;
                    }
                    $innerDiv = $.queryAll(mainDivContainerSelector + " " + innerDivSelectorForPlacingCombo);
                    // items exist.
                    // $innerDiv is used to check if select exist or not.
                    removeSelectIfExist(); //remove inner options if exist any
                    $mainDiv.show("slow");
                    createCombo(response); // create if necessary and then append options to it.
                },
                error: function (xhr, status, error) {
                    hideDiv();
                }
            });
        });
    },

    
    bootstrapComboSelectbyFindingValue: function (comboSelector, searchForvalue) {
        $(comboSelector).selectpicker("val", searchForvalue).trigger("change");
    },
    bootstrapComboSelectIndex: function (comboSelector, index) {
        var $combo = $.queryAll(comboSelector + ">option");
        if ($combo.length > 0 && index <= ($combo.length - 1)) {

            var itemFound = $($combo[index]);
            var value = itemFound.val();
            $.devOrg.bootstrapComboSelectbyFindingValue(comboSelector, value);
        }
    },

    // givenString "Example ( Hello )" 
    // startsWith= "Example" ; returns true.
    isStartsWith: function (givenString, startsWith) {
        if (_.isString(givenString)) {
            var subtringOfGiventext = givenString.substr(0, startsWith.length);
            if (subtringOfGiventext === startsWith) {
                return true;
            }
        }
        return false;
    },

    replaceStartsWith: function (givenString, findStartsWith, replaceString) {
        if (_.isString(givenString) && !_.isEmpty(findStartsWith)) {
            var subtringOfGiventext = givenString.substr(0, findStartsWith.length);
            if (subtringOfGiventext === findStartsWith) {
                var nextStringIndex = findStartsWith.length;
                var otherHalftext = givenString.substr(nextStringIndex, givenString.length - nextStringIndex);
                return replaceString + otherHalftext;
            }
        }
        return givenString;
    },

    // jquery formSelector, submitAtLast:true/false
    enterToNextTextBox: function (formSelector, submitAtLast) {
        var $form = $.queryAll(formSelector);

        $form.find("input:text:first-child").focus();

        //var binders = formSelector + " input[type='text']:visible," +
        //    formSelector + " input[type='password']:visible," +
        //    formSelector + " input[type='numeric']:visible," +
        //    formSelector + " input[type='email']:visible," +
        //    //formSelector + " textarea:visible," +
        //    formSelector + " button.selectpicker[type='button']:visible," +
        //    formSelector + " select:visible";
        var binders = "input[type='text']:visible," +
                     "input[type='password']:visible," +
                     "input[type='numeric']:visible," +
                     "input[type='email']:visible," +
                    //formSelector + " textarea:visible," +
                     "button.selectpicker[type='button']:visible," +
                     "select:visible";
        $form.on("keypress", binders, function (e) {
            // var codeAbove = d.keyCode || d.which;
            // console.log("above code :" + codeAbove);
            var code = e.keyCode || e.which;
            // console.log("inside code :" + code);
            if (code === 13) { // Enter key
                e.preventDefault(); // Skip default behavior of the enter key
                var n = $(binders).length;
                var nextIndex = $(binders).index(this) + 1;
                if (nextIndex < n) {
                    $(binders)[nextIndex].focus();
                } else {
                    $(binders)[nextIndex - 1].blur();
                    if (submitAtLast === true) {
                        $(formSelector).submit();
                    }
                }
            }
        });
    },

    validateTextInputBasedOnRegEx: function (jQuerySelectorforTextBox, stringRegEx, msgOnInvalidPattern) {
        /// <summary>
        ///     Validate text input while typing with ASP.NET jquery validation.
        ///     Only the attributes with the text. No event is bound.
        /// </summary>
        /// <param name="jQuerySelectorforTextBox">string:jQuery Selector</param>
        /// <param name="stringRegEx">string: Regular expression to validate the textinput</param>
        $(jQuerySelectorforTextBox).attr("data-val-regex-pattern", stringRegEx);
        if (!_.isEmpty(msgOnInvalidPattern)) {
            $(jQuerySelectorforTextBox).attr("data-val-regex", msgOnInvalidPattern);
        }

    },

    reSetupjQueryValidate: function (jQueryFormSelector) {
        /// <summary>
        ///     call after setting new reg ex via validateTextInputBasedOnRegEx
        /// </summary>
        /// <param name="jQueryFormSelector"></param>
        var $form = $(jQueryFormSelector)
            .removeData("validator") /* added by the raw jquery.validate plugin */
            .removeData("unobtrusiveValidation");
        /* added by the jquery unobtrusive plugin */
        $.validator.unobtrusive.parse($form);
    },

    validateTextInputsBasedOnHiddenSpansGiven: function (formSelector) {
        /// <summary>
        ///     inComplete
        ///     There should be span for each of inputs that needs to be modified or changed.
        ///     hidden span with data-name="same as input"
        ///     data-display, data-reg, data-reg-fail-msg, data-min,data-max,data-range-failed-msg
        ///     data-placeholder, data-class
        /// </summary>
        /// <param name="formSelector">jQuery form selector</param>
        var $form = $(formSelector);
        var dataRegSpanAttr = "data-reg";
        var dataRegMsgSpanAttr = "data-reg-fail-msg";
        var dataMinSpanAttr = "data-min";
        var dataMaxSpanAttr = "data-max";
        var dataRangeMsgSpanAttr = "data-min";
        var dataDisplaySpanAttr = "data-range-failed-msg";
        var dataMinSpanAttr = "data-min";

        if ($form.length > 0) {
            var binders = "input[type='text']," +
                "input[type='password']," +
                "input[type='email']," +
                "input[type='numeric']," +
                "select:visible";
            var $inputs = $form.find(binders);
            for (var i = 0; i < $inputs.length; i++) {
                var $input = $($inputs[i]);
                var $nameOftheInput = $input.attr("name");
                // now find the span based on the name
                var $span = $form.find("span[data-name='" + $nameOftheInput + "']:hidden");
                if ($span.length > 0) {
                    // set the attr to the input.

                    // setting reg ex

                }
            }
        }
    },

    validateInputFromServer: function (jQuerytextBoxSelector, validationUrl, internalValidatorSpanClassName, isAlwaysFocusUntilValid, isDisable, minChars, isSubmitTheWholeForm, onInvalidStringStatementInCrossMark, onValidStringStatementInCheckMark, $formGiven, maxTryLimit) {
        /// <summary>
        ///     Made validation easy on the fly with a server response.
        /// </summary>
        /// <param name="jQuerytextBoxSelector">string: jQuery Selector</param>
        /// <param name="validationURL">string: Url to validate</param>
        /// <param name="internalValidatorSpanClassName">Propertyname (refer to the class of validation span) Indicating class.</param>
        /// <param name="isAlwaysFocusUntilValid">Boolean: Keep the focus until it's valid. By default: false</param>
        /// <param name="isDisable">Boolean: Disable the textbox after being validated. By default : false.</param>
        /// <param name="minChars">number: min chars to send the request</param>
        /// <param name="isSubmitTheWholeForm">Boolean:Rather than submitting the small form submit the whole related closet form.</param>
        /// <param name="onInvalidStringStatementInCrossMark">invalid statement show on the cross mark.</param>
        /// <param name="onValidStringStatementInCheckMark">
        ///     valid statement show on the check mark. By default: fieldDisplayname +
        ///     is available and valid
        /// </param>
        //if (_.isEmpty(isSubmitTheWholeForm)) {
        //    isSubmitTheWholeForm = false;
        //}

        //if (_.isEmpty(isAlwaysFocusUntilValid)) {
        //    isAlwaysFocusUntilValid = false;
        //}

        //if (_.isEmpty(isDisable)) {
        //    isDisable = false;
        //}

        var sentRequestCount = 0;
        var $userTextbox = $(jQuerytextBoxSelector);
        if ($userTextbox.length > 0) {
            $userTextbox.removeAttr("isDisable");

            if (!isSubmitTheWholeForm) {
                $userTextbox.keyup(function () {
                    $.queryAll("#validation #id").val($userTextbox.val());
                    // console.log(user);
                }).focus(function () {
                    $.queryAll("#validation #id").val($userTextbox.val());
                    // console.log(user);
                });
            }

            $userTextbox.blur(function () {
                if (!isSubmitTheWholeForm) {
                    $.queryAll("#validation #id").val($userTextbox.val());
                }
                var $passingText = $userTextbox.val();
                if (_.isEmpty($passingText) || $passingText.length < minChars) {
                    // if empty text then don't send.
                    return;
                }
                if (_.isEmpty(onValidStringStatementInCheckMark)) {
                    onValidStringStatementInCheckMark = "is available and valid.";
                }
                if (_.isEmpty(onInvalidStringStatementInCrossMark)) {
                    onInvalidStringStatementInCrossMark = "is not valid or already exist. Your input can't contain ( [ ] ' , * & ? \" ) or space or any other special character for this data-type.";
                }

                // Validation should be a formData underlying the original from with 
                // only antiforgery token and a hidden id field
                // whatever is typed in that selected text box will be pushed into
                // this formData
                var formData;
                if ($formGiven === null || $formGiven === undefined || $formGiven.length == 0) {
                    if (!isSubmitTheWholeForm) {
                        formData = $.byId("validation").serialize();
                    } else {
                        formData = $userTextbox.closest("form").serializeArray();
                    }
                } else {
                    formData = $formGiven.serializeArray();
                }

                //console.log(formData);

                var validatorName = "span.CustomValidation." + internalValidatorSpanClassName;
                var token = $("input[name=__RequestVerificationToken]").val();
                var processingState1 = "glyphicon-refresh";
                var processingState2 = "glyphicon-spin";
                var isHideClass = "hide";
                var colorGreen = "green";
                var colorRed = "red";
                var correctState = "glyphicon-ok";
                var incorrectState = "glyphicon-remove";
                var $validatorBox = $(validatorName);
                var displayName = $validatorBox.attr("data-display");
                var correctStateTitle = displayName + " " + onValidStringStatementInCheckMark;
                var invalidAttrName = "data-invalid";
                var incorrectStateTitle = displayName + " " + onInvalidStringStatementInCrossMark;
                var tooltipName = "a.CustomValidation." + internalValidatorSpanClassName + ".tooltip-show";
                var $tooltipBox = $(tooltipName);

                // console.log($("#validation #id").val());
                $validatorBox.removeClass(incorrectState).removeClass(correctState);


                // if no processing state then add it
                if (!$validatorBox.hasClass(processingState1)) {
                    $validatorBox.addClass(processingState1);
                }

                if (!$validatorBox.hasClass(processingState2)) {
                    $validatorBox.addClass(processingState2);
                }
                if ($validatorBox.hasClass(isHideClass)) {
                    $validatorBox.removeClass(isHideClass);
                }
                $tooltipBox.attr("data-original-title", "Validating " + displayName)
                    .attr("title", "Validating " + displayName);
                // confirming processing state.
                if (maxTryLimit !== null && maxTryLimit !== undefined && sentRequestCount > maxTryLimit) {
                    return;
                }
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: validationUrl,
                    data: formData,
                    success: function (response) {
                        sentRequestCount = sentRequestCount + 1;
                        // Remove the processing state
                        if ($validatorBox.hasClass(processingState1)) {
                            $validatorBox.removeClass(processingState1);
                        }

                        if ($validatorBox.hasClass(processingState2)) {
                            $validatorBox.removeClass(processingState2);
                        }
                        if ($validatorBox.hasClass(isHideClass)) {
                            $validatorBox.removeClass(isHideClass);
                        }
                        // Remove the processing state
                        if (response == true) {
                            if ($validatorBox.hasClass(incorrectState)) {
                                $validatorBox.removeClass(incorrectState);
                            }
                            if ($validatorBox.hasClass(colorRed)) {
                                $validatorBox.removeClass(colorRed);
                            }
                            $validatorBox.addClass(colorGreen)
                                .addClass(correctState)
                                .attr("title", correctStateTitle);

                            $tooltipBox.attr("title", correctStateTitle)
                                .attr("data-original-title", correctStateTitle);
                            if (isDisable) {
                                $userTextbox.prop("isDisable", true);
                            }

                            $userTextbox.addClass("bold")
                                .addClass("green")
                                .next()
                                .focus();

                            $userTextbox.removeAttr(invalidAttrName);
                        } else {
                            if ($validatorBox.hasClass(colorGreen)) {
                                $validatorBox.removeClass(colorGreen);
                            }
                            if ($validatorBox.hasClass(correctState)) {
                                $validatorBox.removeClass(correctState);
                            }
                            $userTextbox.prop("isDisable", false)
                                .addClass("bold")
                                .addClass("red");

                            $validatorBox.addClass(colorRed)
                                .addClass(incorrectState)
                                .attr("title", incorrectStateTitle);

                            $tooltipBox.attr("title", incorrectStateTitle)
                                .attr("data-original-title", incorrectStateTitle);
                            if (isAlwaysFocusUntilValid === true) {
                                $userTextbox.focus();
                            }
                            $userTextbox.attr(invalidAttrName, "true");
                        }
                        $(".tooltip-show").tooltip();

                    },
                    error: function (xhr, status, error) {
                        // Remove the processing state
                        if ($validatorBox.hasClass(processingState1)) {
                            $validatorBox.removeClass(processingState1);
                        }

                        if ($validatorBox.hasClass(processingState2)) {
                            $validatorBox.removeClass(processingState2);
                        }
                        if ($validatorBox.hasClass(isHideClass)) {
                            $validatorBox.removeClass(isHideClass);
                        }
                        // Remove the processing state
                        if ($validatorBox.hasClass(correctState)) {
                            $validatorBox.removeClass(correctState);
                        }

                        if ($validatorBox.hasClass(colorGreen)) {
                            $validatorBox.removeClass(colorGreen);
                        }
                        $userTextbox.prop("isDisable", false)
                            .addClass("bold")
                            .addClass("red");

                        $validatorBox.addClass(colorRed)
                            .addClass(incorrectState)
                            .attr("title", error);

                        $tooltipBox.attr("title", status)
                            .attr("data-original-title", error);

                        $(".tooltip-show").tooltip();
                        $userTextbox.attr(invalidAttrName, "true");
                    }
                }); // ajax end
            });
        }; // if else end
    },


    fillRegisterFieldsOnDemo: function () {
        var i = 0;
        var controls = $(".form-group");
        var $fields = controls.find("input[type=text]");
        $.each($fields, function () {
            this.value = 1111111111111;
        });

        $fields = controls.find("input[type=password]");
        $.each($fields, function () {
            this.value = "asdf1234@";
        });


        $fields = controls.find("input[type=number]");
        $.each($fields, function () {
            this.value = i++;
        });

        $fields = controls.find("textarea");
        $.each($fields, function () {
            this.value = "1111111111111";
        });

        $fields = controls.find("input[type=email]");
        $.each($fields, function () {
            this.value = "auk.junk@live.com";
        });

        $fields = controls.find("input[type=checkbox]");
        $.each($fields, function () {
            this.prop("checked", true);
        });

    },
    //'.make-it-tab'
    bootstrapTabsMordernize: function (tabSelector) {
        var bootstrapTabs = $(tabSelector);
        if (bootstrapTabs.length > 0) {
            var tabHidden = $(".tab-content input[type='hidden'][name='tab']");

            if (tabHidden.length > 0) {
                var tabHiddenValue = tabHidden.val();
                if (!_.isEmpty(tabHiddenValue)) {
                    //tab name exist
                    bootstrapTabs.find("li>a[href='" + tabHiddenValue + "']").tab("show");
                } else {
                    //no tab name exist.. select default one.
                    bootstrapTabs.find("li > a:first").tab("show");
                }
            }

            bootstrapTabs.click(function (e) {
                //e.preventDefault();                    
                e.preventDefault();
                $(this).tab("show");

            });

            $("ul" + tabSelector + ".nav-tabs > li > a").on("shown.bs.tab", function (e) {
                var valueOfActive = $(e.target).attr("href");
                // = $(tabSelector + " li.active>a").attr('href');
                tabHidden.val(valueOfActive);
                //window.location.hash = id;
            });
        }
    },
    ratingMordernize: function () {
        var ratingItems = $(".rating-5");

        if (ratingItems.length > 0) {
            ratingItems.rating({
                showClear: false
            });
        }
        ratingItems = $(".rating-10");

        if (ratingItems.length > 0) {
            ratingItems.rating({
                showClear: false,
                starCaptionClasses: {
                    0.5: "label label-danger",
                    1: "label label-danger",
                    1.5: "label label-danger",
                    2: "label label-danger",
                    2.5: "label label-danger",
                    2: "label label-warning",
                    2.5: "label label-warning",
                    3: "label label-warning",
                    3.5: "label label-warning",
                    4: "label label-warning",
                    4.5: "label label-warning",
                    5: "label label-warning",
                    5.5: "label label-info",
                    6: "label label-info",
                    6.5: "label label-info",
                    7: "label label-info",
                    7.5: "label label-primary",
                    8: "label label-primary",
                    8.5: "label label-success",
                    9: "label label-success",
                    9.5: "label label-success",
                    10: "label label-success"
                }
            });
        }
    },

    uxFriendlySlide: function (jQueryformSelector, keepOthersVisible, dontSubmit) {
        /// <summary>
        ///     hides except for the first div with value 0. Add attributes to divs
        ///     [data-dev-slide='number-zero-based'][data-dev-visited='false'] and
        ///     encapsulate inputs. Each click clicked on submit it will verify the inputs if verified next hide ones will be shown
        ///     it will be continuous process until hit the last.
        ///     Always use lower case false
        ///     [data-dev-slide='number-zero-based'][data-dev-visited='false']
        /// </summary>
        /// <param name="jQueryformSelector">jQuery selector for the form</param>
        /// <param name="keepOthersVisible">Should add new hide ones or previous ones hides and load new ones(divs)</param>
        /// <param name="dontSubmit">When none left , do we submit? True: don't submit</param>
        var slideObjects = $(jQueryformSelector + " [data-dev-slide][data-dev-visited='false']");
        var executedOnce = false;
        var binders = "input[type='text']:visible," +
            "input[type='password']:visible," +
            "input[type='email']:visible," +
            "input[type='numeric']:visible," +
            "select:visible";
        var order = 0;
        var totalSliderLength = slideObjects.length;
        var previousSlideNumber = 0;
        if (totalSliderLength > 0) {
            // exist slides.
            slideObjects.hide();
            previousSlideNumber = order;
            slideObjects.filter("[data-dev-slide='" + (order++) + "'][data-dev-visited='false']").show();
            $(jQueryformSelector).submit(function (e) {
                e.preventDefault();

                var nextOne = slideObjects.filter("[data-dev-slide='" + order + "'][data-dev-visited='false']");
                // if (nextOne.length == 0) {
                //    for (order += 1; nextOne.length == 0 && totalSliderLength >= order; order++) {
                //        nextOne = slideObjects.filter("[data-dev-slide='" + order + "'][data-dev-visited='false']");
                //    }
                // }
                var previousOne;
                var inputBoxes;
                if (nextOne.length > 0) {
                    previousOne = slideObjects.filter("[data-dev-slide='" + (order - 1) + "']"); // console.log(previousOne);
                    inputBoxes = previousOne.find("input, textarea"); // still exist , prevent submission
                    if (inputBoxes.length > 0 && $.devOrg.checkValidInputs(inputBoxes)) {
                        if (!keepOthersVisible) {
                            previousOne.hide("slow");
                        }
                        //console.log(inputBoxes);
                        //console.log(binders);
                        if (!nextOne.prop("data-dev-visited")) {
                            nextOne.attr("data-dev-visited", "true");
                            nextOne.show("slow");
                            //console.log(nextOne);
                            order++;
                        }
                    } else {
                        //console.log("no inboxes");
                    }

                } else {
                    // nothing left.
                    // sttil check the validation.
                    previousOne = slideObjects.filter("[data-dev-slide='" + (order - 1) + "']"); // console.log(previousOne);
                    inputBoxes = previousOne.find("input");
                    if (inputBoxes.length > 0 && $.devOrg.checkValidInputs(inputBoxes)) {
                        if (!dontSubmit) {
                            this.submit();
                        }
                    }
                }


            });

            // var notVisited = slideObjects.filter("[data-dev-visited='false']");
        }
    },
    // Send inputs array, if any of those false , returns false.
    checkValidInputs: function (jBinders) {
        var $currentInput = null;
        var length = jBinders.length;
        var label = "<label class='label label-danger small-font-size'>Please rate first.</label>";
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                $currentInput = $(jBinders[i]);

                if ($currentInput.hasClass("common-rating")) {
                    var $ratingContainer = $currentInput.closest("div.rating-container");
                    var $wholeContainer = $ratingContainer.closest("div.star-rating");

                    if ($currentInput.val() === "0") {
                        $ratingContainer.css({
                            'text-shadow': "2px 2px red"
                        });
                        if (!$wholeContainer.attr("data-warned")) {
                            $wholeContainer.append(label);
                            $wholeContainer.attr("data-warned", "true");
                        }
                        return false;
                    } else {
                        $ratingContainer.css({
                            'text-shadow': "none"
                        });

                        if ($wholeContainer.attr("data-warned")) {
                            $wholeContainer.find("label").remove();
                            $wholeContainer.attr("data-warned", "false");
                        }
                    }
                }
                if (!$currentInput.valid()) {
                    return false;
                }
            }
        }
        return true;
    }
};

///#source 1 1 /Content/Scripts/FrontEnd/front-developer.js
/// <reference path="../validation.js" />
/// <reference path="../bootstrap-datetimepicker.js" />
/// <reference path="../bootstrap-select.js" />
/// <reference path="../bootstrap-table-export.js" />
/// <reference path="../bootstrap-table-filter.js" />
/// <reference path="../bootstrap-table.js" />
/// <reference path="../bootstrap.js" />
/// <reference path="../jquery-2.1.3.js" />
/// <reference path="../jquery-ui.min.js" />
/// <reference path="../jquery.elastic.source.js" />
/// <reference path="../jquery.unobtrusive-ajax.js" />
/// <reference path="../jquery.validate-vsdoc.js" />
/// <reference path="../jquery.validate.js" />
/// <reference path="../jquery.validate.unobtrusive.js" />
/// <reference path="../modernizr-2.8.3.js" />
/// <reference path="../moment.js" />
/// <reference path="../npm.js" />
/// <reference path="../star-rating.js" />
/// <reference path="../underscore.js" />
/// <reference path="jquery.isotope.min.js" />
/// <reference path="front-developer.js" />
/// <reference path="wow.min.js" />

$.frontEndApp = {
    transactionStatushdie : function () {
        var $transactionStatus = $.queryAll(".transaction-status");
        if ($transactionStatus.length > 0) {
            $transactionStatus.delay(1500).fadeOut(2500);
        }
    },
    execute: function () {
        var wow = new WOW({
            boxClass: 'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 100,          // distance to the element when triggering the animation (default is 0)
            mobile: false        // trigger animations on mobile devices (true is default)
        });
        wow.init();

        var $frontPageRatings = $.queryAll(".rating-5-front");
        if ($frontPageRatings.length > 0) {
            $frontPageRatings.rating({
                showClear: false,
                showCaption: false
            });
        }

        var $detailPageRatingDisplayItems = $.queryAll(".rating-5-page-details");
        if ($detailPageRatingDisplayItems.length > 0) {
            $detailPageRatingDisplayItems.rating({
                showClear: false,
                showCaption: true,
                starCaptions: {
                    0: "0",
                    0.5: "0.5",
                    1: "1",
                    1.5: "1.5",
                    2: "2",
                    2.5: "2.5",
                    3: "3",
                    3.5: "3.5",
                    4: "4",
                    4.5: "4.5",
                    5: "5"
                },
                starCaptionClasses: {
                    0: 'label label-danger',
                    0.5: 'label label-danger',
                    1: 'label label-danger',
                    1.5: 'label label-warning',
                    2: 'label label-warning',
                    2.5: 'label label-info',
                    3: 'label label-info',
                    3.5: 'label label-primary',
                    4: 'label label-primary',
                    4.5: 'label label-success',
                    5: 'label label-success'
                }
            });
        }


        ////filtering through isotop
        //var $isotopContainer = $("ul.search-page-apps-list:first");
        //if ($isotopContainer.length > 0) {
        //    var $filterIsotopItems = $.queryAll('.filter li a');
        //    if ($filterIsotopItems.length > 0) {
        //        $filterIsotopItems.click(function () {
        //            $('.filter li a').removeClass('active');
        //            $(this).addClass('active');
        //            var selector = $(this).attr('data-filter');

        //            $isotopContainer.isotope({
        //                filter: selector
        //            });
        //            return false;
        //        });
        //    }
        //}
        //var $numberElement = $.queryAll(".app-viewed-numbers:first-child");
        //if ($numberElement.length > 0) {
        //    $numberElement.number(true);
        //}

        //this.$showMoreBtns.click(function () {
        //    var $this = $(this);
        //    var moreReference = $this.attr("data-ref");
        //    var dataId = $this.attr("data-id");
        //    var dataRefSelector;
        //    var dataIdSelector = _.isUndefined(dataId) === false ? "[data-id='" + dataId + "']" : "";
        //    if (_.isUndefined(moreReference) === false) {
        //        dataRefSelector = "[data-ref='" + moreReference + "']" + dataIdSelector + ":first";

        //        var $specificMoreExcertFound = $.frontEndAppDetailsPage.$moreExcert.filter(dataRefSelector);
        //        if ($specificMoreExcertFound.length > 0) {
        //            $specificMoreExcertFound.show("slow");
        //            $specificMoreExcertFound.css("display", "inline");
        //        }
        //        var $moreBtnContainer = $.frontEndAppDetailsPage.$showMoreBtnContainer.filter(dataRefSelector);
        //        if ($moreBtnContainer.length > 0) {
        //            $moreBtnContainer.hide("slow");
        //        }
        //    }
        //});

        //this.$showLessBtns.click(function () {
        //    var $this = $(this);
        //    var moreReference = $this.attr("data-ref");
        //    var dataId = $this.attr("data-id");
        //    var dataRefSelector;
        //    var dataIdSelector = _.isUndefined(dataId) === false ? "[data-id='" + dataId + "']" : "";
        //    if (_.isUndefined(moreReference) === false) {
        //        dataRefSelector = "[data-ref='" + moreReference + "']" + dataIdSelector + ":first";

        //        var $specificMoreExcertFound = $.frontEndAppDetailsPage.$moreExcert.filter(dataRefSelector);
        //        if ($specificMoreExcertFound.length > 0) {
        //            $specificMoreExcertFound.hide("slow");
        //        }
        //        var $moreBtnContainer = $.frontEndAppDetailsPage.$showMoreBtnContainer.filter(dataRefSelector);
        //        if ($moreBtnContainer.length > 0) {
        //            $moreBtnContainer.show("slow");
        //        }
        //    }
        //});

        var $tooltipItems = $.queryAll('.tooltip-show');
        if ($tooltipItems.length > 0) {
            $tooltipItems.tooltip();
        }
        var $seoHideItems = $.queryAll(".seo-hide");
        if ($seoHideItems.length > 0) {
            $seoHideItems.hide();
        }
        $.frontEndApp.transactionStatushdie();
    }
};

$(function () {
    $.frontEndApp.execute();
});

