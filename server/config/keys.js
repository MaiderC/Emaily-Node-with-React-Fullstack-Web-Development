// keys.js
if(process.env.NODE_ENV === 'production') // check the node environment variable. This is automatically changed by Heroku to production
{
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}