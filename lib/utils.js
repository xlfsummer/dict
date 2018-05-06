let process = require('process');
let readline = require('readline');
let crypto = require('crypto');

module.exports = {
    md5(str){
        return crypto.createHash('md5').update(str).digest('hex');
    }
}