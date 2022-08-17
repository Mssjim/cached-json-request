const request = require('request');
const fs = require('fs');

let _options;

const defaultOptions = {
    timeout: 30,
    isCached: false,
    dir: './cache'
};

function genId(url) {
    return btoa(url).replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
}

async function getCache(id) {
    fs.existsSync(_options.dir) || fs.mkdirSync(_options.dir);
    const index = fs.readdirSync(_options.dir).findIndex(file => file == id + '.json');
    let data;

    if(index > -1) {
        const file = fs.readFileSync(_options.dir + '/' + id + '.json');
        data = JSON.parse(file);
    }

    if(data?.time + _options.timeout * 1000 > Date.now())
        return data.data;
    else
        return;
}

async function updateCache(id, data) {
    data = {
        time: Date.now(),
        data: data
    }

    fs.existsSync(_options.dir) || fs.mkdirSync(_options.dir);
    fs.writeFileSync(_options.dir + '/' + id + '.json', JSON.stringify(data));
}

function fetch (url, options) {
    return new Promise(async(resolve, reject) => {
        _options = Object.assign({}, defaultOptions, options);
        const id = genId(url);
        const cache = await getCache(id);

        if(cache) {
            if(_options.isCached)
                resolve({cached: true, data: cache});
            else
                resolve(cache);
        } else {
            request(url, (err, res, body) => {
                if(err) return reject(err);
                try {
                    const data = JSON.parse(body);

                    updateCache(id, data);

                    if(_options.isCached)
                        resolve({cached: false, data: data});
                    else
                        resolve(data);
                } catch (error) {
                    reject('Invalid JSON response');
                }
            });
        }
    });
}

module.exports = {
    fetch
}