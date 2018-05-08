let process = require('process');
let crypto = require('crypto');

module.exports = class Utils{

    static md5(str){
        return crypto.createHash('md5').update(str).digest('hex');
    }

    /**
     * @param {{[key:string]: any}} obj
     * @param {string[]} keys
     * @returns {}
     */
    static pick(obj, ...keys) {
        let result = {};
        for (let key in obj)
            if (keys.includes(key))
                result[key] = obj[key];
        return result;
    }
}