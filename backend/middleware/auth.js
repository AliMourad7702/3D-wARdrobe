const jwt = require('jsonwebtoken');

module.exports = {
    verifyUserToken: (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) return res.status(403).json({ error: 'No user token provided' })

        jwt.verify(token, process.env.JWT_SECRET_USER, (err, decoded) => {
            if (err) return res.status(500).json({
                error: 'Failed to authenticate token.'
            })
            req.userId = decoded.id; 
            req.role = decoded.role;
            next();
        })
    },

    verifyAdminToken: (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) return res.status(403).json({ error: 'No admin token provided' })

        jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decoded) => {
            if (err) return res.status(500).json({
                error: 'Failed to authenticate token.'
            })
            req.adminId = decoded.id;
            req.role = decoded.role;
            next();
        })
    }
}
