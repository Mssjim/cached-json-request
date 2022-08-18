<div align="center">
    <h1>Cached JSON Request (cjr)</h1>
    <p>
        Node.js module to perform requests and caching in json files for the next request.
    </p>
    <p>
        <a href="https://www.npmjs.com/package/cjr"><img src="https://img.shields.io/npm/v/cjr.svg?maxAge=3600" alt="NPM version" /></a>
        <a href="https://www.npmjs.com/package/cjr"><img src="https://img.shields.io/npm/dt/cjr.svg?maxAge=3600" alt="NPM downloads" /></a>
        <a href="https://github.com/Mssjim/cached-json-request"><img src="https://badge.fury.io/gh/Mssjim%2Fcached-json-request.svg" alt="GitHub Version" /></a>
        <a href="https://github.com/Mssjim/cached-json-request/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Mssjim/cached-json-request.svg" alt="GitHub Version" /></a>
    </p>
</div>

## Installation
```bash
npm i cjr
```

## How to use
```js
const cjr = require('cjr');

cjr.fetch('http://echo.jsontest.com/user/JappaBR')
    .then(res => console.log(res))
    .catch(console.error);

// { user: 'JappaBR' }
```

> In the next requests, the server will not be requested, it will return the value stored in json.

```js
// Request response time comparison
const cjr = require('./main.js');
const options = { isCached: true };

async function run(counter) {
    console.time(counter);
    const res = await cjr.fetch('http://echo.jsontest.com/user/JappaBR', options);
    console.timeEnd(counter);
    console.log(res);
};

(async() => {
    for(let i=0; i<3; i++) await run(i)
})();

// 0: 424ms
// { cached: false, data: { user: 'JappaBR' } }
// 1: 0.82ms
// { cached: true, data: { user: 'JappaBR' } }
// 2: 0.79ms
// { cached: true, data: { user: 'JappaBR' } }
```

## Options
**`isCached(boolean)` [`false`]** - If true, will return along with the response whether the value from cache or not.  
**`timeout(number)` [`30`]** - The timeout (in seconds) to ignore cache and fetch again.  
dir`` - The channel id where you write messages to.  
**`dir(string)` [`./cache`]**` - Folder path where json files will be stored. The default value is on 'cache' folder in module root.  

## Contributing - bug fixes
Contributions are welcome! Please feel free to open an issue or submit a pull request, for bug fixes or new features.

1. Fork the repository
2. Create a new branch `git checkout -b <new-feature-name>`
3. Make the changes
4. Commit the changes `git commit -am "Add new feature"`
5. Push the changes `git push origin <new-feature-name>`
6. Create a pull request on GitHub

Many thanks!
