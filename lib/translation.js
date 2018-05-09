let readline = require('readline');
let console = require('console');

let colors = require('colors');

let Api = require('./api');
let Utils = require('./utils');
let Cli = require('./cli');

const LANG = ["zh-CHS", "ja", "EN", "ko", "fr", "ru", "pt", "es", "vi"];

let Translation = module.exports = class Translation {

	/**
	 * @param {ITranslateResult} data
	 */
	static async get(text, option) {
		return Api.translate({...option, q: text})
	}

	/**
	 * @param {ITranslateResult} translation
	 * @param {object} option
	 * @param {boolean} option.detail
	 * @param {boolean} option.online
	 */
	static display(translation, option) {

		// console.log(JSON.stringify(translation,null,2));


		let ukPhonetic =
			translation.basic &&
			translation.basic['uk-phonetic'] &&
			`UK /${translation.basic['uk-phonetic']}/`

		let usPhonetic =
			translation.basic &&
			translation.basic['us-phonetic'] &&
			`US /${translation.basic['us-phonetic']}/`

		let content = '';

		if (option.online) {
			Cli.start(translation.webdict.url);
		}

		//phonetic
		if (option.detail && (ukPhonetic || usPhonetic)) {
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


		if (option.detail) {
			content += translation.web ? translation.web.map(mean => {
				let content = '';
				content += '- ' + mean.key;
				content += '\n'
				content += '  ' + colors.gray(mean.value.join(', '))
				content += '\n'
				return content;
			}).join('') : '';
		}

		if (option.detail) {
			content += colors.gray(translation.webdict.url);
		}

		console.info(content)
	}

	static async query(translateText, option) {

		let requestOption = Translation.validRequestOption(Utils.pick(option, 'from', 'to'));

		let printOption = Utils.pick(option, 'detail', 'online')

		let result = await Translation.get(translateText, requestOption);
        Translation.display(result, printOption);
	}

	static validRequestOption(option) {
		if (option.from && !LANG.includes(option.from))
			throw new Error(`<from> should be in one of ${JSON.stringify(LANG)}`)

		if (option.to && !LANG.includes(option.to))
			throw new Error(`<to> should be in one of ${JSON.stringify(LANG)}`)

		return option;
	}
}