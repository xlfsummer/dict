let process = require('process');
let readline = require('readline');
let crypto = require('crypto');

module.exports = {
    /**
     * @param {string} prompt
     */
    readHost(prompt){
        let cli = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        return new Promise(resolve => {
            cli.question(prompt, resolve)
        })
    },

    md5(str){
        return crypto.createHash('md5').update(str).digest('hex');
    }
}