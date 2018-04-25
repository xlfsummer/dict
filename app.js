const CONFIG_FILE_NAME = "cli-dict.config.json";

let fs = require('fs');
let path = require('path');
let readline = require('readline');

/** @example 'C:\\Users\\username\\AppData\\Roaming' */
let configPath = path.resolve(process.env.APPDATA, CONFIG_FILE_NAME);

let configExist = fs.existsSync(configPath);

if (!configExist) {
    createConfig(configPath)
}

let config = readConfig(configPath);

serach()



function createConfig(configPath) { 
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question("123", answer => {
        console.log(answer + 555);
    })
}

function readConfig() { 

}