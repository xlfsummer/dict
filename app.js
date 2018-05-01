
let configManager = require("./scripts/configManager");
let api = require("./scripts/api");

(async () => {
    let config = await configManager.getConfig();
    try {
        let result = await api.search("你好");
        result;
    } catch (e) { 
        e;
    }
    console.log(config);
    // console.dir(result);
})();



// serach()
