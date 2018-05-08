let process = require('process');
let readline = require('readline');
let child_process = require('child_process')

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
     * @param {string[]} argv
     * @param {string} optionName
     * @param {number} [optionParamCount]
     */
    static retriveOption(argv, optionName, optionParamCount = 0) {

        let optionIndex = argv.indexOf(optionName);
        if (optionIndex == -1) return null;

        if (!((optionIndex + optionParamCount) in argv))
            throw new Error(`${optionName} should have ${optionParamCount} param(s)`);

        let optionParms = argv.splice(optionIndex, optionParamCount + 1).slice(1);

        return optionParms;
    }

    /**
     *
     * @param {string[]} argv
     * @param {Object<string, Function>[]} optionConfig
     */
    static switchOption(argv, optionConfig) {
        optionConfig
            .forEach(([optionName, optionParamCount, action]) => {
                let optionParam = this.retriveOption(argv, optionName, optionParamCount);
                if (optionParam) action(...optionParam);
            });
    }

    /**
     * @param {string} str
     * @return {string}
     */
    static escape(str) {
        return str.replace(/(&)/g, '^$1')
    }

    /**
     * @param {string} str
     */
    static start(str) {
        let param = Cli.escape(str);
        child_process.exec(`start ${param}`);
    }
}