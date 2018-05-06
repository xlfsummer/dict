// let readline = require("readline");
let Cli = require('./cli');
let api = require('./api');
let Translation = require('./translation');

/** 用于搜索循环 */

let search = module.exports = {
	async loop() {
		while (await search.single());
	},
	async single() {
		let translateText = await Cli.read(': ');

		if (!translateText) return false;

		let result = await Translation.get(translateText);

		Translation.print(result);

		return true;
	}
}