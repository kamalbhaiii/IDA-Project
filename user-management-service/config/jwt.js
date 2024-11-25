const jwt = require('jsonwebtoken')
const config = require(`./env/${process.env.NODE_ENV}.json`)

const createToken = async (data) => {
    const token = await jwt.sign({
        data
    }, config.jwtSecret)
    return token;
}

const verifyToken = async (token) => {
    const data = await jwt.verify(token, config.jwtSecret)
    if (data) {
        return data
    }
    else {
        return "Invalid token"
    }
}

module.exports = { createToken, verifyToken }