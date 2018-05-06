let process = require('process');

module.exports = class Cli {
    /**
     * @param {string} prompt
     * @returns {Promise<string>}
     */
    static read(prompt){
        let cli = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            cli.question(prompt, answer => {
                resolve(answer)
                cli.close()
            })
        })
    }

    /**
     * 
     * @param {string[]} args 
     * @param {string} optionName 
     * @param {number} [optionParamCount]
     */
    static retriveArg(args, optionName, optionParamCount = 0) {
        
    }

}