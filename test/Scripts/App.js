/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var recycleBinSize = __webpack_require__(1);

	var getQueryStringParameter = function (param) {
	    var params = document.URL.split("?")[1].split("&");
	    var strParams = "";

	    for (var i = 0; i < params.length; i = i + 1) {
	        var singleParam = params[i].split("=");

	        if (singleParam[0] == param) {
	            return decodeURIComponent(singleParam[1]);
	        }
	    }
	};

	var hostWebUrl = getQueryStringParameter('SPHostUrl');

	recycleBinSize(hostWebUrl, true, function (size) {
	    $('#message').html('The host web recycle bin size is ' + size + ' bytes.');
	}, function (sender, args) {
	    $('#message').text(args.get_message());
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var each = __webpack_require__(2);

	function recycleBinSize(webUrl, crossSite, done, error) {
	    var web = null;
	    var appContextSite = null;
	    var clientContext = null;

	    if (crossSite) {
	        clientContext = SP.ClientContext.get_current();
	        appContextSite = new SP.AppContextSite(clientContext, webUrl);
	        web = appContextSite.get_web();
	    } else {
	        clientContext = new SP.ClientContext(webUrl);
	        web = clientContext.get_web();
	    }

	    var recycleBinItemCollection = web.get_recycleBin();

	    clientContext.load(recycleBinItemCollection);
	    clientContext.executeQueryAsync(function () {
	        var size = 0;

	        each(recycleBinItemCollection, function (item) {
	            size += item.get_size();
	        });

	        done(size);
	    }, error);
	}

	module.exports = recycleBinSize;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var spEach = function (collection, iteratee, context) {
	    if (typeof collection.getEnumerator === 'function') {
	        var index = 0;
	        var current = null;
	        var enumerator = collection.getEnumerator();

	        while (enumerator.moveNext()) {
	            current = enumerator.get_current();

	            iteratee.call(context, current, index, collection);

	            index++;
	        }
	    }
	};

	module.exports = spEach;


/***/ }
/******/ ]);