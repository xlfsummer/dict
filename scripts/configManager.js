const CONFIG_FILE_NAME = "cli-dict.config.json";

let fs = require('fs');
let path = require('path');
let readline = require('readline');


/** @example 'C:\\Users\\username\\AppData\\Roaming' */
const CONFIG_PATH = path.resolve(process.env.APPDATA, CONFIG_FILE_NAME);

/** 用于对配置文件的操作 */

module.exports = {
    getConfig() {
        let isExist = fs.existsSync(CONFIG_PATH);

        if (!isExist) createConfig(configPath);

        let content = fs.readFileSync(CONFIG_PATH, "utf8");

        let config;
        try {
            JSON.parse(content);
        } catch (e) {
            /** @type {Error} */(e).message = "parse config file failed"
            fs.unlinkSync(CONFIG_PATH);
        }
    }
}






let config = readConfig(configPath);

function createConfig(configPath) { 
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question("123", answer => {
        console.log(answer + 555);
    })
}