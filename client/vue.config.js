// vue.config.js. Didn't help for the CORS issue :(
module.exports = {
    devServer: {
        proxy: 'http://server',
        headers: { "Access-Control-Allow-Origin": "*" }
    }, 
}