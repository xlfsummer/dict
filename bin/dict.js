#!/usr/bin/env node

let process = require('process');
let Config = require("../lib/config");
let api = require("../lib/api");
let search = require("../lib/search");
let Translation = require('../lib/translation');
let Help = require('../lib/help');
let Cli = require('../lib/cli');

parseArg(process.argv.slice(2))
// return;

/**
 * @param {string[]} argv
 */
async function parseArg(argv) {


    /** @type {(optionName: string, optionParamCount?: number) => string|boolean} */
    let getOption = Cli.retriveOption.bind(Cli, argv);
    let exit = process.exit.bind(process, 0);

    await Config.check();

    let option = {};
    let isPreserve = false;
    let isExit = 0;

    if (argv.length == 0) {
        Help.show();
        return;
    }

    Cli.switchOption(argv, [
        ['-h',        0,  _=> (Help.show(), isExit = 1)],
        ['--help',    0,  _=> (Help.show(), isExit = 1)],
        ['-c',        0,  _=> (Config.open(), isExit = 1)],
        ['--config',  0,  _=> (Config.open(), isExit = 1)],
        ['-o',        0,  _ => option.online = !0],
        ['--online',  0,  _ => option.online = !0],
        ['-f',        1,  f => option.from = f],
        ['--from',    1,  f => option.from = f],
        ['-t',        1,  t => option.to = t],
        ['--to',      1,  t => option.to = t],
        ['-d',        0,  _ => option.detail = !0],
        ['-detail',   0,  _ => option.detail = !0],
        ['-',         0,  _ => isPreserve = !0]
    ]);

    if (isExit) return;

    let translateText = argv.join(' ');

    await Translation.query(translateText, option);

    if (isPreserve) await search.loop(option);

    return;
}