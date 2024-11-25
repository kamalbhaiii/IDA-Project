const app = require('./app');
require('dotenv').config()
const config = require(`./config/env/${process.env.NODE_ENV}.json`)

app.listen(config.app.apiPort, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.app.apiPort}`));
