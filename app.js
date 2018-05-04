
let configManager = require("./scripts/configManager");
let api = require("./scripts/api");
let serach = require("./scripts/search");

(async () => {
    await configManager.checkConfig();

    await serach.loop();
})();

// serach()
