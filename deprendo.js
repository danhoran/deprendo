// Deprendo.js 0.0.1
// github.com/danhoran
// (c) 2013 Daniel Horan

(function() {

    var deprendo = {}

    // Creates and manipulates a DOM element as #deprendo
    var create = function() {
        var body = document.getElementsByTagName('body'),
            element = document.createElement('div'),
            css = element.style;
        element.setAttribute('id', 'deprendo');
        css.position = 'absolute';
        css.bottom = 0;
        css.left = 0;
        css.right = 0;
        css.top = 0;
        body[0].appendChild(element);
        return element;
    }

    // Returns actual window width using a temporary
    // element. Element is destroyed after width is set.
    var getWidth = function() {
        var element,
            width;
        if (document.getElementById('deprendo') === null) {
            element = create();
        } else {
            element = document.getElementById('deprendo');
        }
        width = element.clientWidth;
        return width;
    }

    // Queries applied styles and returns ratio value
    var getRatio = function() {
        var head = document.getElementsByTagName('head'),
            element = document.getElementById('deprendo'),
            query = '@media only screen{#deprendo{top:1px;}}@media only screen and -webkit-min-device-pixel-ratio 2,only screen and min--moz-device-pixel-ratio 2,only screen and -o-min-device-pixel-ratio 21,only screen and min-device-pixel-ratio 2,only screen and min-resolution 192dpi,only screen and min-resolution 2dppx{#deprendo{top:1px;}}'
            style = document.createElement('style');

        style.type = 'text/css'

        if (style.styleSheet) {
            style.styleSheet.cssText = query;
        } else {
            style.appendChild(document.createTextNode(query));
        }

        head[0].appendChild(style);

        return element.style.top;
    }

    // Returns estimated device type based on predetermined threshold
    deprendo.device = function() {
        var width = getWidth(),
            ua = window.navigator.userAgent,
            support = ua.indexOf('Android') && ua.indexOf('Opera') || a.indexOf('Android') && ua.indexOf('Firefox') ? false : true;

        if (support === false) {
            var ratio = getRatio();
            width = Math.floor(width * ratio);
        }
        
        if (width <= 480) {
            return 'mobile';
        } else if (width >= 1024) {
            return 'desktop';
        } else {
            return 'tablet';
        }

        // Removes temporary element from DOM
        element.parentNode.removeChild(element);
    }

    // Exports Deprendo object, support for require()
    // and adds Deprendo object to window if in browser
    if (typeof exports !== 'undefined') {
        if (typeof exports !== 'undefined' && module.exports) {
            exports = module.exports = deprendo;
        }
        exports.deprendo = deprendo;
    } else {
        this.deprendo = deprendo;
    }

    deprendo.version = '0.0.1';

}).call(this);