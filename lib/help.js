
let process = require('process');

module.exports = class Help {
    static run() {
        Help.show();
    }
    static show() {
        console.info(`
Usage:  dict [-f <language>] [-t <language>] [-d] [-o] [-] <words>

Common: dict <words>        Translate brief and exit
        dict - <words>      Translate and stay in translating loop.
        dict -d <words>     Translate, show more info.
        dict -o <words>     Search and open Youdao web dictionary online.
        dict -c             Open and edit config file.
        dict -h             See this help.
        dict -f <language> -t <language> <words>
                Translate form language1 to language2, default to be auto
                Language is one of: zh-CHS, ja, EN, ko, fr, ru, pt, es, vi

Use "npm home dict" to get more help.
        `);
    }
}