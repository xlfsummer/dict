const CONFIG_FILE_NAME = "cli-dict.config.json";

let fs = require('fs');
let path = require('path');
let process = require('process');

let utils = require('./utils');
let Cli = require('./cli');


/** @example 'C:\\Users\\username\\AppData\\Roaming' */
const CONFIG_PATH = path.resolve(process.env.APPDATA, CONFIG_FILE_NAME);

/** @type {IConfig} */
let configCache = null;

/** 用于对配置文件的操作 */
module.exports = class Config {

    static async check() {
        let isExist = fs.existsSync(CONFIG_PATH);

        if (!isExist) await Config.write(CONFIG_PATH);
    }

    static async get() {

        if(!configCache)
            configCache = await Config.read();

        return configCache;
    }

    /**
     * @returns {Promise<Config>}
     */
    static async read() {
        await Config.check();

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

            return await Config.get();
        }
    }

    static async write() {

        console.info('Please complete your configuration first.')

        const obj = {
            // "794R5bA6OGdig5N1cFm5IF4R9qRaYDjs",
            appSecret: await Cli.read("appSecret: "),

            // "488cd28f1749c93e"
            appKey: await Cli.read("appKey: "),
        }

        fs.writeFileSync(CONFIG_PATH, JSON.stringify(obj, null, 4));
    }

    static open() {
        Cli.start(CONFIG_PATH);
        process.exit(0);
    }
}