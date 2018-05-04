const CONFIG_FILE_NAME = "cli-dict.config.json";

let fs = require('fs');
let path = require('path');
let utils = require('./utils');


/** @example 'C:\\Users\\username\\AppData\\Roaming' */
const CONFIG_PATH = path.resolve(process.env.APPDATA, CONFIG_FILE_NAME);

/** @type {Config} */
let configCache = null;

/** 用于对配置文件的操作 */
const configManager = module.exports = {

    async checkConfig() {
        let isExist = fs.existsSync(CONFIG_PATH);

        if (!isExist) await this.writeConfig(CONFIG_PATH);
    },

    async getConfig() {

        if(!configCache)
            configCache = await configManager.readConfig();

        return configCache;
    },

    /**
     * @returns {Promise<Config>}
     */
    async readConfig() {
        await configManager.checkConfig();

        let content = fs.readFileSync(CONFIG_PATH, "utf8");

        let config;

        try {

            config = JSON.parse(content);

            if (!["appSecret", "appKey"].every(k => k in config)) {
                throw new Error("config not valid, delete and retry");
            }

            return config;

        } catch (e) {

            console.log("config not valid, delete and retry")

            fs.unlinkSync(CONFIG_PATH);

            return await configManager.getConfig();
        }
    },

    async writeConfig(){

        const obj = {
            appSecret: "794R5bA6OGdig5N1cFm5IF4R9qRaYDjs",
            appKey: "488cd28f1749c93e",
        }

        fs.writeFileSync(CONFIG_PATH, JSON.stringify(obj));
    },
}