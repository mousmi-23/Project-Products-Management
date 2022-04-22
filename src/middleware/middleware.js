const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)

}

const auth = function (req, res, next) {
    try {

        const bearerToken = req.headers.authorization;
        if (!bearerToken) return res.status(404).send({ status: false, msg: "token must be present" });
        const token = bearerToken.split(" ")[1];

        let decodedToken = jwt.verify(token, "Product-Management32", async function (error, decode) {
            if (error) {
                return res.status(400).send({ status: false, message: error.message });
            }
            decodedToken = decode;
            req.decodedToken = decodedToken// dont't want to kill request means still want to use decoded token
            next()
        })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const authorisation = function (req, res, next) {
    try {
        const userId = req.params.userId;

        if (!isValidObjectId(userId.trim())) {
            return res.status(400).send({ status: false, message: 'Invalid ID !' });
        }
        const bearerToken = req.headers.authorization;

        const token = bearerToken.split(" ")[1];

        let decodedToken = jwt.verify(token, "Product-Management32")
        let userloggedin = decodedToken.userId
        if (userId != userloggedin) {
            return res.status(403).send({ status: false, msg: "User is UnAuthorised" })
        }
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports = {
    auth,
    authorisation
}