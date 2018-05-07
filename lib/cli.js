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
     * @param {string[]} argv
     * @param {string|string[]} optionName
     * @param {number} [optionParamCount]
     */
    static retriveOption(argv, optionName, optionParamCount = 0) {
        let optionIndex = argv.indexOf(optionName);
        if (optionIndex == -1) return null;

        if (!((optionIndex + optionParamCount) in argv))
            throw new Error('option param not match');

        let optionParms = argv.splice(optionIndex, optionParamCount + 1).slice(1);

        if (optionParms.length == 0)
            return true;
        else if (optionParms.length == 1)
            return optionParms[0];
        else
            return optionParms;
    }
}