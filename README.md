# sp-recycle-bin-size
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
