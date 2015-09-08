var recycleBinSize = require('sp-recycle-bin-size');

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