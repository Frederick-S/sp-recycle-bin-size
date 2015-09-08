var each = require('sp-each');

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