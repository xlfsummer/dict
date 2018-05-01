/** 用于 api 的交互 */
let utils = require('./utils');
let https = require('https');
let { promisify } = require('util');
let queryString = require("querystring");

module.exports = {
    search(text) {
        return this.send({ q: text });
    },

    /**
     * 
     * @param {object} option 选项
     * @param {string} option.q 要翻译的文本 UTF-8编码
     * @param {string} option.from 源语言
     * @param {string} option.to 目标语言
     * @param {string} option.appKey 应用 ID
     * @param {string} option.salt 随机数
     * @param {string} option.sign 通过md5(appKey+q+salt+应用密钥)生成
     */
    send(option = {}) {
        
        option = {
            q: "你好", 
            from: "auto",
            to: "auto",
            appKey: "488cd28f1749c93e",
            ...option
        }

        let { q, appKey } = option;

        let salt = Date.now();

        option.salt = salt;

        let appSecret = "794R5bA6OGdig5N1cFm5IF4R9qRaYDjs";

        option.sign = utils.md5(appKey + q + salt + appSecret);
        
        for ([k, v] of Object.entries(option)) option[k] = encodeURIComponent(v);

        let query = queryString.stringify(option);

        let url = "https://openapi.youdao.com/api?" + query;

        console.log(url);
    
        return this.get(url);
    },

    /**
     * @param {string} url 
     * @returns {Promise<string>}
     */
    get(url) {
        return new Promise((resolve, reject) => {
            https.get(url, stream => {

                let result = "";

                stream.on('data', d => result += d);

                stream.on('error', e => reject(e));

                stream.on('end', () => resolve(result));
            });
        });
    }
};