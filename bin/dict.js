let process = require('process');
let configManager = require("../lib/configManager");
let api = require("../lib/api");
let search = require("../lib/search");

// let

(async () => {
    await configManager.checkConfig();

    await search.loop();
})();