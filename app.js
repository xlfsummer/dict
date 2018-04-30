
let configManager = require("./scripts/configManager");

(async () => {
    var config = await configManager.getConfig();
    
    console.log(config);
})();



// serach()
