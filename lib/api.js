/** 用于 api 的交互 */
let utils = require('./utils');
let https = require('https');
let { promisify } = require('util');
let queryString = require("querystring");
let Config = require("./Config");

const api = module.exports = {
    /**
     * @param {object} option 选项
     * @param {string} option.q 要翻译的文本 UTF-8编码
     * @param {string} option.from 源语言
     * @param {string} option.to 目标语言
     * @param {string} option.appKey 应用 ID
     * @param {string} option.salt 随机数
     * @param {string} option.sign 通过md5(appKey+q+salt+应用密钥)生成
     * @returns {Translation}
     */
    async translate(option = {}) {

        let config = await Config.get();

        option = {
            q: "你好",
            from: "auto",
            to: "auto",
            appKey: config.appKey,
            ...option
        }



        let { q, appKey } = option;
        let salt = Date.now();
        let appSecret = config.appSecret;

        option.salt = salt;
        option.sign = utils.md5(appKey + q + salt + appSecret);

        return api.get("https://openapi.youdao.com/api", option);
    },

    /**
     * @param {string} url
     * @param {Object<string, string>} [search]
     * @returns {Promise<string>}
     */
    get(url, search) {
        return new Promise((resolve, reject) => {

            if (search) {
                for ([k, v] of Object.entries(search))
                    search[k] = encodeURIComponent(v);

                url += '?' + queryString.stringify(search);
            }

            https.get(url, stream => {

                let result = "";

                stream.on('data', d => result += d);

                stream.on('error', e => reject(e));

                stream.on('end', () => resolve(JSON.parse(result)));

            });
        });
    }
};