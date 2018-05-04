// let readline = require("readline");
let utils = require('./utils');
let api = require('./api');
/** 用于搜索循环 */

module.exports = {
	async loop() {

		while (true){

			let translateText = await utils.readHost(': ');

			if (translateText === "") return 0;

			let result = await api.search(translateText);

			utils.displayTranslation(result);

		};

	}
}