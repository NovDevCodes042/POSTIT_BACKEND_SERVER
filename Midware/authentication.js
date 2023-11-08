const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization
    if(!authHeaders || !authHeaders.startsWith ('Bearer')){
        return res.status(401).json({ message: 'Unauthorized'})
    }
   const token = authHeaders.split(" ")[1];
   try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {userId: payLoad.userId, username: payLoad.username}
    next();
   } catch (error) {
    return res.status(401).json({ message: "Unauthorized"})
   }
}

module.exports = auth