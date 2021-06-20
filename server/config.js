class Configuration {
    static init(configFile) {
        Configuration.config = require(configFile);
        console.log("Configuration loaded: " + JSON.stringify(Configuration.config));
    }
}

module.exports = Configuration;