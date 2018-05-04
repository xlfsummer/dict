let process = require('process');
let readline = require('readline');
let crypto = require('crypto');
let colors = require('colors')

module.exports = {
    /**
     * @param {string} prompt
     */
    readHost(prompt){
        let cli = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            cli.question(prompt, resolve)
        })
    },

    /**
     * @param {ITranslateResult} translation
     */
    displayTranslation(translation) {

        // console.dir(translation.web)
        let more = false

        content =
            `${colors.bold(colors.yellow(translation.query))}
            ${colors.gray(`UK: /${translation.basic['uk-phonetic']}/`)}    ${colors.gray(`US: /${translation.basic['us-phonetic']}/`)}
            ---
            ${colors.white(translation.translation.join(', '))}
            \t${colors.green(translation.basic.explains.join('\n'))}

            ${ more ?
                translation.web.map(mean => `${mean.key}
                    ${colors.gray(mean.value.join(', '))}`
                ).join('\n\n')
                : ""
            }

            ${colors.gray(`[${translation.webdict.url}]`)}
            `.replace(/^\s+/gm, "");

        console.log(content);
    },

    md5(str){
        return crypto.createHash('md5').update(str).digest('hex');
    }
}