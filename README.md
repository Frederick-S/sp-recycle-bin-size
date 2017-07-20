# sp-recycle-bin-size

[![Greenkeeper badge](https://badges.greenkeeper.io/Frederick-S/sp-recycle-bin-size.svg)](https://greenkeeper.io/)
Get recycle bin size in SharePoint.

## Installation
```
npm install sp-recycle-bin-size --save
```

## Usage
```js
var recycleBinSize = require('sp-recycle-bin-size');

// recycleBinSize(webUrl, crossSite, done, error)
recycleBinSize('web url', true, function (size) {
    // Do something
}, function (sender, args) {
    // Error
});
```

## License
MIT.
