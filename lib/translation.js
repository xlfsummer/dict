let readline = require('readline');
let console = require('console');
let api = require('./api');
let colors = require('colors')

let Translation = module.exports = class Translation {

	/**
	 * @param {ITranslateResult} data
	 */
	static async get(text, option) {
		return api.translate({...option, q: text})
	}

	/**
	 * @param {ITranslateResult} translation
	 */
	static print(translation) {
		let more = true

		let ukPhonetic =
			translation.basic &&
			translation.basic['uk-phonetic'] &&
			`UK /${translation.basic['uk-phonetic']}/`

		let usPhonetic =
			translation.basic &&
			translation.basic['us-phonetic'] &&
			`US /${translation.basic['us-phonetic']}/`

		let content = '';

		//phonetic
		if (ukPhonetic || usPhonetic) {
			content += ukPhonetic ? colors.gray(ukPhonetic) : '';
			content += ' '.repeat(4);
			content += usPhonetic ? colors.gray(usPhonetic) : '';
			content += '\n'
		}

		content += '---\n'

		//translation
		content += colors.white(translation.translation.join(', '));
		content += '\n'

		content += translation.basic ? colors.green(translation.basic.explains.map(e => e + '\n').join('')) : ''

		content += translation.web ? translation.web.map(mean => {
			let content = '';
			content += '- ' + mean.key;
			content += '\n'
			content += '  ' + colors.gray(mean.value.join(', '))
			content += '\n'
			return content;
		}).join('') : '';

        // translation.webdict.url

		console.info(content)
	}

	static async query(translateText, option) {
		let result = await Translation.get(translateText, option);
        Translation.print(result);
	}
}