#!/usr/bin/env node

let process = require('process');
let configManager = require("../lib/configManager");
let api = require("../lib/api");
let search = require("../lib/search");
let Translation = require('../lib/translation');
let Help = require('../lib/help');

parseArg(process.argv.slice(2))
// return;

/**
 * @param {string[]} argv
 */
async function parseArg(argv) {
    await configManager.checkConfig();

    let option = {};

    let noArg = argv.length == 0;
    if (noArg) {
        console.log("need arg");
        return;
    }

    let help = retriveBoolArg('-h') || retriveBoolArg('--help');
    if (help) {
        Help.show();
        return;
    }

    let editConfig = retriveBoolArg('--edit-config');
    if (editConfig) {
        await configManager.writeConfig();
        return;
    }

    let from = retriveCommandWithArg('-f') || retriveCommandWithArg('--from');
    from && (option.from = from);

    let to = retriveCommandWithArg('-t') || retriveCommandWithArg('--to');
    to && (option.to = to);

    let detail = retriveBoolArg('-d') || retriveBoolArg('--detail');
    option.detail = detail;

    function retriveCommandWithArg(commandStr) {
        let commandIndex = argv.indexOf(commandStr);

        if (commandIndex == -1) return null;
        if (!((commandIndex + 1) in argv)) return null;

        let commadArg = argv.splice(commandIndex, 2)[1];
        return commadArg;
    }

    function retriveBoolArg(commandStr) {
        let i = argv.indexOf(commandStr);
        if (i == -1) return false;
        argv.splice(i, 1);
        return true;
    }

    let isPreserve = argv.includes('-');
    if (!isPreserve) {
        let translateText = argv.join(' ');
        await Translation.query(translateText);
        return;
    }

    if (isPreserve) {
        let translateText = argv.join(' ');
        await Translation.query(translateText);
        await search.loop();
    }

    let commad = {
        '': 'translate',
        '-': 'translate',
        '-f': 'from',
        '--from': 'from',
        '-t': 'to',
        '--to': 'to',
        '-h': 'help',
        '--help': 'help',
        '-d': 'detail',
        '--detail': 'detail',
        '--edit-config': 'edit-config',
    }
}