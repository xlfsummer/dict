#!/usr/bin/env node

let process = require('process');
let ConfigManager = require("../lib/configManager");
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

    await ConfigManager.checkConfig();

    let option = {};
    let isPreserve = false;

    if (argv.length == 0) Help.run();
    Cli.switchOption(argv, [
        ['-h',        0,  Help.run],
        ['--help',    0,  Help.run],
        ['-c',        0,  ConfigManager.open],
        ['--config',  0,  ConfigManager.open],
        ['-o',        0,  _ => option.online = !0],
        ['--online',  0,  _ => option.online = !0],
        ['-f',        1,  f => option.from = f],
        ['--from',    1,  f => option.from = f],
        ['-t',        1,  t => option.to = t],
        ['--to',      1,  t => option.to = t],
        ['-d',        0,  _ => option.detail = !0],
        ['-detail',   0,  _ => option.detail = !0],
        ['-',         0,  _ => isPreserve = true]
    ]);

    let translateText = argv.join(' ');

    await Translation.query(translateText, option);

    if (isPreserve) await search.loop(option);

    return;
}