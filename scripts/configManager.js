const CONFIG_FILE_NAME = "cli-dict.config.json";

let fs = require('fs');
let path = require('path');
let utils = require('./utils');


/** @example 'C:\\Users\\username\\AppData\\Roaming' */
const CONFIG_PATH = path.resolve(process.env.APPDATA, CONFIG_FILE_NAME);

/** 用于对配置文件的操作 */

module.exports = {
    async getConfig() {
        let isExist = fs.existsSync(CONFIG_PATH);

        if (!isExist) await this.writeConfig(CONFIG_PATH);

        let content = fs.readFileSync(CONFIG_PATH, "utf8");

        let config;

        try {
            return JSON.parse(content);
        } catch (e) {
            /** @type {Error} */(e).message = "parse config file failed"
            fs.unlinkSync(CONFIG_PATH);
            
            return this.getConfig();
        }
    },
    async writeConfig(){
        // let obj = {
        //     apiKey: await utils.readHost("输入有道智云 apikey"),
        //     appID: await utils.readHost("输入有道智云应用ID")
        // };


        const obj = {
            apiKey: "794R5bA6OGdig5N1cFm5IF4R9qRaYDjs",
            appId: "488cd28f1749c93e",
        }

        fs.writeFileSync(CONFIG_PATH, JSON.stringify(obj));
    },
}