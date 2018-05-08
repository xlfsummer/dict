// let readline = require("readline");
let Cli = require('./cli');
let api = require('./api');
let Translation = require('./translation');

/** 用于搜索循环 */

let search = module.exports = {
	async loop(option) {
		while (await search.single(option));
	},
	async single(option) {
		let translateText = await Cli.read(': ');
		if (!translateText) return false;
		await Translation.query(translateText, option)

		return true;
	}
}